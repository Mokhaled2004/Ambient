import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Send } from "lucide-react";
import chatPreviewImg from "@/assets/editor-preview.png";

const chatSpecs = [
  {
    label: "Intelligence",
    title: "RAG-Powered Logic",
    desc: "Instant answers to campus policy, schedules, and room locations using localized knowledge retrieval from the Ambient database.",
    icon: <Bot size={20} className="text-[#FF6100]" />,
  },
  {
    label: "Automation",
    title: "Pathfinding Commands",
    desc: "Ask the assistant to 'Take me to the nearest lab' to instantly generate a live navigation route on your mobile interface.",
    icon: <Sparkles size={20} className="text-[#FF6100]" />,
  },
];

export default function ChatAssistantSection() {
  return (
    <section
      id="chat-product"
      // Removed light background, added relative alignment, z-index, and global text-white
      className="relative z-10 py-16 md:py-24 text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Section Header - Back to Left Alignment */}
        <div className="relative mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100] block mb-4"
          >
            Product 04
          </motion.span>
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            AI <br /> <span className="text-[#FF6100]">Assistant.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN: VISUAL PREVIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            // Remapped wrapper matrix into seamless dark grid glass
            className="relative aspect-square max-w-[550px] w-full bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 overflow-hidden group shadow-2xl shadow-black/50"
          >
            <img
              src={chatPreviewImg}
              alt="Ambient AI Assistant Interface"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Chat UI Overlay Decor - Upgraded to hyper-transparent premium glass */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#FF6100]/20 flex items-center justify-center">
                  <Bot size={16} className="text-[#FF6100]" />
                </div>
                <div className="space-y-1">
                  {/* Swapped black placeholders to translucent text streams */}
                  <div className="h-2 w-24 bg-white/20 rounded-full animate-pulse" />
                  <div className="h-2 w-16 bg-white/10 rounded-full" />
                </div>
              </div>
              <Send size={16} className="text-white/40" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: TECHNICAL SPECS */}
          <div className="space-y-12">
            {chatSpecs.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                // Shifted structural border to white alpha weights
                className="group flex flex-col items-start border-l-2 border-white/10 pl-8 hover:border-[#FF6100] transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">
                    {spec.label}
                  </span>
                  <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
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

            {/* Final CTA for the product block - Inverted to bold solid-white for maximum contrast punch */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#FF6100] hover:text-white transition-colors duration-300 shadow-xl"
            >
              Explore Knowledge Base
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}