
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CashbackSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Open an account",
      description: "Open an account with one of our partner brokers.",
      icon: "💼",
    },
    {
      number: 2,
      title: "Trade as usual",
      description: "Trade as usual on MT4/MT5.",
      icon: "📈",
    },
    {
      number: 3,
      title: "Receive cashback",
      description: "Receive $2 per lot every Friday via GCash, BinancePay, or bank transfer.",
      icon: "💰",
    },
  ];

  return (
    <section className="py-16 bg-jaguarblue-900" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          How <span className="gradient-text">Cashback</span> Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-16 left-0 h-0.5 bg-gradient-to-r from-jaguarblue-900 via-jaguargold/50 to-jaguarblue-900 w-full" />
          
          {steps.map((step, index) => (
            <div key={index} className="bg-jaguarblue-800 rounded-lg p-6 text-center relative">
              {/* Step number circle */}
              <div className="w-12 h-12 rounded-full bg-jaguargold text-jaguarblue-900 flex items-center justify-center font-bold text-xl absolute -top-6 left-1/2 transform -translate-x-1/2">
                {step.number}
              </div>
              
              <div className="mt-8">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              
              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center mt-4">
                  <ArrowRight className="text-jaguargold" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            className="btn-primary flex items-center gap-2"
            onClick={() => {
              const formElement = document.getElementById('cashback-form');
              formElement?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Earning Now <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CashbackSteps;
