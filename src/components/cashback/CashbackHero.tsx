
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CashbackHero = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get <span className="gradient-text">$2 back</span> on every standard lot you trade
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Register your MT4/MT5 account once, earn rebates forever.
            </p>
            <Button 
              className="btn-primary flex items-center gap-2" 
              onClick={() => {
                const formElement = document.getElementById('cashback-form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Claim My Cashback <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-jaguarblue-800/50 backdrop-blur-sm rounded-2xl border border-jaguarblue-600 p-6 animate-float shadow-xl h-[380px] relative">
              <div className="absolute top-4 right-4 bg-jaguargold text-jaguarblue-900 px-2 py-1 rounded-md font-medium text-sm">
                Cashback +$2.00
              </div>
              {/* Chart component would go here - using placeholder */}
              <div className="w-full h-full bg-chart-pattern bg-cover bg-center rounded-lg opacity-70"></div>
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

export default CashbackHero;
