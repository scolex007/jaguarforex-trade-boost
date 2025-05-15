
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getBrokerById } from "@/data/brokersData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner"; // Use Sonner toast directly
import { useAuth } from "../contexts/AuthContext";
import BrokerHeader from "@/components/cashback/BrokerHeader";
import RegistrationTypeSelector from "@/components/cashback/RegistrationTypeSelector";
import NewAccountForm from "@/components/cashback/NewAccountForm";
import ExistingAccountForm from "@/components/cashback/ExistingAccountForm";

const CashbackRegister = () => {
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('broker');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [registrationType, setRegistrationType] = useState<'new' | 'existing'>('new');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Get the broker information
  const broker = brokerId ? getBrokerById(brokerId) : null;
  
  useEffect(() => {
    // Set page title
    document.title = broker ? `${broker.name} Cashback Registration` : "Cashback Registration";
    
    // Check if broker exists as soon as component mounts
    if (!brokerId || !broker) {
      // Prevent multiple redirects
      if (!isRedirecting) {
        setIsRedirecting(true);
        
        // Show error toast using Sonner
        toast.error("Broker not found", {
          description: "Please select a broker from the cashback page."
        });
        
        // Navigate back to cashback page immediately (no delay)
        navigate('/cashback', { replace: true });
      }
    }
  }, []); // Empty dependency array to run only once

  const handleSubmit = (data: any) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please log in to submit your cashback registration"
      });
      navigate('/login');
      return;
    }

    // Here you would typically send data to your backend
    console.log("Submitting form data:", {
      userId: user?.id,
      broker: broker?.id,
      registrationType,
      ...data
    });
    
    toast.success("Registration submitted", {
      description: "Your cashback registration has been submitted successfully."
    });
  };
  
  // Show loading state or return null if broker is not available
  if (!broker) {
    // Return a minimal loading state instead of null
    return (
      <div className="min-h-screen bg-jaguarblue-800">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-300">Loading broker information...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <BrokerHeader broker={broker} />
          
          <RegistrationTypeSelector 
            registrationType={registrationType}
            onTypeChange={setRegistrationType}
          />
          
          {registrationType === 'new' ? (
            <NewAccountForm broker={broker} onSubmit={handleSubmit} />
          ) : (
            <ExistingAccountForm broker={broker} onSubmit={handleSubmit} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashbackRegister;
