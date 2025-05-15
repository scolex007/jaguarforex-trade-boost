
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const CashbackCompliance = () => {
  return (
    <section className="py-10 bg-jaguarblue-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-jaguarblue-700/70 rounded-lg p-6 border border-jaguarblue-600">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Info className="h-6 w-6 text-jaguargold" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium mb-2">KYC & Compliance Note</h3>
              <p className="text-gray-300 mb-4">
                JaguarForex rebates are funded from broker commissions. You must complete broker KYC to withdraw funds. 
                All traders must comply with applicable regulations in their jurisdiction.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="text-xs">
                  View Terms & Conditions
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Privacy Policy
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  GDPR Rights
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackCompliance;
