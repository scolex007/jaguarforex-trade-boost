
import React, { useEffect, useState, useRef } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine,
  Tooltip
} from "recharts";
import { TrendingUp, ChartLine, Wallet, CircleDollarSign } from "lucide-react";

// Generate initial data with smoother price movement
const generateInitialData = () => {
  const data = [];
  // Starting price value
  let currentValue = 1.13919;
  // Reduced volatility for smoother movements
  const volatility = 0.00020;
  
  // Generate more points for smoother animation
  for (let i = 0; i < 30; i++) {
    // Use a more controlled random factor for smoother movement
    // This creates a smoother curve by making each point related to the previous one
    const trend = Math.cos(i / 5) * volatility;
    const noise = (Math.random() * volatility / 2) - (volatility / 4);
    // Combine trend and small noise for organic but smoother movement
    const change = trend + noise;
    currentValue += change;
    
    data.push({
      time: i,
      value: parseFloat(currentValue.toFixed(5)),
      automated: false
    });
  }
  
  return data;
};

// Extended trades data - 6 trades as requested
const trades = [
  { position: 5, profit: "+$28.50", percentage: "+2.2%", entryPoint: 1.14520, color: "#10b981", cash: 5.70 },
  { position: 10, profit: "+$15.75", percentage: "+1.4%", entryPoint: 1.14480, color: "#10b981", cash: 3.15 },
  { position: 15, profit: "+$32.25", percentage: "+2.8%", entryPoint: 1.14510, color: "#10b981", cash: 6.45 },
  { position: 20, profit: "-$10.50", percentage: "-0.9%", entryPoint: 1.14460, color: "#ef4444", cash: 2.10 },
  { position: 25, profit: "+$45.30", percentage: "+3.6%", entryPoint: 1.14440, color: "#10b981", cash: 9.06 },
  { position: 30, profit: "+$18.20", percentage: "+1.7%", entryPoint: 1.14475, color: "#10b981", cash: 3.64 }
];

