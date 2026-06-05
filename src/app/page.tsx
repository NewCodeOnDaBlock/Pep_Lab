import HeroSection from "@/components/ui/HeroSection";
import FeaturedProducts from "@/components/ui/FeaturedProducts";
import WolverineStackSection from "@/components/ui/WolverineStackSection";
import StatsSection from "@/components/ui/StatsSection";
import TrustSection from "@/components/ui/TrustSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <WolverineStackSection />
      <TrustSection />
      <Footer />
    </>
  );
}
