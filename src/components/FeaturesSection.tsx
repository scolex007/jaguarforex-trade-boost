
import { 
  Download, 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileText,
  Zap
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Download className="h-8 w-8 text-jaguargold" />,
      title: "Free Trading Tools",
      description: "Access premium EAs and indicators without any cost. Boost your trading strategy with professional tools."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-jaguargold" />,
      title: "Advanced Analytics",
      description: "Get insights into market trends and optimize your trading with our powerful analytical tools."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-jaguargold" />,
      title: "Cashback on Trades",
      description: "Earn cashback on every trade you make. The more you trade, the more you earn."
    },
    {
      icon: <Users className="h-8 w-8 text-jaguargold" />,
      title: "Referral Program",
      description: "Invite friends and earn from their trading activities. Multi-tier commission structure."
    },
    {
      icon: <FileText className="h-8 w-8 text-jaguargold" />,
      title: "Market Education",
      description: "Access comprehensive learning resources to improve your trading knowledge and skills."
    },
    {
      icon: <Zap className="h-8 w-8 text-jaguargold" />,
      title: "Fast Withdrawals",
      description: "Quick and hassle-free withdrawal process. Get your earnings without delays."
    }
  ];

  return (
    <section id="features" className="py-16 bg-jaguarblue-900 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">JaguarForex</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Experience the best trading environment with our exclusive features designed to maximize your forex trading potential and rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-jaguarblue-800/70 hover:bg-jaguarblue-800 border border-jaguarblue-700 transition-all duration-300 hover:shadow-lg hover:shadow-jaguargold/10"
            >
              <div className="p-3 bg-jaguarblue-700 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
