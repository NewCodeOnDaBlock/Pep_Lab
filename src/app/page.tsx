import HeroSection           from "@/components/ui/HeroSection";
import StatsSection          from "@/components/ui/StatsSection";
import FeaturedProducts      from "@/components/ui/FeaturedProducts";
import BenefitsSection       from "@/components/ui/BenefitsSection";
import WolverineStackSection from "@/components/ui/WolverineStackSection";
import TrustSection          from "@/components/ui/TrustSection";
import Footer                from "@/components/layout/Footer";
import { getProducts }       from "@/data/products";

export default async function HomePage() {
  // Fetches from Sanity when configured, falls back to static data
  const products = await getProducts();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts products={products} />
      <BenefitsSection />
      <WolverineStackSection />
      <TrustSection />
      <Footer />
    </>
  );
}
