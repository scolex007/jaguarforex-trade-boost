
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getBrokerById } from "@/data/brokersData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner"; // Use Sonner toast directly
import { useAuth } from "../contexts/AuthContext";
import BrokerHeader from "@/components/cashback/BrokerHeader";
import CashbackRegistrationForm from "@/components/cashback/CashbackRegistrationForm";

const CashbackRegister = () => {
  console.log("CashbackRegister - Component mounting"); // Add initial debug log
  
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('broker');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Get the broker information
  console.log("CashbackRegister - Raw broker ID from URL:", brokerId);
  const broker = brokerId ? getBrokerById(brokerId) : null;
  console.log("CashbackRegister - Broker object after lookup:", broker);
  
  useEffect(() => {
    // Debug information
    document.title = broker ? `${broker.name} Cashback Registration` : "Cashback Registration";
    console.log("CashbackRegister - Component mounted with broker ID:", brokerId);
    
    // Check if broker exists as soon as component mounts
    if (!brokerId || !broker) {
      console.log("CashbackRegister - No broker found, redirecting to /cashback");
      
      // Prevent multiple redirects
      if (!isRedirecting) {
        setIsRedirecting(true);
        
        // Show error toast using Sonner
        toast.error("Broker not found", {
          description: "Please select a broker from the cashback page."
        });
        
        // Navigate back to cashback page after a short delay
        const timer = setTimeout(() => {
          window.location.href = '/cashback'; // Use direct browser navigation
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    } else {
      console.log("CashbackRegister - Valid broker found:", broker.name);
    }
  }, []); // Empty dependency array to run only once

  const handleRegistrationSuccess = () => {
    toast.success("Registration successful", {
      description: "Your cashback registration has been submitted successfully."
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
          
          {!isAuthenticated && (
            <div className="p-6 mb-6 bg-jaguarblue-700 border border-jaguarblue-600 rounded-lg">
              <p className="text-white mb-4">You need to be logged in to register for cashback.</p>
              <Button 
                className="bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
                onClick={() => navigate('/login')}
              >
                Login to Continue
              </Button>
            </div>
          )}
          
          {isAuthenticated && (
            <CashbackRegistrationForm 
              broker={broker} 
              onSuccess={handleRegistrationSuccess} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashbackRegister;
