
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Broker } from "@/data/brokersData";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BrokerCardProps {
  broker: Broker;
}

const BrokerCard = ({ broker }: BrokerCardProps) => {
  const navigate = useNavigate();
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  
  const toggleDetails = () => {
    setIsDetailsExpanded(prev => !prev);
  };
  
  const handleGetCashback = (brokerId: string) => {
    // Make sure we have a valid broker ID
    if (brokerId) {
      // Use React Router's navigate instead of window.location for client-side routing
      navigate(`/cashback/register?broker=${brokerId}`);
    }
  };

  return (
    <div className="bg-jaguarblue-700 rounded-lg border border-jaguarblue-600 overflow-hidden shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Broker Logo and Rating */}
        <div className="p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-jaguarblue-600">
          <div className="bg-white p-3 rounded-lg mb-4 w-32 h-32 flex items-center justify-center">
            <img 
              src={broker.logo} 
              alt={`${broker.name} logo`} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex items-center">
            <span className="text-jaguargold font-bold text-lg mr-2">{broker.rating.toFixed(1)}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-jaguargold' : 'text-gray-400'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          {broker.featured && (
            <Badge className="bg-jaguargold text-jaguarblue-900 mt-2">Featured Broker</Badge>
          )}
        </div>
        
        {/* Account Types and Details */}
        <div className="p-6 md:col-span-2 border-b md:border-b-0 md:border-r border-jaguarblue-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{broker.name}</h3>
            <Button 
              variant="link" 
              className="text-jaguargold p-0"
              onClick={toggleDetails}
            >
              {isDetailsExpanded ? "Hide Details" : "Details"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {broker.accountTypes.map((account, index) => (
              <div key={index} className="bg-jaguarblue-800/50 p-4 rounded-md">
                <h4 className="font-medium mb-2">{account.name}</h4>
                {Array.isArray(account.description) ? (
                  <ul className="text-gray-300 text-sm space-y-1">
                    {account.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300 text-sm">{account.description}</p>
                )}
              </div>
            ))}
          </div>
          
          {isDetailsExpanded && (
            <div className="mt-4 pt-4 border-t border-jaguarblue-600">
              <h4 className="text-sm font-medium mb-2">Trading Platforms</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {broker.platforms.map((platform, index) => (
                  <Badge key={index} variant="secondary" className="bg-jaguarblue-600">
                    {platform}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                *Terms and conditions apply. See broker website for full details.
              </span>
            </div>
          )}
        </div>
        
        {/* Payment Options and CTA */}
        <div className="p-6 flex flex-col">
          <h4 className="text-sm font-medium mb-3">Payment Options</h4>
          <ul className="space-y-2 mb-auto">
            {broker.paymentOptions.map((option, index) => (
              <li key={index} className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-jaguargold mr-2" />
                <span className="text-gray-300">{option}</span>
              </li>
            ))}
          </ul>
          
          <Button
            className="mt-4 w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
            onClick={() => handleGetCashback(broker.id)}
          >
            Get Cashback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrokerCard;
