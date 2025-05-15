
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Dummy promotional data
const promotions = [
  {
    id: 1,
    title: "+25% Rebate Bonus",
    description: "Get 25% extra on your rebates for the first 30 trading days after registration.",
    validUntil: "May 31, 2025",
    ctaText: "Claim Bonus",
    backgroundColor: "from-jaguarblue-700 to-jaguarblue-600",
  },
  {
    id: 2,
    title: "Double Cashback Weekend",
    description: "Trade on weekends and get double cashback on all your trades.",
    validUntil: "Recurring every weekend",
    ctaText: "Learn More",
    backgroundColor: "from-jaguarblue-700 to-jaguarblue-500",
  },
  {
    id: 3, 
    title: "Refer & Earn",
    description: "Refer a friend and get 10% of their cashback for 3 months.",
    validUntil: "Ongoing promotion",
    ctaText: "Refer Friends",
    backgroundColor: "from-jaguarblue-700 to-jaguarblue-600",
  }
];

const CashbackPromotions = () => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [showPromos, setShowPromos] = useState(true); // In a real app, this would be fetched from API
  
  // Auto-rotate promotions
  useEffect(() => {
    if (!showPromos) return;
    
    const interval = setInterval(() => {
      setCurrentPromoIndex(prev => (prev + 1) % promotions.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [showPromos]);
  
  if (!showPromos) return null;

  return (
    <section className="py-16 bg-jaguarblue-800" id="promotions">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Limited-Time Offers</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="transition-transform duration-500 flex"
              style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
            >
              {promotions.map((promo) => (
                <div 
                  key={promo.id} 
                  className="w-full flex-shrink-0 p-8 bg-gradient-to-br border border-jaguarblue-600"
                  style={{ minWidth: "100%" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-jaguargold">
                        {promo.title}
                      </h3>
                      <p className="text-gray-300 mb-2">
                        {promo.description}
                      </p>
                      <div className="text-sm text-gray-400">
                        Valid until: {promo.validUntil}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button className="btn-primary whitespace-nowrap">
                        {promo.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-jaguarblue-900/70 rounded-full flex items-center justify-center text-white hover:bg-jaguarblue-900"
            onClick={() => setCurrentPromoIndex(prev => 
              prev === 0 ? promotions.length - 1 : prev - 1
            )}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-jaguarblue-900/70 rounded-full flex items-center justify-center text-white hover:bg-jaguarblue-900"
            onClick={() => setCurrentPromoIndex(prev => 
              (prev + 1) % promotions.length
            )}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-4">
            {promotions.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${
                  currentPromoIndex === index ? 'bg-jaguargold' : 'bg-gray-500'
                }`}
                onClick={() => setCurrentPromoIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackPromotions;
