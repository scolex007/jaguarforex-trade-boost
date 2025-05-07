
import { useState, useEffect, useRef } from "react";
import { generateInitialData, trades, CandlestickData } from "@/utils/tradingChartUtils";

export const useTradingChart = () => {
  const [data, setData] = useState<CandlestickData[]>(generateInitialData());
  const [activeTrade, setActiveTrade] = useState<number | null>(null);
  const [showProfit, setShowProfit] = useState(false);
  const [currentTradeIndex, setCurrentTradeIndex] = useState(-1);
  const [chartCycle, setChartCycle] = useState(0);
  const [walletBalance, setWalletBalance] = useState(2915.00);
  const [cashbackTotal, setCashbackTotal] = useState(673.85);
  const [animateWallet, setAnimateWallet] = useState(false);
  const [animateCashback, setAnimateCashback] = useState(false);
  
  // Reference for the previous value to create smoother transitions
  const prevValueRef = useRef(data[data.length - 1]?.close || 1.3921);
  
  // Animation effect for the chart with smoother transitions
  useEffect(() => {
    let timer: number;
    
    const updateChart = () => {
      // Add a new data point and remove the first one for scrolling effect
      setData(prevData => {
        const lastPoint = prevData[prevData.length - 1];
        const prevValue = prevValueRef.current;
        
        // Create a bullish trend with some volatility
        const bullishBias = Math.random() > 0.3 ? 1 : -1;
        const baseChange = (Math.random() * 0.0004) * bullishBias;
        
        // Calculate value with a slight upward bias
        let close = parseFloat((prevValue + baseChange + 0.0001).toFixed(4));
        
        // Update the previous value for next iteration
        prevValueRef.current = close;
        
        // Create the new data point
        const newData = [...prevData.slice(1), { 
          time: lastPoint.time + 1, 
          open: close, // For compatibility
          high: close, // For compatibility
          low: close,  // For compatibility
          close: close,
          value: close, // Keep for compatibility
          isPositive: true, 
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

  // Calculate price change and other derived data
  const lastPrice = data[data.length - 1]?.close.toFixed(4) || "0.0000";
  const priceChange = ((data[data.length - 1]?.close || 0) - (data[0]?.close || 0)).toFixed(5);
  const isPositiveChange = parseFloat(priceChange) >= 0;
  
  // Calculate the precise index for where ~70% of the chart width would be
  const verticalLineIndex = Math.round(data.length * 0.7);

  return {
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
  };
};

export default useTradingChart;
