import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Cpu,
  Code2,
  Smartphone,
  Database,
  Terminal,
} from "lucide-react";

const team = [
  {
    id: "01",
    name: "Mohamed Khaled",
    role: "Full Stack & DevOps",
    desc: "Architected the core RAG pipeline and containerized deployment on Red Hat OpenShift.",
    icon: <Terminal className="w-12 h-12" />,
  },
  {
    id: "02",
    name: "Lodgy",
    role: "Backend Engineer",
    desc: "Specialized in positioning services, telemetry data processing, and physical node health monitoring.",
    icon: <Database className="w-12 h-12" />,
  },
  {
    id: "03",
    name: "Rodyna",
    role: "Backend Engineer",
    desc: "Focused on navigation logic, spatial mapping, and core system APIs for real-time routing.",
    icon: <Code2 className="w-12 h-12" />,
  },
  {
    id: "04",
    name: "Omar",
    role: "Mobile Developer",
    desc: "Developing the cross-platform student interface and implementing smooth pathfinding UI transitions.",
    icon: <Smartphone className="w-12 h-12" />,
  },
  {
    id: "05",
    name: "Noureen",
    role: "Mobile Developer",
    desc: "Crafting the mobile user experience and integrating BLE positioning telemetry for indoor tracking.",
    icon: <Cpu className="w-12 h-12" />,
  },
];

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="team"
      // Removed bg-white, added relative tracking, z-index, and text-white
      className="relative z-10 py-24 text-white select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100] mb-2"
          >
            The Collective
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
            Engineering <span className="text-[#FF6100]">Staff.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE: MINIMALIST LIST */}
          <div className="flex flex-col">
            {team.map((member, idx) => (
              <div
                key={member.id}
                onMouseEnter={() => setActiveIndex(idx)}
                className="group relative py-7 md:py-9 cursor-pointer overflow-hidden"
              >
                <div className="flex items-baseline gap-6 relative z-10">
                  {/* ID Number - Shifted index to white alpha weights */}
                  <span
                    className={`text-[10px] font-black transition-colors duration-500 ${activeIndex === idx ? "text-[#FF6100]" : "text-white/20"
                      }`}
                  >
                    {member.id}
                  </span>

                  {/* Name with Horizontal Shift and dark-theme color logic */}
                  <h3
                    className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 ease-[0.16, 1, 0.3, 1] ${activeIndex === idx
                      ? "translate-x-6 text-white"
                      : "text-white/20 group-hover:text-white/40"
                      }`}
                  >
                    {member.name}
                  </h3>
                </div>

                {/* Translucent separating lines */}
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-white/10 w-full"
                />
                {activeIndex === idx && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-[1px] bg-[#FF6100] w-full z-20"
                  />
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: FEATURED DOSSIER */}
          {/* Updated background to true dark glass architecture */}
          <div className="relative h-[450px] bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col"
              >
                <div className="mb-8 text-[#FF6100]">
                  {team[activeIndex].icon}
                </div>

                <div className="flex-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6100] mb-4 block">
                    Responsibility
                  </span>
                  <p className="text-2xl md:text-3xl font-bold leading-[1.1] text-white tracking-tight">
                    {team[activeIndex].desc}
                  </p>
                </div>

                {/* Border-t remapped to white alpha parameters */}
                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">
                      {team[activeIndex].role}
                    </p>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">
                      Cairo University • 2026
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {/* Inverted layout hover aesthetics to contrast smoothly against dark backgrounds */}
                    <div className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black text-white transition-all duration-300 cursor-pointer">
                      <Mail size={14} />
                    </div>
                    <div className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black text-white transition-all duration-300 cursor-pointer">
                      <User size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}