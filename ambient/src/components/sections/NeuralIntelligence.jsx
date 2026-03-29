import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, Filter } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const metrics = [
  {
    icon: <Target size={16} />,
    tag: "Precision",
    value: "<1.0M",
    desc: "Sub-meter accuracy via neural weighting.",
  },
  {
    icon: <Zap size={16} />,
    tag: "Response",
    value: "45MS",
    desc: "Edge-optimized near-instant updates.",
  },
  {
    icon: <Filter size={16} />,
    tag: "Filtering",
    value: "99%",
    desc: "Multipath noise mitigation stability.",
  },
];

export default function NeuralIntelligence() {
  return (
    <section
      id="neural"
      className="pt-20 md:pt-32 pb-20 bg-white overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
        <SectionHeader
          topTag="The Intelligence"
          mainTitle="Neural"
          ghostTitle="Positioning"
          description="A custom deep learning architecture that filters environmental noise in real-time, predicting movement with sub-meter accuracy."
        />

        {/* Metric Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-black/5">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col items-center text-center p-12 md:p-16 group transition-colors duration-500
                ${i !== metrics.length - 1 ? "border-b md:border-b-0 md:border-r border-black/5" : ""}`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-[#FF6100]">
                  {m.icon}
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none uppercase group-hover:text-[#FF6100] transition-colors duration-500">
                  {m.value}
                </h3>
                <p className="text-black/40 text-[10px] md:text-[12px] font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RESTORED: Concept Highlights (Modern Minimalist style) */}
        <div className="mt-20 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            whileHover={{ x: 10 }}
            className="flex flex-col gap-4 pl-6 border-l-2 border-[#FF6100]/20 hover:border-[#FF6100] transition-colors duration-500"
          >
            <h4 className="text-xl font-black uppercase tracking-tighter">
              Environmental Awareness
            </h4>
            <p className="text-black/50 text-sm md:text-base font-medium leading-relaxed max-w-md">
              The model identifies and ignores signal interference caused by
              walls and infrastructure, ensuring smooth floor-to-floor
              transitions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ x: 10 }}
            className="flex flex-col gap-4 pl-6 border-l-2 border-[#FF6100]/20 hover:border-[#FF6100] transition-colors duration-500"
          >
            <h4 className="text-xl font-black uppercase tracking-tighter">
              Active Learning
            </h4>
            <p className="text-black/50 text-sm md:text-base font-medium leading-relaxed max-w-md">
              By analyzing real-time movement data, the engine constantly
              updates its spatial understanding of the campus environment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* The Responsive Anchor Line */}
      <div className="flex justify-center w-full px-6">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", maxWidth: "680px", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="bg-[#FF6100] rounded-full shadow-[0_4px_20px_rgba(255,97,0,0.3)]
                     h-[2px] md:h-[6px] 
                     w-[140px] md:w-[680px]"
        />
      </div>
    </section>
  );
}
