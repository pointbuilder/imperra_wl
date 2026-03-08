import ArkNavbar from "@/components/ArkNavbar";
import ArkHero from "@/components/ArkHero";
import ArkFeatures from "@/components/ArkFeatures";
import ArkHowItWorks from "@/components/ArkHowItWorks";
import ArkRoadmap from "@/components/ArkRoadmap";
import ArkWaitlist from "@/components/ArkWaitlist";
import ArkFooter from "@/components/ArkFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ArkNavbar />
      <ArkHero />
      <ArkFeatures />
      <ArkHowItWorks />
      <ArkRoadmap />
      <ArkWaitlist />
      <ArkFooter />
    </div>
  );
};

export default Index;
