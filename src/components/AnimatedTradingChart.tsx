
import React from "react";
import { trades } from "@/utils/tradingChartUtils";
import useTradingChart from "@/hooks/useTradingChart";
import ChartHeader from "./chart/ChartHeader";
import CandlestickChart from "./chart/CandlestickChart";
import ProfitIndicators from "./chart/ProfitIndicators";
import TradingStats from "./chart/TradingStats";

const AnimatedTradingChart = () => {
  const {
    data,
    activeTrade,
    showProfit,
    chartCycle,
    walletBalance,
    cashbackTotal,
    animateWallet,
    animateCashback,
    lastPrice,
    priceChange,
    isPositiveChange,
    verticalLineIndex
  } = useTradingChart();
  
  return (
    <div className="relative h-full">
      <ChartHeader 
        lastPrice={lastPrice}
        priceChange={priceChange}
        isPositiveChange={isPositiveChange}
        chartCycle={chartCycle}
      />
      
      <div className="relative h-[220px] mb-4">
        <CandlestickChart 
          data={data}
          verticalLineIndex={verticalLineIndex}
        />
        
        <ProfitIndicators 
          showProfit={showProfit}
          activeTrade={activeTrade}
          trades={trades}
        />
      </div>
      
      <TradingStats 
        walletBalance={walletBalance}
        cashbackTotal={cashbackTotal}
        animateWallet={animateWallet}
        animateCashback={animateCashback}
      />
    </div>
  );
};

export default AnimatedTradingChart;
