import React from "react";
import { motion } from "framer-motion";
import { Smartphone, LayoutPanelLeft, Map, MessageSquare } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const products = [
  {
    id: "01",
    title: "Mobile",
    tag: "Student App",
    icon: <Smartphone size={14} />,
    desc: "The primary student interface for live navigation and campus services.",
  },
  {
    id: "02",
    title: "Admin",
    tag: "Dashboard",
    icon: <LayoutPanelLeft size={14} />,
    desc: "Centralized hub for university staff to monitor node health and analytics.",
  },
  {
    id: "03",
    title: "Editor",
    tag: "Map Studio",
    icon: <Map size={14} />,
    desc: "The spatial workspace used to define and update campus geography.",
  },
  {
    id: "04",
    title: "Chat",
    tag: "AI Assistant",
    icon: <MessageSquare size={14} />,
    desc: "RAG-powered assistant for scheduling and automated navigation.",
  },
];

export default function OurProducts() {
  return (
    <section
      id="products"
      className="pt-20 md:pt-32 pb-20 bg-white overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full relative">
        <SectionHeader
          topTag="The Solutions"
          mainTitle="Our"
          ghostTitle="Products"
          description="The Ambient ecosystem is comprised of four core platforms designed to bridge the gap between complex spatial data and daily campus life."
        />

        {/* Modern Glass Grid */}
        <div className="mb-20 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }} // Elevated interaction
              className="relative p-8 md:p-10 border border-black/5 flex flex-col gap-6 group rounded-[3rem] overflow-hidden transition-all duration-300 backdrop-blur-sm bg-white/50" // Glass base
            >
              {/* Animated Glow */}
              <motion.div
                className="absolute inset-0 bg-[#FF6100]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem] blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative flex flex-col gap-1.5 z-10">
                <div className="flex items-center gap-2 text-[#FF6100]">
                  {product.icon}
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    {product.tag}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter italic leading-none uppercase group-hover:text-[#FF6100] transition-colors">
                  {product.title}
                </h3>
              </div>

              <p className="relative text-black/50 text-[11px] md:text-[12px] font-bold uppercase tracking-widest leading-relaxed z-10">
                {product.desc}
              </p>

              {/* Modern ID Tag */}
              <div className="absolute top-6 right-8 text-[9px] md:text-[10px] font-black text-black/10 z-10 bg-white px-2 py-0.5 rounded-full border border-black/5">
                P_{product.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive Anchor Line */}
      <div className="flex justify-center w-full px-6">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", maxWidth: "680px", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="bg-[#FF6100] rounded-full shadow-[0_4px_20px_rgba(255,97,0,0.3)]
                     h-[3px] md:h-[6px] 
                     w-[180px] md:w-[680px]"
        />
      </div>
    </section>
  );
}
