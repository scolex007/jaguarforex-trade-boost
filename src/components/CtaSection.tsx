
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-jaguarblue-800 to-jaguarblue-700 rounded-2xl p-8 md:p-16 relative overflow-hidden border border-jaguarblue-600 shadow-lg">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-jaguargold/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-jaguargold/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Ready to <span className="gradient-text">Boost Your Trading?</span>
              </h2>
              <p className="text-gray-300 max-w-xl">
                Join thousands of traders already benefiting from our free tools and cashback program. Start maximizing your forex potential today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-primary flex items-center gap-2"
                asChild
              >
                <Link to="/register">
                  Create Account <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="btn-outline" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