const AnimatedTradingChart = () => {
  const [data, setData] = useState(generateInitialData());
  const [activeTrade, setActiveTrade] = useState<number | null>(null);
  const [showProfit, setShowProfit] = useState(false);
  const [currentTradeIndex, setCurrentTradeIndex] = useState(-1);
  const [chartCycle, setChartCycle] = useState(0);
  const [walletBalance, setWalletBalance] = useState(2450);
  const [cashbackTotal, setCashbackTotal] = useState(568.25);
  const [animateWallet, setAnimateWallet] = useState(false);
  const [animateCashback, setAnimateCashback] = useState(false);
  
  // Reference for the previous value to create smoother transitions
  const prevValueRef = useRef(data[data.length - 1]?.value || 1.13919);
  
  // Animation effect for the chart with smoother transitions
  useEffect(() => {
    let timer: number;
    
    const updateChart = () => {
      // Add a new data point and remove the first one for scrolling effect
      setData(prevData => {
        const lastPoint = prevData[prevData.length - 1];
        const prevValue = prevValueRef.current;
        
        // Create smoother transitions by having small incremental changes
        // Use a combination of trend and tiny random noise
        const trendFactor = Math.sin(Date.now() / 10000) * 0.00008;
        const noise = (Math.random() * 0.00010) - 0.00005;
        const change = trendFactor + noise;
        
        // Calculate new value with smoother transition from previous value
        const newValue = parseFloat((prevValue + change).toFixed(5));
        prevValueRef.current = newValue;
        
        const newData = [...prevData.slice(1), { 
          time: lastPoint.time + 1, 
          value: newValue,
          automated: false
        }];
        
        return newData;
      });
      
      // Advance the trade index
      setCurrentTradeIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        
        // Trade execution logic
        if (newIndex % 10 === 0) {
          const tradeIndex = Math.floor(newIndex / 10) % trades.length;
          const currentTrade = trades[tradeIndex];
          
          // Mark the point where automated trading occurs
          setData(prevData => {
            const newData = [...prevData];
            const tradePosition = currentTrade.position % prevData.length;
            
            if (newData[tradePosition]) {
              newData[tradePosition] = { 
                ...newData[tradePosition], 
                automated: true,
                profit: currentTrade.profit,
                percentage: currentTrade.percentage,
                color: currentTrade.color
              };
            }
            
            return newData;
          });
          
          setActiveTrade(tradeIndex);
          setShowProfit(true);
          
          // Update wallet balance based on trade results
          if (currentTrade.profit.startsWith('+')) {
            setWalletBalance(prev => {
              const profitAmount = parseFloat(currentTrade.profit.replace(/[+$]/g, ''));
              return parseFloat((prev + profitAmount).toFixed(2));
            });
          } else {
            setWalletBalance(prev => {
              const lossAmount = parseFloat(currentTrade.profit.replace(/[-$]/g, ''));
              return parseFloat((prev - lossAmount).toFixed(2));
            });
          }
          setAnimateWallet(true);
          
          // Update cashback total - always increases regardless of profit/loss
          setCashbackTotal(prev => {
            return parseFloat((prev + currentTrade.cash).toFixed(2));
          });
          setAnimateCashback(true);
          
          // Hide profit and animations after 3 seconds
          setTimeout(() => {
            setShowProfit(false);
            setAnimateWallet(false);
            setAnimateCashback(false);
          }, 3000);

          // Increment the cycle counter when we've gone through all trades
          if (tradeIndex === trades.length - 1) {
            setChartCycle(prev => prev + 1);
          }
        }
        
        return newIndex;
      });
    };
    
    // Update every 400ms for smoother animation
    timer = window.setInterval(updateChart, 400);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Get the last data point for current price display
  const lastPrice = data[data.length - 1]?.value.toFixed(5);
  const priceChange = (data[data.length - 1]?.value - data[0]?.value).toFixed(5);
  const isPositiveChange = parseFloat(priceChange) >= 0;
  
  // Calculate the precise index for where 75% of the chart width would be
  const verticalLineIndex = Math.round(data.length * 0.75);
  
  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ChartLine className="text-jaguargold" size={18} />
          <h3 className="text-xl font-semibold gradient-text mr-2">EURUSD</h3>
          <span className="text-sm text-gray-300">{lastPrice}</span>
          <span className={`text-xs ${isPositiveChange ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
            {isPositiveChange ? '▲' : '▼'} {Math.abs(parseFloat(priceChange)).toFixed(5)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Cycle {chartCycle + 1}</span>
          <TrendingUp className={`${isPositiveChange ? 'text-green-500' : 'text-red-500'}`} size={18} />
        </div>
      </div>
      
      <div className="relative h-[220px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            className="bg-jaguarblue-900/30 rounded-lg"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={false} />
            <YAxis 
              domain={['dataMin - 0.0005', 'dataMax + 0.0005']} 
              tick={{ fill: '#9ca3af', fontSize: 10 }} 
              width={40} 
              tickFormatter={(value) => value.toFixed(5).slice(-5)}
              axisLine={{ stroke: '#1e293b' }}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-jaguarblue-800/90 border border-jaguarblue-700 p-2 rounded-md">
                      <p className="text-white text-xs">{payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#D4AF37" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 4, fill: '#D4AF37' }}
              animationDuration={300}
            />
            
            {/* Vertical line at approximately 75% of chart width */}
            <ReferenceLine 
              x={verticalLineIndex} 
              stroke="#00b8d9" 
              strokeDasharray="3 3" 
              strokeWidth={1.5}
            />
            
            {data.map((point, index) => (
              point.automated && (
                <ReferenceLine 
                  key={`trade-${index}`}
                  x={point.time} 
                  stroke={point.color || "#10b981"} 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Profit indicators */}
        {showProfit && activeTrade !== null && trades[activeTrade] && (
          <div 
            className="absolute top-1/4 right-4 bg-jaguarblue-800/90 border border-jaguarblue-700 p-2 rounded-md animate-fade-in shadow-lg"
            style={{ borderLeft: `3px solid ${trades[activeTrade].color}` }}
          >
            <div className={`font-semibold ${trades[activeTrade].color === "#10b981" ? "text-green-400" : "text-red-400"}`}>
              {trades[activeTrade].profit}
            </div>
            <div className={`text-sm ${trades[activeTrade].color === "#10b981" ? "text-green-400" : "text-red-400"}`}>
              {trades[activeTrade].percentage}
            </div>
          </div>
        )}
        
        {/* Automated trading label - positioned at top with enough margin to avoid overlap */}
        {showProfit && activeTrade !== null && (
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-jaguarblue-800/90 border border-jaguargold/30 px-3 py-2 rounded-md animate-fade-in shadow-lg animate-pulse-border">
            <div className="text-white text-sm font-medium flex items-center">
              <span className={`h-2 w-2 rounded-full mr-2 ${trades[activeTrade].color === "#10b981" ? "bg-green-500" : "bg-red-500"}`}></span>
              Auto Trade Executed
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className={`bg-jaguarblue-800 p-4 rounded-md relative ${animateWallet ? 'animate-pulse-number' : ''}`}>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Wallet size={16} />
            <p className="text-sm">Wallet Balance</p>
          </div>
          <p className={`text-jaguargold font-semibold text-lg ${animateWallet ? 'animate-number-change' : ''}`}>
            ${walletBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </p>
          
          {/* Animation overlay for values */}
          {animateWallet && (
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-jaguargold/30 to-transparent animate-slide-right"></div>
          )}
        </div>
        
        <div className={`bg-jaguarblue-800 p-4 rounded-md relative ${animateCashback ? 'animate-pulse-number' : ''}`}>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <CircleDollarSign size={16} />
            <p className="text-sm">Total Cashback</p>
          </div>
          <p className={`text-jaguargold font-semibold text-lg ${animateCashback ? 'animate-number-change' : ''}`}>
            ${cashbackTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </p>
          
          {/* Animation overlay for values */}
          {animateCashback && (
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-jaguargold/30 to-transparent animate-slide-right"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTradingChart;
