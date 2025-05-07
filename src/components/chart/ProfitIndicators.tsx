
import React from "react";
import { TradeData } from "@/utils/tradingChartUtils";

interface ProfitIndicatorsProps {
  showProfit: boolean;
  activeTrade: number | null;
  trades: TradeData[];
}

export const ProfitIndicators: React.FC<ProfitIndicatorsProps> = ({ 
  showProfit, activeTrade, trades 
}) => {
  if (!showProfit || activeTrade === null || !trades[activeTrade]) {
    return null;
  }

  return (
    <>
      {/* Profit indicators */}
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
      
      {/* Automated trading label - positioned at top with enough margin to avoid overlap */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-jaguarblue-800/90 border border-jaguargold/30 px-3 py-2 rounded-md animate-fade-in shadow-lg animate-pulse-border">
        <div className="text-white text-sm font-medium flex items-center">
          <span className={`h-2 w-2 rounded-full mr-2 ${trades[activeTrade].color === "#10b981" ? "bg-green-500" : "bg-red-500"}`}></span>
          Auto Trade Executed
        </div>
      </div>
    </>
  );
};

export default ProfitIndicators;
