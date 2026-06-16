import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";
import Beams from "@/components/Landing/Beams";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import CampusExperience from "@/components/Landing/CampusExperience";
import AboutVision from "@/components/Landing/AboutVision";
import Hardware from "@/components/Landing/Hardware";
import SectionHeader from "@/components/ui/SectionHeader";
import NeuralIntelligence from "@/components/sections/NeuralIntelligence";
import OurProducts from "@/components/sections/OurProducts";
import AdminSection from "@/components/sections/AdminSection";
import MobileSection from "@/components/sections/MobileSection";
import EditorSection from "@/components/sections/EditorSection";
import ChatAssistantSection from "@/components/sections/ChatAssistantSection";
import TeamSection from "@/components/sections/TeamSection";
import IPSBackground from "@/components/ui/IPSBackground";
import ContactSection from "@/components/sections/ContactSection";

// ─────────────────────────────────────────────
// WAVE TEXT COMPONENT
// ─────────────────────────────────────────────
function WaveText({ text, className }) {
  return (
    <span className={className}>
      {text.split("").map((letter, index) => {
        if (letter === " ") return <span key={index}>&nbsp;</span>;
        return (
          <motion.span
            key={index}
            className="inline-block relative cursor-default origin-bottom"
            whileHover={{
              y: -14,
              scale: 1.08,
              filter: "brightness(1.5)",
              color: "#ffffff",
            }}
            transition={{ type: "spring", stiffness: 180, damping: 25 }}
          >
            {letter}
          </motion.span>
        );
      })}
    </span>
  );
}

// ─────────────────────────────────────────────
// APPLICATION CONTAINER
// ─────────────────────────────────────────────
function App() {
  return (
    <main className="relative min-h-screen text-white selection:bg-primary/20 selection:text-primary overflow-x-hidden font-['Urbanist',sans-serif]">

      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Oi&family=Protest+Guerrilla&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
          .font-display-ambient { font-family: 'Protest Guerrilla', sans-serif; }
          .font-accent-ambient  { font-family: 'Oi', serif; }
        `,
      }} />

      {/* ── ANIMATED IPS BACKGROUND (Fixed Blueprint Vector Layer) ── */}
      <IPSBackground />

      <SmoothCursor cursorColor="#ffffff" radius={10} />
      <Header />

      {/* ── HERO HEADER VIEWPORT AREA ── */}
      <div className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={7}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight max-w-5xl leading-[0.95] uppercase font-display-ambient select-none">
            <WaveText text="NAVIGATE THE" className="block text-white mb-2" />
            <WaveText
              text="AMBIENT SPACE"
              className="block text-[#FF6100] drop-shadow-[0_4px_24px_rgba(255,97,0,0.4)]"
            />
          </h1>

          <p className="mt-8 text-[#FF6100] text-base sm:text-lg md:text-xl max-w-2xl font-medium tracking-wide leading-relaxed drop-shadow-md">
            A real-time, context-aware indoor positioning system engineered to
            map, track, and optimize complex physical environments with absolute
            precision.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="bg-[#FF6100] text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#ff7b29] transition-all shadow-[0_0_20px_rgba(255,97,0,0.3)] active:scale-95">
              Initialize System
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm">
              Read IPS Docs
            </button>
          </div>
        </div>

        <div className="relative z-10 h-20 w-full" />
      </div>

      {/* ── INTERACTIVE APP SCROLL CONTENT BLOCKS ── */}
      <div className="relative z-10 flex flex-col gap-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AboutVision />
        <CampusExperience />
        <div>
          <SectionHeader
            topTag="The Core Grid"
            mainTitle="Spatial Infrastructure"
            ghostTitle="Telemetry Mesh"
            description="We've engineered a robust mesh of hardware nodes that act as the digital nervous system for your architecture, enabling hyper-accurate sub-meter positioning and spatial data streaming."
          />
        </div>
        <Hardware />
        <NeuralIntelligence />
        <OurProducts />
        <MobileSection />
        <AdminSection />
        <EditorSection />
        <ChatAssistantSection />
        <TeamSection />
        <ContactSection />
      </div>

      {/* ── APP FOOTER ANCHOR ── */}
      <div className="relative z-10 border-t border-white/5 bg-black/40 mt-20 backdrop-blur-md">
        <Footer />
      </div>

    </main>
  );
}

export default App;