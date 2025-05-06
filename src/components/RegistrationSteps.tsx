
import { CircleCheck, UserPlus, Download, DollarSign } from "lucide-react";

const RegistrationSteps = () => {
  const steps = [
    {
      icon: <UserPlus className="h-10 w-10 text-jaguargold" />,
      title: "Create an Account",
      description: "Sign up for a free JaguarForex account in less than 2 minutes."
    },
    {
      icon: <Download className="h-10 w-10 text-jaguargold" />,
      title: "Register Trading Account",
      description: "Connect your broker trading account to activate cashback."
    },
    {
      icon: <CircleCheck className="h-10 w-10 text-jaguargold" />,
      title: "Download Trading Tools",
      description: "Access our free EAs and indicators to enhance your trading."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-jaguargold" />,
      title: "Start Earning",
      description: "Trade as usual and watch your cashback balance grow."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started In <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Follow these easy steps to start earning cashback and accessing our premium trading tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-jaguarblue-800/70 border border-jaguarblue-700 text-center relative overflow-hidden group"
            >
              <div className="absolute -right-10 top-0 text-7xl font-bold text-jaguarblue-700 opacity-30 group-hover:opacity-50 transition-opacity">
                {index + 1}
              </div>
              
              <div className="mx-auto p-4 bg-jaguarblue-700 rounded-full inline-block mb-6 relative z-10">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-white relative z-10">{step.title}</h3>
              <p className="text-gray-300 relative z-10">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-5 top-1/2 transform -translate-y-1/2 rotate-[-15deg]">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5L38 13.5V10.5L0 10.5L0 13.5Z" fill="#D4AF37" fillOpacity="0.3"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSteps;
