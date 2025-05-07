
import React from "react";
import { CandlestickData } from "@/utils/tradingChartUtils";

interface CandlestickRendererProps {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  data: CandlestickData[];
}

const CandlestickRenderer: React.FC<CandlestickRendererProps> = ({ 
  x, y, width, height, index, data 
}) => {
  // Apply styles based on whether it's a positive or negative candle
  const dataPoint = data[index];
  if (!dataPoint) return null;
  
  const isPositiveCandle = dataPoint.isPositive;
  const candleColor = isPositiveCandle ? '#10b981' : '#ef4444';
  const candleWidth = 4; // Reduced width from 6 to 4 for smaller candles
  
  // Calculate positioning 
  const candleX = x - (candleWidth / 2);
  
  // Calculate height based on open/close values
  const openY = y + height - ((dataPoint.open - data[index].low) / (data[index].high - data[index].low)) * height;
  const closeY = y + height - ((dataPoint.close - data[index].low) / (data[index].high - data[index].low)) * height;
  
  // Calculate high/low lines
  const highY = y;
  const lowY = y + height;
  
  return (
    <g key={`candle-${index}`}>
      {/* Wick (high to low vertical line) */}
      <line 
        x1={x} 
        y1={highY} 
        x2={x} 
        y2={lowY} 
        stroke={candleColor} 
        strokeWidth={0.8} /* Thinner wicks */
      />
      
      {/* Candle body */}
      <rect 
        x={candleX} 
        y={isPositiveCandle ? closeY : openY}
        width={candleWidth} 
        height={Math.abs(closeY - openY) || 1} // Ensure minimum height of 1px
        fill={candleColor}
      />
    </g>
  );
};

export default CandlestickRenderer;
