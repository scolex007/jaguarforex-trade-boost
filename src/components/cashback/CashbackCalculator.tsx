
import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

const CashbackCalculator = () => {
  const [lots, setLots] = useState<number>(50);
  const [monthlyRebate, setMonthlyRebate] = useState<number>(100);
  const [yearlyRebate, setYearlyRebate] = useState<number>(1200);
  const rebateRate = 2; // $2 per lot
  
  // Calculate rebates whenever lots change
  useEffect(() => {
    const monthly = lots * rebateRate;
    setMonthlyRebate(monthly);
    setYearlyRebate(monthly * 12);
  }, [lots]);
  
  // Format currency with commas for larger numbers
  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <section className="py-16 bg-jaguarblue-800" id="calculator">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="p-2 bg-jaguarblue-700 rounded-lg mr-3">
            <Calculator className="h-6 w-6 text-jaguargold" />
          </div>
          <h2 className="text-3xl font-bold">Earnings Calculator</h2>
        </div>
        
        <div className="max-w-3xl mx-auto bg-jaguarblue-700 rounded-xl p-8 border border-jaguarblue-600">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monthly Trading Volume (Standard Lots)
            </label>
            <input
              type="range"
              min={1}
              max={500}
              value={lots}
              onChange={(e) => setLots(parseInt(e.target.value))}
              className="w-full h-2 bg-jaguarblue-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-400">1</span>
              <span className="text-sm text-gray-400">500</span>
            </div>
            <div className="text-center mt-4">
              <span className="text-3xl font-bold">{lots}</span>
              <span className="text-gray-300"> lots per month</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-jaguarblue-800/70 p-6 rounded-lg text-center">
              <h3 className="text-lg text-gray-300 mb-2">Monthly Cashback</h3>
              <p className="text-jaguargold text-4xl font-bold animate-pulse-number">
                {formatCurrency(monthlyRebate)}
              </p>
            </div>
            
            <div className="bg-jaguarblue-800/70 p-6 rounded-lg text-center">
              <h3 className="text-lg text-gray-300 mb-2">Yearly Cashback</h3>
              <p className="text-jaguargold text-4xl font-bold">
                {formatCurrency(yearlyRebate)}
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-300">
            <p>Based on a rebate rate of ${rebateRate} per standard lot traded.</p>
            <p className="text-sm mt-2">Actual rebates may vary slightly by broker and account type.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackCalculator;
