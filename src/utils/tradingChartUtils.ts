
// Generate initial data with a bullish trend for a line chart
export const generateInitialData = () => {
  const data = [];
  // Starting price based on the reference image
  let currentValue = 1.3921;
  // Reduced volatility for smoother movements
  const volatility = 0.0004;
  
  // Generate data points for line chart with bullish bias (70% chance of going up)
  for (let i = 0; i < 30; i++) {
    // Create a bullish trend with some volatility
    const bullishBias = Math.random() > 0.3 ? 1 : -1;
    const baseChange = (Math.random() * volatility) * bullishBias;
    
    // Calculate value with a slight upward bias
    let close = parseFloat((currentValue + baseChange).toFixed(4));
    
    // Add a small consistent upward trend
    if (i > 0) {
      close += 0.0001;
    }
    
    // Update the current value for next iteration
    currentValue = close;
    
    // For a line chart, we just need the close value
    data.push({
      time: i,
      open: close, // Keep for compatibility
      high: close, // Keep for compatibility
      low: close,  // Keep for compatibility
      close: close,
      value: close, // For compatibility with existing code
      isPositive: true,
      automated: false
    });
  }
  
  return data;
};

// Extended trades data - 6 trades as requested
export const trades = [
  { position: 5, profit: "+$28.50", percentage: "+2.2%", entryPoint: 1.3941, color: "#10b981", cash: 5.70 },
  { position: 10, profit: "+$15.75", percentage: "+1.4%", entryPoint: 1.3961, color: "#10b981", cash: 3.15 },
  { position: 15, profit: "+$32.25", percentage: "+2.8%", entryPoint: 1.3981, color: "#10b981", cash: 6.45 },
  { position: 20, profit: "-$10.50", percentage: "-0.9%", entryPoint: 1.4001, color: "#ef4444", cash: 2.10 },
  { position: 25, profit: "+$45.30", percentage: "+3.6%", entryPoint: 1.4021, color: "#10b981", cash: 9.06 },
  { position: 30, profit: "+$18.20", percentage: "+1.7%", entryPoint: 1.4041, color: "#10b981", cash: 3.64 }
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
