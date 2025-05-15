
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getBrokerById } from "@/data/brokersData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { z } from "zod";
import BrokerHeader from "@/components/cashback/BrokerHeader";
import RegistrationTypeSelector from "@/components/cashback/RegistrationTypeSelector";
import NewAccountForm from "@/components/cashback/NewAccountForm";
import ExistingAccountForm from "@/components/cashback/ExistingAccountForm";

const CashbackRegister = () => {
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('broker');
  const broker = brokerId ? getBrokerById(brokerId) : null;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [registrationType, setRegistrationType] = useState<'new' | 'existing'>('new');
  
  useEffect(() => {
    if (!broker) {
      toast({
        title: "Broker not found",
        description: "Please select a broker from the cashback page.",
        variant: "destructive"
      });
      navigate('/cashback');
    }
  }, [broker, navigate]);

  const handleSubmit = (data: any) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit your cashback registration",
        variant: "destructive"
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
    
    toast({
      title: "Registration submitted",
      description: "Your cashback registration has been submitted successfully."
    });
  };
  
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
