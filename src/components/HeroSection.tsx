
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import AnimatedTradingChart from "./AnimatedTradingChart";

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
                Get Cashback <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="btn-outline flex items-center gap-2">
                Download EA <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-jaguarblue-800/70 p-4 rounded-lg">
                <p className="text-jaguargold text-2xl font-bold">5</p>
                <p className="text-sm text-gray-300">Trading Indicators</p>
              </div>
              <div className="bg-jaguarblue-800/70 p-4 rounded-lg">
                <p className="text-jaguargold text-2xl font-bold">10</p>
                <p className="text-sm text-gray-300">Expert Advisors</p>
              </div>
              <div className="bg-jaguarblue-800/70 p-4 rounded-lg">
                <p className="text-jaguargold text-2xl font-bold">$10K+</p>
                <p className="text-sm text-gray-300">Cashback Paid</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="bg-jaguarblue-800/50 backdrop-blur-sm rounded-2xl border border-jaguarblue-600 p-6 animate-float shadow-xl h-[380px]">
              <AnimatedTradingChart />
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
