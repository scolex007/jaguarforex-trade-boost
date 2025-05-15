
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CashbackHero from "@/components/cashback/CashbackHero";
import CashbackForm from "@/components/cashback/CashbackForm";
import CashbackSteps from "@/components/cashback/CashbackSteps";
import CashbackCalculator from "@/components/cashback/CashbackCalculator";
import CashbackTable from "@/components/cashback/CashbackTable";
import CashbackSocialProof from "@/components/cashback/CashbackSocialProof";
import CashbackPromotions from "@/components/cashback/CashbackPromotions";
import CashbackFaq from "@/components/cashback/CashbackFaq";
import CashbackCompliance from "@/components/cashback/CashbackCompliance";
import CashbackGuide from "@/components/cashback/CashbackGuide";
import CashbackFinalCta from "@/components/cashback/CashbackFinalCta";

const Cashback = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Handle scroll to show the sticky CTA after 30% of page scroll
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const pageHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollThreshold = (pageHeight - viewportHeight) * 0.3;

    if (scrollPosition > scrollThreshold) {
      setShowStickyCta(true);
    } else {
      setShowStickyCta(false);
    }
  };

  // Add scroll listener
  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      <main>
        <div className="relative">
          <section id="hero-section" className="relative">
            <CashbackHero />
            <div className="container mx-auto px-4 -mt-20 lg:-mt-32 relative z-10">
              <CashbackForm />
            </div>
          </section>

          <CashbackSteps />
          <CashbackCalculator />
          <CashbackTable />
          <CashbackSocialProof />
          <CashbackPromotions />
          <CashbackFaq />
          <CashbackCompliance />
          <CashbackGuide />
          <CashbackFinalCta sticky={showStickyCta} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cashback;
