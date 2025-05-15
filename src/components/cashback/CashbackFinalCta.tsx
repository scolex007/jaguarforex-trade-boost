
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CashbackFinalCtaProps {
  sticky?: boolean;
}

const CashbackFinalCta = ({ sticky = false }: CashbackFinalCtaProps) => {
  return (
    <>
      {/* Normal CTA */}
      <section className="py-20 bg-gradient-to-b from-jaguarblue-900 to-jaguarblue-800" id="final-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Turn Every Trade Into Income?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders already earning cashback on their normal trading activity.
          </p>
          <Button 
            className="btn-primary text-lg px-8 py-6 h-auto flex items-center gap-2"
            onClick={() => {
              const formElement = document.getElementById('cashback-form');
              formElement?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Register & Link Account <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Sticky mobile CTA - only visible when scrolled past threshold */}
      {sticky && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-jaguarblue-900/90 backdrop-blur-sm p-4 border-t border-jaguarblue-700 z-50">
          <Button 
            className="w-full btn-primary"
            onClick={() => {
              const formElement = document.getElementById('cashback-form');
              formElement?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Claim My Cashback
          </Button>
        </div>
      )}
    </>
  );
};

export default CashbackFinalCta;
