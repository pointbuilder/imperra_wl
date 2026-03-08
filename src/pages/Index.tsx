import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CapitalSection from "@/components/CapitalSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CapitalSection />
      <FeaturesSection />
      <SecuritySection />
      <FAQSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
