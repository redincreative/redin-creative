import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import ServicesSection from "@/components/ServicesSection";
import DashboardSection from "@/components/DashboardSection";
import CasesSection from "@/components/CasesSection";
import AIGenerator from "@/components/AIGenerator";
import ROICalculator from "@/components/ROICalculator";
import InsightsSection from "@/components/InsightsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <DashboardSection />
      <CasesSection />
      <AIGenerator />
      <ROICalculator />
      <InsightsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
