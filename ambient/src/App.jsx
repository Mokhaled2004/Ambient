import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";
import Hero from "@/components/Landing/Hero";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import CampusExperience from "@/components/Landing/CampusExperience";
import AboutVision from "@/components/Landing/AboutVision";
import Hardware from "@/components/Landing/Hardware";
import SectionHeader from "@/components/ui/SectionHeader";
import NeuralIntelligence from "@/components/sections/NeuralIntelligence";
import OurProducts from "@/components/sections/OurProducts";
import AdminSection from "@/components/sections/AdminSection";
function App() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-primary/20 selection:text-primary">
      {/* 1. Black Smooth Cursor - High Contrast */}
      <div className="pointer-events-none fixed inset-0 z-[9999]">
        <SmoothCursor cursorColor="#000000" radius={10} />
      </div>

      <Header />

      <div className="flex flex-col">
        <Hero />
      </div>

      <div className="flex flex-col">
        <AboutVision />
      </div>

      <div className="flex flex-col">
        <CampusExperience />
      </div>
      <div className="flex flex-col">
        <SectionHeader
          topTag="The Foundation"
          mainTitle="Infrastructure"
          ghostTitle="Physical Space"
          description="We've engineered a robust mesh of physical nodes that act as the digital nervous system for the campus, enabling sub-meter positioning and real-time telemetry."
        />
      </div>

      <div className="flex flex-col">
        <Hardware />
      </div>
      <div className="flex flex-col">
        <NeuralIntelligence />
      </div>
      <div className="flex flex-col">
        <OurProducts />
      </div>
      <div className="flex flex-col">
        <AdminSection />
      </div>

      <Footer />

      {/* Subtle background glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px]" />
      </div>
    </main>
  );
}

export default App;
