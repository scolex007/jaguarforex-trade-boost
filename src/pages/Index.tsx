
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ToolsSection from "@/components/ToolsSection";
import CashbackSection from "@/components/CashbackSection";
import RegistrationSteps from "@/components/RegistrationSteps";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ToolsSection />
        <CashbackSection />
        <RegistrationSteps />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
