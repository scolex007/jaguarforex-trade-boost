
import { Button } from "@/components/ui/button";
import { DollarSign, Copy, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const CashbackSection = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://my.jaguarforex.com/auth/register/jaguarforex");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cashback" className="py-16 md:py-24 bg-jaguarblue-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-jaguarblue-800 p-8 rounded-2xl border border-jaguarblue-700 relative overflow-hidden shadow-lg">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-jaguargold/10 rounded-full filter blur-3xl"></div>
              
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <DollarSign className="mr-2 text-jaguargold" />
                Cashback Calculator
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Trading Volume (Lots)</label>
                <input 
                  type="number" 
                  className="w-full p-3 rounded-lg bg-jaguarblue-700 border border-jaguarblue-600 text-white"
                  placeholder="Enter trading volume"
                  defaultValue="100"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Broker</label>
                <select className="w-full p-3 rounded-lg bg-jaguarblue-700 border border-jaguarblue-600 text-white">
                  <option>IC Markets ($7 per lot)</option>
                  <option>Exness ($5 per lot)</option>
                  <option>FXPro ($6 per lot)</option>
                  <option>Pepperstone ($5.5 per lot)</option>
                </select>
              </div>
              
              <div className="p-4 bg-jaguarblue-700 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Estimated Monthly Cashback:</span>
                  <span className="text-2xl font-bold text-jaguargold">$700</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-300">Estimated Annual Cashback:</span>
                  <span className="text-lg font-bold text-jaguargold">$8,400</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Referral Link</label>
                <div className="flex">
                  <input 
                    type="text" 
                    className="flex-grow p-3 rounded-l-lg bg-jaguarblue-700 border border-jaguarblue-600 text-white"
                    value="https://my.jaguarforex.com/auth/register/jaguarforex"
                    readOnly
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="p-3 rounded-r-lg bg-jaguarblue-600 text-white border border-jaguarblue-600"
                  >
                    {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <Button 
                className="w-full btn-primary"
                onClick={() => window.location.href = "https://my.jaguarforex.com/auth/register/jaguarforex"}
              >
                Start Earning Cashback
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Earn <span className="gradient-text">Cashback</span> On Every Trade
            </h2>
            <p className="text-gray-300 mb-8">
              JaguarForex offers industry-leading rebates on your trading activity. The more you trade, the more you earn – it's that simple.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-jaguarblue-700 rounded-lg text-jaguargold">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Highest Rebates</h3>
                  <p className="text-gray-300">We offer some of the highest cashback rates in the industry, up to $7 per lot traded.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-jaguarblue-700 rounded-lg text-jaguargold">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Multiple Brokers</h3>
                  <p className="text-gray-300">Connect your accounts from various brokers and earn cashback on all your trading activity.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-jaguarblue-700 rounded-lg text-jaguargold">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Easy Registration</h3>
                  <p className="text-gray-300">Simple one-time registration process. Connect your trading account and start earning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default CashbackSection;
