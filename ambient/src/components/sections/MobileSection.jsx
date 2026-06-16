import React from "react";
import { motion } from "framer-motion";
import { Navigation, Bell } from "lucide-react";
import mobilePreviewImg from "@/assets/mobile-preview.jpg"; // Placeholder for your screenshot

const mobileSpecs = [
  {
    label: "Navigation",
    title: "Sub-Meter Precision",
    desc: "Real-time navigation through campus hallways with turn-by-turn guidance powered by BLE mesh nodes.",
    icon: <Navigation size={20} className="text-[#FF6100]" />,
  },
  {
    label: "Engagement",
    title: "Smart Notifications",
    desc: "Location-aware alerts for lecture updates, room changes, and campus-wide events.",
    icon: <Bell size={20} className="text-[#FF6100]" />,
  },
];

export default function MobileSection() {
  return (
    <section
      id="mobile-product"
      // Removed bg-white, added relative, z-10, and text-white
      className="relative z-10 py-16 md:py-24 text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="relative mb-20 text-right">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100] block mb-4"
          >
            Product 01
          </motion.span>
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            Student <br /> <span className="text-[#FF6100]">Interface.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* TEXT ON LEFT FOR ZIG-ZAG */}
          <div className="space-y-12 order-2 lg:order-1">
            {mobileSpecs.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                // Swapped border-black/5 to border-white/10
                className="group flex flex-col items-start border-l-2 border-white/10 pl-8 hover:border-[#FF6100] transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">
                    {spec.label}
                  </span>
                  {spec.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white group-hover:text-[#FF6100] transition-colors">
                  {spec.title}
                </h3>
                {/* Swapped text-black/50 to premium text-zinc-400 */}
                <p className="text-[#FF6100] text-sm font-medium leading-relaxed max-w-md">
                  {spec.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* IMAGE ON RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            // Re-tuned background glass opacity, border, and shadows for dark mode
            className="relative aspect-[9/16] max-w-[400px] w-full mx-auto bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl shadow-black/50 order-1 lg:order-2"
          >
            <img
              src={mobilePreviewImg}
              alt="Ambient Mobile App"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}