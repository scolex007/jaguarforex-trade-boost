
import React from "react";
import { Wallet, CircleDollarSign } from "lucide-react";

interface TradingStatsProps {
  walletBalance: number;
  cashbackTotal: number;
  animateWallet: boolean;
  animateCashback: boolean;
}

const TradingStats: React.FC<TradingStatsProps> = ({
  walletBalance,
  cashbackTotal,
  animateWallet,
  animateCashback
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className={`bg-jaguarblue-800 p-4 rounded-md relative ${animateWallet ? 'animate-pulse-number' : ''}`}>
        <div className="flex items-center gap-2 text-gray-400 mb-1">
          <Wallet size={16} />
          <p className="text-sm">Wallet Balance</p>
        </div>
        <p className={`text-jaguargold font-semibold text-lg ${animateWallet ? 'animate-number-change' : ''}`}>
          ${walletBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
        
        {/* Animation overlay for values */}
        {animateWallet && (
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-jaguargold/30 to-transparent animate-slide-right"></div>
        )}
      </div>
      
      <div className={`bg-jaguarblue-800 p-4 rounded-md relative ${animateCashback ? 'animate-pulse-number' : ''}`}>
        <div className="flex items-center gap-2 text-gray-400 mb-1">
          <CircleDollarSign size={16} />
          <p className="text-sm">Total Cashback</p>
        </div>
        <p className={`text-jaguargold font-semibold text-lg ${animateCashback ? 'animate-number-change' : ''}`}>
          ${cashbackTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
        
        {/* Animation overlay for values */}
        {animateCashback && (
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-jaguargold/30 to-transparent animate-slide-right"></div>
        )}
      </div>
    </div>
  );
};

export default TradingStats;
