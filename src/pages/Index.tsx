import ExroNavbar from "@/components/ExroNavbar";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import TrendingBar from "@/components/TrendingBar";
import MarketsGrid from "@/components/MarketsGrid";
import ExroFooter from "@/components/ExroFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ExroNavbar />
      <FeaturedCarousel />
      <TrendingBar />
      <MarketsGrid />
      <ExroFooter />
    </div>
  );
};

export default Index;
