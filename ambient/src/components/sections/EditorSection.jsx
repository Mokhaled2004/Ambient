import React from "react";
import { motion } from "framer-motion";
import { Map, Layers, MousePointerClick } from "lucide-react";
import editorPreviewImg from "@/assets/editor-preview.png";

const editorSpecs = [
  {
    label: "Mapping",
    title: "Spatial Topology Editor",
    desc: "Define rooms, corridors, and points of interest with a precision-grid system designed for indoor environments.",
    icon: <Layers size={20} className="text-[#FF6100]" />,
  },
  {
    label: "Interaction",
    title: "Node Deployment",
    desc: "Virtually place and configure ESP32 mesh nodes to calibrate signal strength and coverage areas.",
    icon: <MousePointerClick size={20} className="text-[#FF6100]" />,
  },
];

export default function EditorSection() {
  return (
    <section
      id="editor-product"
      // Removed bg-white, added relative, z-10, and text-white
      className="relative z-10 py-16 md:py-24 text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Section Header - Aligned Right for variety */}
        <div className="relative mb-20 text-right">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100] block mb-4"
          >
            Product 03
          </motion.span>
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            Map <br /> <span className="text-[#FF6100]">Studio.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN: TECHNICAL SPECS */}
          <div className="space-y-12 order-2 lg:order-1">
            {editorSpecs.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                // Swapped border-black/5 to white alpha border
                className="group flex flex-col items-start border-l-2 border-white/10 pl-8 hover:border-[#FF6100] transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">
                    {spec.label}
                  </span>
                  <div className="group-hover:rotate-12 transition-transform duration-500">
                    {spec.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white group-hover:text-[#FF6100] transition-colors">
                  {spec.title}
                </h3>
                {/* Swapped text-black/50 to responsive text-zinc-400 */}
                <p className="text-[#FF6100] text-sm font-medium leading-relaxed max-w-md">
                  {spec.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: VISUAL PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            // Upgraded wrapper to dark alpha glass architecture with rich shadow depths
            className="relative aspect-video bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden group shadow-2xl shadow-black/50 order-1 lg:order-2"
          >
            <img
              src={editorPreviewImg}
              alt="Ambient Map Editor Interface"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Interface Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Swapped upper badge framework to high-tech dark mode glass */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md py-1.5 px-3 rounded-lg border border-white/10">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF6100] animate-pulse shadow-[0_0_8px_#FF6100]" />
              <span className="text-[9px] font-black uppercase tracking-tighter text-[#FF6100]">
                Canvas Sync: OK
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}