
import React, { useEffect, useState } from "react";
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
import { TrendingUp, ChartLine } from "lucide-react";

// Generate initial data
const generateInitialData = () => {
  const data = [];
  const baseValue = 1.14500;
  const volatility = 0.00050;
  
  for (let i = 0; i < 30; i++) {
    const random = Math.random() * volatility - volatility / 2;
    const value = baseValue + random;
    data.push({
      time: i,
      value: parseFloat(value.toFixed(5)),
      automated: false
    });
  }
  
  return data;
};

// Extended trades data - 6 trades as requested
const trades = [
  { position: 5, profit: "+$28.50", percentage: "+2.2%", entryPoint: 1.14520, color: "#10b981" },
  { position: 10, profit: "+$15.75", percentage: "+1.4%", entryPoint: 1.14480, color: "#10b981" },
  { position: 15, profit: "+$32.25", percentage: "+2.8%", entryPoint: 1.14510, color: "#10b981" },
  { position: 20, profit: "-$10.50", percentage: "-0.9%", entryPoint: 1.14460, color: "#ef4444" },
  { position: 25, profit: "+$45.30", percentage: "+3.6%", entryPoint: 1.14440, color: "#10b981" },
  { position: 30, profit: "+$18.20", percentage: "+1.7%", entryPoint: 1.14475, color: "#10b981" }
];

const AnimatedTradingChart = () => {
  const [data, setData] = useState(generateInitialData());
  const [activeTrade, setActiveTrade] = useState<number | null>(null);
  const [showProfit, setShowProfit] = useState(false);
  const [currentTradeIndex, setCurrentTradeIndex] = useState(-1);
  const [chartCycle, setChartCycle] = useState(0);
  
  // Animation effect for the chart
  useEffect(() => {
    let timer: number;
    
    const updateChart = () => {
      // Add a new data point and remove the first one for scrolling effect
      setData(prevData => {
        const lastPoint = prevData[prevData.length - 1];
        // Create more volatility for interesting chart movements
        const random = Math.random() * 0.0015 - 0.00075;
        const newValue = parseFloat((lastPoint.value + random).toFixed(5));
        
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
          
          // Mark the point where automated trading occurs
          setData(prevData => {
            const newData = [...prevData];
            const tradePosition = trades[tradeIndex].position % prevData.length;
            
            if (newData[tradePosition]) {
              newData[tradePosition] = { 
                ...newData[tradePosition], 
                automated: true,
                profit: trades[tradeIndex].profit,
                percentage: trades[tradeIndex].percentage,
                color: trades[tradeIndex].color
              };
            }
            
            return newData;
          });
          
          setActiveTrade(tradeIndex);
          setShowProfit(true);
          
          // Hide profit after 3 seconds
          setTimeout(() => {
            setShowProfit(false);
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
      
      <div className="relative h-[90%]">
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
        
        {/* Automated trading label */}
        {showProfit && activeTrade !== null && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-jaguarblue-800/90 border border-jaguargold/30 px-3 py-2 rounded-md animate-fade-in shadow-lg animate-pulse-border">
            <div className="text-white text-sm font-medium flex items-center">
              <span className={`h-2 w-2 rounded-full mr-2 ${trades[activeTrade].color === "#10b981" ? "bg-green-500" : "bg-red-500"}`}></span>
              Auto Trade Executed
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedTradingChart;
