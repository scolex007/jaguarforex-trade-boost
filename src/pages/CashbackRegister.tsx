
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plus } from "lucide-react";
import { getBrokerById } from "@/data/brokersData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const CashbackRegister = () => {
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('broker');
  const broker = brokerId ? getBrokerById(brokerId) : null;
  
  const [registrationType, setRegistrationType] = useState<'new' | 'existing'>('new');
  const [accountType, setAccountType] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
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
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    toast({
      title: "Registration submitted",
      description: "Your cashback registration has been submitted successfully."
    });
    
    // Reset form
    setAccountType("");
    setPlatform("");
    setAccountNumber("");
    setDateOfBirth("");
    setAddress("");
    setEmail("");
    setName("");
    setAuthorizeContact(false);
  };
  
  const handleCashbackRedirect = () => {
    // This would redirect to the affiliate link for the broker
    // For now, we'll just show a toast with the link
    let affiliateLink = "";
    
    switch(broker?.id) {
      case "roboforex":
        affiliateLink = "https://my.roboforex.com/en/?a=ztwx";
        break;
      // Add other broker affiliate links here when they are available
      default:
        affiliateLink = "#"; // Placeholder
        break;
    }
    
    window.open(affiliateLink, '_blank');
    toast({
      title: "Redirecting to broker",
      description: "Opening broker registration page in a new tab."
    });
  };
  
  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            {broker?.logo && (
              <div className="bg-white p-2 rounded w-12 h-12 flex items-center justify-center">
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
          
          <div className="bg-jaguarblue-700 rounded-lg p-6 mb-6">
            <RadioGroup 
              value={registrationType}
              onValueChange={(value) => setRegistrationType(value as 'new' | 'existing')}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new-account" />
                <Label htmlFor="new-account" className="flex items-center">
                  <Plus className="mr-2" size={16} />
                  Add a new account
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing-account" />
                <Label htmlFor="existing-account" className="flex items-center">
                  <ArrowRight className="mr-2" size={16} />
                  Transfer an existing account
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {registrationType === 'new' ? (
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Step 1. Open an {broker?.name} account</h2>
              <div className="space-y-4">
                <Button 
                  className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
                  onClick={() => {
                    handleCashbackRedirect();
                  }}
                >
                  Paid Direct to Your Broker Account*
                </Button>
                <Button 
                  className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
                  onClick={() => {
                    handleCashbackRedirect();
                  }}
                >
                  <ArrowRight className="mr-2" size={16} />
                  Monthly Cash Back
                </Button>
                <p className="text-xs text-gray-400">*Not available for accounts under ASIC</p>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Step 1. Select the account type</h2>
                <Select 
                  value={accountType} 
                  onValueChange={setAccountType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Please Select --" />
                  </SelectTrigger>
                  <SelectContent>
                    {broker?.accountTypes.map((type, index) => (
                      <SelectItem key={index} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Step 2. Select the trading platform</h2>
                <Select 
                  value={platform} 
                  onValueChange={setPlatform}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MT4" />
                  </SelectTrigger>
                  <SelectContent>
                    {broker?.platforms.map((platform, index) => (
                      <SelectItem key={index} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Step 3. Enter your account details</h2>
                <div className="space-y-4">
                  {registrationType === 'existing' && (
                    <>
                      <div>
                        <Label htmlFor="dob">Date of birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Your registered address at {broker?.name}</Label>
                        <Input
                          id="address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Your email used at {broker?.name}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Name on your {broker?.name} account</Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <Label htmlFor="account-number">Account number</Label>
                    <Input
                      id="account-number"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="authorize" 
                      checked={authorizeContact}
                      onCheckedChange={(checked) => {
                        setAuthorizeContact(checked === true);
                      }}
                    />
                    <Label htmlFor="authorize" className="text-sm">
                      I authorise JaguarForex to contact {broker?.name} on my behalf, if needed to set JaguarForex as my referrer (IB)
                    </Label>
                  </div>
                  <Button type="submit" className="bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90">
                    Submit
                  </Button>
                </div>
              </Card>
            </form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashbackRegister;
