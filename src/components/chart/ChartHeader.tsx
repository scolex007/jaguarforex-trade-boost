
import React from "react";
import { ChartLine, ArrowUp } from "lucide-react";

interface ChartHeaderProps {
  lastPrice: string;
  priceChange: string;
  isPositiveChange: boolean;
  chartCycle: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  lastPrice,
  priceChange,
  isPositiveChange,
  chartCycle
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <ChartLine className="text-jaguargold" size={18} />
        <h3 className="text-xl font-semibold text-jaguargold mr-2">EURUSD</h3>
        <span className="text-sm text-gray-300">{lastPrice}</span>
        <span className={`text-xs ${isPositiveChange ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
          {isPositiveChange ? '▲' : '▼'} {Math.abs(parseFloat(priceChange)).toFixed(5)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Cycle {chartCycle + 1}</span>
        <ArrowUp className={`${isPositiveChange ? 'text-green-500' : 'text-red-500'}`} size={18} />
      </div>
    </div>
  );
};

export default ChartHeader;
