
import React, { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { TrendingUp } from "lucide-react";

// Generate initial data
const generateInitialData = () => {
  const data = [];
  const baseValue = 1.14500;
  const volatility = 0.00050;
  
  for (let i = 0; i < 20; i++) {
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

// Trades data
const trades = [
  { position: 4, profit: "+$20.50", percentage: "+1.8%", entryPoint: 1.14520 },
  { position: 8, profit: "+$15.75", percentage: "+1.4%", entryPoint: 1.14480 },
  { position: 12, profit: "+$10.25", percentage: "+0.9%", entryPoint: 1.14510 },
  { position: 16, profit: "+$25.30", percentage: "+2.2%", entryPoint: 1.14470 }
];

const AnimatedTradingChart = () => {
  const [data, setData] = useState(generateInitialData());
  const [activeTrade, setActiveTrade] = useState<number | null>(null);
  const [showProfit, setShowProfit] = useState(false);
  
  // Animation effect
  useEffect(() => {
    let currentTradeIndex = -1;
    let timer: number;
    
    const updateChart = () => {
      // Add a new data point and remove the first one for scrolling effect
      setData(prevData => {
        const lastPoint = prevData[prevData.length - 1];
        const random = Math.random() * 0.0010 - 0.0005;
        const newValue = parseFloat((lastPoint.value + random).toFixed(5));
        
        const newData = [...prevData.slice(1), { 
          time: lastPoint.time + 1, 
          value: newValue,
          automated: false
        }];
        
        return newData;
      });
      
      // Check if it's time to show a trade
      currentTradeIndex++;
      if (currentTradeIndex % 12 === 0 && currentTradeIndex / 12 < trades.length) {
        const tradeIndex = Math.floor(currentTradeIndex / 12);
        
        // Mark the point where automated trading occurs
        setData(prevData => {
          const newData = [...prevData];
          const tradePosition = trades[tradeIndex].position;
          
          if (newData[tradePosition]) {
            newData[tradePosition] = { 
              ...newData[tradePosition], 
              automated: true,
              profit: trades[tradeIndex].profit,
              percentage: trades[tradeIndex].percentage
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
      }
    };
    
    // Update every 500ms
    timer = window.setInterval(updateChart, 500);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold gradient-text mr-2">EURUSD</h3>
          <span className="text-sm text-gray-300">1.14{data[data.length - 1]?.value.toString().slice(-5)}</span>
        </div>
        <TrendingUp className="text-jaguargold" />
      </div>
      
      <div className="relative h-[90%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" tick={false} />
            <YAxis 
              domain={['dataMin - 0.0005', 'dataMax + 0.0005']} 
              tick={{ fill: '#9ca3af', fontSize: 10 }} 
              width={40} 
              tickFormatter={(value) => value.toFixed(5).slice(-5)}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#D4AF37" 
              strokeWidth={2} 
              dot={false}
              activeDot={false}
            />
            
            {data.map((point, index) => (
              point.automated && (
                <ReferenceLine 
                  key={`trade-${index}`}
                  x={point.time} 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Profit indicators */}
        {showProfit && activeTrade !== null && trades[activeTrade] && (
          <div className="absolute top-1/3 right-4 bg-jaguarblue-800/90 border border-jaguargold/30 p-2 rounded-md animate-fade-in">
            <div className="text-jaguargold font-semibold">{trades[activeTrade].profit}</div>
            <div className="text-green-400 text-sm">{trades[activeTrade].percentage}</div>
          </div>
        )}
        
        {/* Automated trading label */}
        {showProfit && activeTrade !== null && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-jaguarblue-800/90 border border-jaguargold/30 px-3 py-2 rounded-md animate-fade-in">
            <div className="text-white text-sm font-medium flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              Auto Trade Executed
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedTradingChart;
