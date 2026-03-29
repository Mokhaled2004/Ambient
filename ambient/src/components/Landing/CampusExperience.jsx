import { motion } from "framer-motion";
import { MapPin, Bot, Activity } from "lucide-react";

const features = [
  {
    title: "Seamless Navigation",
    desc: "End-to-end guidance across faculty buildings. Find your lecture hall or lab with floor-to-floor precision.",
    icon: <MapPin size={22} className="text-[#FF6100]" />,
    delay: 0.1,
  },
  {
    title: "Smart Assistance",
    desc: "A spatial companion that understands where you are. Ask about nearby facilities, office hours, or event locations.",
    icon: <Bot size={22} className="text-[#FF6100]" />,
    delay: 0.2,
  },
  {
    title: "Aware Environment",
    desc: "A campus that reacts to your presence. Optimized safety and resource management through real-time spatial data.",
    icon: <Activity size={22} className="text-[#FF6100]" />,
    delay: 0.3,
  },
];

export default function CampusExperience() {
  return (
    <section
      id="features"
      className="pt-20 md:pt-32 pb-16 bg-white overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-[#FF6100] block mb-4">
              The Experience
            </motion.span>
            <motion.h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
              Beyond the <br />{" "}
              <span className="text-black/10">Physical Space.</span>
            </motion.h2>
          </div>
          <p className="text-black/50 text-sm md:text-base font-medium max-w-sm leading-relaxed">
            We've built a digital nervous system for the campus, making everyday
            navigation and interaction completely frictionless.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: feature.delay,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col items-start"
            >
              {/* THE NUMBER & FLOATING ICON */}
              <div className="relative mb-6 inline-block">
                {/* GHOST NUMBER */}
                <span className="text-7xl md:text-8xl font-black text-black/[0.04] select-none italic tracking-tighter leading-none block group-hover:text-[#FF6100]/[0.08] transition-colors duration-700">
                  0{idx + 1}
                </span>

                {/* PURE ICON: No background, no borders, docked to the bottom right of the number */}
                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 z-10 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
                  {feature.icon}
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-[#FF6100] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-black/60 text-sm md:text-base font-medium leading-relaxed max-w-[280px]">
                  {feature.desc}
                </p>
              </div>

              {/* TECHNICAL FOOTER */}
              <div className="mt-8 pt-6 w-full border-t border-black/5 flex items-center justify-between opacity-40 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40">
                  Ambient Module v4.0
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-[#FF6100] animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER ANCHOR LINE */}
      <div className="flex justify-center w-full px-6">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%", maxWidth: "680px" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-[2px] md:h-[6px] bg-[#FF6100] rounded-full shadow-[0_4px_20px_rgba(255,97,0,0.3)] w-[140px] md:w-[680px]"
        />
      </div>
    </section>
  );
}
