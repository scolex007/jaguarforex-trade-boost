
// Generate initial candlestick data with OHLC values showing a bullish trend
export const generateInitialData = () => {
  const data = [];
  // Starting price at a higher value to avoid touching bottom
  let currentValue = 1.14200;
  // Reduced volatility for smoother movements
  const volatility = 0.00020;
  
  // Generate data points for candlesticks with bullish bias
  for (let i = 0; i < 30; i++) {
    // Create more realistic candlestick data with bullish bias (60% chance of going up)
    const bullishBias = Math.random() > 0.4 ? 1 : -1;
    const baseChange = (Math.random() * volatility) * bullishBias;
    
    // Calculate Open, High, Low, Close values
    const open = currentValue;
    const close = parseFloat((currentValue + baseChange).toFixed(5));
    
    // Make high/low less extreme to avoid touching borders
    const highExtra = Math.random() * volatility * 0.3;
    const lowExtra = Math.random() * volatility * 0.3;
    
    const high = parseFloat((Math.max(open, close) + highExtra).toFixed(5));
    const low = parseFloat((Math.min(open, close) - lowExtra).toFixed(5));
    
    // Update the current value for next iteration
    currentValue = close;
    
    // Determine if candle is bullish (green) or bearish (red)
    const isPositive = close >= open;
    
    data.push({
      time: i,
      open: open,
      high: high,
      low: low,
      close: close,
      value: close, // For compatibility with existing code
      isPositive: isPositive,
      automated: false
    });
  }
  
  return data;
};

// Extended trades data - 6 trades as requested
export const trades = [
  { position: 5, profit: "+$28.50", percentage: "+2.2%", entryPoint: 1.14520, color: "#10b981", cash: 5.70 },
  { position: 10, profit: "+$15.75", percentage: "+1.4%", entryPoint: 1.14480, color: "#10b981", cash: 3.15 },
  { position: 15, profit: "+$32.25", percentage: "+2.8%", entryPoint: 1.14510, color: "#10b981", cash: 6.45 },
  { position: 20, profit: "-$10.50", percentage: "-0.9%", entryPoint: 1.14460, color: "#ef4444", cash: 2.10 },
  { position: 25, profit: "+$45.30", percentage: "+3.6%", entryPoint: 1.14440, color: "#10b981", cash: 9.06 },
  { position: 30, profit: "+$18.20", percentage: "+1.7%", entryPoint: 1.14475, color: "#10b981", cash: 3.64 }
];

export interface TradeData {
  position: number;
  profit: string;
  percentage: string;
  entryPoint: number;
  color: string;
  cash: number;
}

export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  value: number;
  isPositive: boolean;
  automated: boolean;
  profit?: string;
  percentage?: string;
  color?: string;
}
