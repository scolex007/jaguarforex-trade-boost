
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CashbackGuide = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast.success("Guide sent to your email!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-jaguarblue-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-jaguarblue-700 rounded-xl p-8 border border-jaguarblue-600">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Document preview */}
              <div className="flex-shrink-0">
                <div className="w-48 h-64 bg-white/5 rounded-md border border-jaguarblue-500 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-jaguarblue-700/30"></div>
                  <div className="text-center p-4 z-10">
                    <div className="text-3xl mb-2">📊</div>
                    <h4 className="font-bold text-sm">Maximizing Forex Rebates</h4>
                    <p className="text-xs text-gray-400 mt-2">A comprehensive one-page guide</p>
                  </div>
                </div>
              </div>
              
              {/* Form and description */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  Not ready to register yet?
                </h3>
                <p className="text-gray-300 mb-4">
                  Download our free 1-page guide to maximizing forex rebates and learn how to earn more from your existing trading activity.
                </p>
                
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    className="flex-shrink-0 flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Download className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Get The Guide"}
                  </Button>
                </form>
                
                <p className="text-xs text-gray-400 mt-3">
                  We'll send you occasional educational content. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackGuide;
