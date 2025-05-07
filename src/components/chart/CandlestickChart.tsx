
import React from "react";
import { 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
  Dot
} from "recharts";
import { CandlestickData } from "@/utils/tradingChartUtils";

interface CandlestickChartProps {
  data: CandlestickData[];
  verticalLineIndex: number;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, verticalLineIndex }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data} 
        margin={{ top: 10, right: 30, bottom: 10, left: 5 }}
        className="bg-jaguarblue-900/30 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="time" tick={false} />
        <YAxis 
          domain={['dataMin - 0.0005', 'dataMax + 0.0005']} 
          tick={{ fill: '#9ca3af', fontSize: 10 }} 
          width={40} 
          tickFormatter={(value) => value.toFixed(4).slice(-4)}
          axisLine={{ stroke: '#1e293b' }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-jaguarblue-800/90 border border-jaguarblue-700 p-2 rounded-md">
                  <p className="text-white text-xs font-medium">EURUSD</p>
                  <p className="text-white text-xs">Price: {payload[0].value}</p>
                </div>
              );
            }
            return null;
          }}
        />
        
        {/* Main price line */}
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke="#daa520" 
          strokeWidth={2} 
          dot={false}
          activeDot={{ r: 4, fill: "#daa520" }}
          isAnimationActive={false}
        />
        
        {/* Vertical line at approximately 70% of chart width */}
        <ReferenceLine 
          x={verticalLineIndex} 
          stroke="#00b8d9" 
          strokeDasharray="3 3" 
          strokeWidth={1.5}
        />
        
        {/* Trade markers */}
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

        {/* Add dots for trade points with a white border */}
        {data.map((point, index) => (
          point.automated && (
            <Line
              key={`dot-${index}`}
              dataKey="close"
              data={[point]}
              stroke="none"
              dot={{
                r: 5, 
                fill: point.color || "#10b981",
                stroke: "white",
                strokeWidth: 2
              }}
              isAnimationActive={false}
            />
          )
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;
