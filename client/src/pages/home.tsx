import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustIndicators from "@/components/TrustIndicators";
import FeaturedListings from "@/components/FeaturedListings";
import WalletPreview from "@/components/WalletPreview";
import SellerDashboardPreview from "@/components/SellerDashboardPreview";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Kalluba - Digital Assets Marketplace | Home";
  }, []);

  return (
    <div className="min-h-screen bg-kalluba-navy text-white">
      <Header />
      <HeroSection />
      <TrustIndicators />
      <FeaturedListings />
      <WalletPreview />
      <SellerDashboardPreview />
      <Footer />
    </div>
  );
}
