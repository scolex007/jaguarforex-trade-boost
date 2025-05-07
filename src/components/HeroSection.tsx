
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Boost Your Trading with{" "}
              <span className="gradient-text">JaguarForex</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Free premium trading tools and cashback rewards on every trade. Join thousands of traders maximizing their forex potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-primary flex items-center gap-2" onClick={() => window.location.href = "https://my.jaguarforex.com/auth/register/jaguarforex"}>
                Start Trading <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="btn-outline flex items-center gap-2">
                Download EA <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-jaguarblue-800/70 p-4 rounded-lg">
                <p className="text-jaguargold text-2xl font-bold">100+</p>
                <p className="text-sm text-gray-300">Trading Indicators</p>
              </div>
              <div className="bg-jaguarblue-800/70 p-4 rounded-lg">
                <p className="text-jaguargold text-2xl font-bold">50+</p>
                <p className="text-sm text-gray-300">Expert Advisors</p>
              </div>
              <div className="bg-jaguarblue-800/70 p-4 rounded-lg">
                <p className="text-jaguargold text-2xl font-bold">$2M+</p>
                <p className="text-sm text-gray-300">Cashback Paid</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="bg-jaguarblue-700/20 backdrop-blur-sm rounded-2xl border border-jaguarblue-600 p-6 animate-float shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold gradient-text">Trading Dashboard</h3>
                <TrendingUp className="text-jaguargold" />
              </div>
              <div className="bg-jaguarblue-800 rounded-lg p-4 mb-4">
                <div className="h-48 bg-jaguarblue-700/50 rounded-md bg-chart-pattern bg-cover bg-center"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-jaguarblue-800 p-3 rounded-md">
                  <p className="text-xs text-gray-400">Wallet Balance</p>
                  <p className="text-jaguargold font-semibold">$2,450.00</p>
                </div>
                <div className="bg-jaguarblue-800 p-3 rounded-md">
                  <p className="text-xs text-gray-400">Total Cashback</p>
                  <p className="text-jaguargold font-semibold">$568.25</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-jaguargold/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-jaguargold/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute top-10 left-10 w-72 h-72 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
