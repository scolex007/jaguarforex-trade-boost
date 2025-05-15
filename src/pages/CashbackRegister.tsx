
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getBrokerById } from "@/data/brokersData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";

const CashbackRegister = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('broker');
  const broker = brokerId ? getBrokerById(brokerId) : null;
  
  const [registrationType, setRegistrationType] = useState<'new' | 'existing'>('new');
  const [name, setName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [authorizeContact, setAuthorizeContact] = useState<boolean>(false);
  
  useEffect(() => {
    if (!broker) {
      toast({
        title: "Broker not found",
        description: "Please select a broker from the cashback page.",
        variant: "destructive"
      });
    }
  }, [broker]);
  
  const getAffiliateLink = () => {
    switch(broker?.id) {
      case "exness":
        return "https://one.exnesstrack.org/a/tffad7az66";
      case "roboforex":
        return "https://my.roboforex.com/ph/?a=ztwx";
      case "fbs":
        return "https://fbs.partners?ibl=586643&ibp=21023205";
      case "icmarkets":
        return "https://icmarkets.com/?camp=56951";
      case "xm":
        return "https://clicks.pipaffiliates.com/c?c=576677&l=en&p=0";
      default:
        return "#"; // Placeholder
    }
  };
  
  const handleCashbackRedirect = () => {
    const affiliateLink = getAffiliateLink();
    window.open(affiliateLink, '_blank');
    toast({
      title: "Redirecting to broker",
      description: "Opening broker registration page in a new tab."
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to continue with your cashback registration.",
        variant: "destructive"
      });
      navigate("/login?redirect=/cashback/register?broker=" + brokerId);
      return;
    }
    
    // Here you would typically send this data to your backend
    toast({
      title: "Registration submitted",
      description: "Your cashback registration has been submitted successfully."
    });
    
    // For demonstration purposes, log the data
    console.log({
      broker: broker?.id,
      name,
      accountNumber,
      authorizeContact,
      registrationType
    });
    
    // Reset form
    setName("");
    setAccountNumber("");
    setAuthorizeContact(false);
  };
  
  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            {broker?.logo && (
              <div className="bg-white p-2 rounded w-16 h-16 flex items-center justify-center">
                <img 
                  src={broker.logo} 
                  alt={`${broker?.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">
              Setup cash back | <span className="text-jaguargold">{broker?.name}</span>
            </h1>
          </div>
          
          <div className="bg-jaguarblue-900 rounded-lg p-6 mb-6 border border-jaguarblue-700">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${registrationType === 'new' ? 'bg-jaguargold' : 'bg-jaguarblue-700 border border-gray-600'}`}>
                  {registrationType === 'new' && <div className="w-2 h-2 bg-jaguarblue-900 rounded-full"></div>}
                </div>
                <label 
                  className="flex items-center cursor-pointer"
                  onClick={() => setRegistrationType('new')}
                >
                  <span className="text-sm ml-2">Add a new account</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${registrationType === 'existing' ? 'bg-jaguargold' : 'bg-jaguarblue-700 border border-gray-600'}`}>
                  {registrationType === 'existing' && <div className="w-2 h-2 bg-jaguarblue-900 rounded-full"></div>}
                </div>
                <label 
                  className="flex items-center cursor-pointer"
                  onClick={() => setRegistrationType('existing')}
                >
                  <span className="text-sm ml-2">Transfer an existing account</span>
                </label>
              </div>
            </div>
          </div>
          
          {registrationType === 'new' ? (
            <div className="bg-jaguarblue-900 rounded-lg p-6 mb-6 border border-jaguarblue-700">
              <h2 className="text-lg font-medium mb-4">Step 1. Open an {broker?.name} account</h2>
              <Button 
                className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90 py-5 mb-4 flex items-center justify-center"
                onClick={handleCashbackRedirect}
              >
                <ArrowRight className="mr-2" size={16} />
                Monthly Cash Back
              </Button>
              
              <p className="text-xs text-gray-400 mt-2">
                *Terms and conditions apply. See broker website for full details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="bg-jaguarblue-900 rounded-lg p-6 mb-6 border border-jaguarblue-700">
                <h2 className="text-lg font-medium mb-4">Step 1. Open an {broker?.name} account</h2>
                <Button 
                  type="button"
                  className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90 py-5 flex items-center justify-center"
                  onClick={handleCashbackRedirect}
                >
                  <ArrowRight className="mr-2" size={16} />
                  Monthly Cash Back
                </Button>
              </div>
              
              <div className="bg-jaguarblue-900 rounded-lg p-6 mb-6 border border-jaguarblue-700">
                <h2 className="text-lg font-medium mb-6">Step 2. Enter your account details</h2>
                <div className="space-y-6 max-w-md mx-auto">
                  <div>
                    <Label htmlFor="name">Name on your {broker?.name} account</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white text-black mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="account-number">Account number</Label>
                    <Input
                      id="account-number"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                      className="bg-white text-black mt-2"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="authorize"
                      checked={authorizeContact}
                      onChange={(e) => setAuthorizeContact(e.target.checked)}
                      className="h-5 w-5 mr-2"
                    />
                    <Label htmlFor="authorize" className="text-sm cursor-pointer">
                      I authorize JaguarForex to contact {broker?.name} on my behalf, if needed to set JaguarForex as my referrer (IB)
                    </Label>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      className="bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90 px-12 py-3"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashbackRegister;
