
import React from "react";
import { 
  ComposedChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
  Bar
} from "recharts";
import { CandlestickData } from "@/utils/tradingChartUtils";
import CandlestickRenderer from "./CandlestickRenderer";

interface CandlestickChartProps {
  data: CandlestickData[];
  verticalLineIndex: number;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, verticalLineIndex }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart 
        data={data} 
        margin={{ top: 10, right: 30, bottom: 10, left: 5 }}
        className="bg-jaguarblue-900/30 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="time" tick={false} />
        <YAxis 
          domain={['dataMin - 0.0008', 'dataMax + 0.0008']} 
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
                  <p className="text-white text-xs font-medium">OHLC</p>
                  <p className="text-white text-xs">O: {payload[0].payload.open}</p>
                  <p className="text-white text-xs">H: {payload[0].payload.high}</p>
                  <p className="text-white text-xs">L: {payload[0].payload.low}</p>
                  <p className="text-white text-xs">C: {payload[0].payload.close}</p>
                </div>
              );
            }
            return null;
          }}
        />
        
        {/* Render custom candlesticks using Bar for positioning */}
        <Bar 
          dataKey="high" 
          fill="transparent" 
          stroke="transparent"
          shape={(props) => <CandlestickRenderer {...props} data={data} />}
          isAnimationActive={false}
        />
        
        {/* Vertical line at approximately 70% of chart width */}
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
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;
