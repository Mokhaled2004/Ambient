import { motion } from "framer-motion";
import { Activity, ShieldCheck, Cpu } from "lucide-react";

// 1. IMPORT THE IMAGE MANUALLY

import adminPreviewImg from "@/assets/admin-preview.png";

const adminSpecs = [
  {
    label: "Monitoring",
    title: "Live Health Telemetry",
    desc: "Real-time tracking of signal drop-offs, battery levels, and node uptime across the smart campus.",
    icon: <Activity size={20} className="text-[#FF6100]" />,
  },
  {
    label: "Security",
    title: "Access Control",
    desc: "Enterprise-grade authentication and role-based permissions for faculty and security personnel.",
    icon: <ShieldCheck size={20} className="text-[#FF6100]" />,
  },
  {
    label: "Core Infrastructure",
    title: "ESP-WROOM-32 Management",
    desc: "Direct interface with the campus mesh physical foundation for remote configuration and updates.",
    icon: <Cpu size={20} className="text-[#FF6100]" />,
  },
];

export default function AdminSection() {
  return (
    <section id="admin-product" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="relative mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100] block mb-4"
          >
            Product 02
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] md:leading-none break-words">
            Admin <br />
            <span className="text-black/10">Dashboard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN: VISUAL PREVIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video bg-black/[0.02] rounded-3xl border border-black/[0.05] overflow-hidden group shadow-2xl"
          >
            {/* 2. USE THE IMPORTED VARIABLE HERE */}
            <img
              src={adminPreviewImg}
              alt="Ambient Admin Dashboard Interface"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Technical Overlay Decor */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-md py-2 px-4 rounded-full border border-black/5 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-[#FF6100] animate-pulse shadow-[0_0_8px_rgba(255,97,0,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                System Status: Active
              </span>
            </div>

            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-md">
                v4.0.2 Stable Build
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: TECHNICAL SPECS */}
          <div className="space-y-12">
            {adminSpecs.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group flex flex-col items-start border-l-2 border-black/5 pl-6 md:pl-8 hover:border-[#FF6100] transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">
                    {spec.label}
                  </span>
                  <div className="transform group-hover:rotate-12 transition-transform duration-500">
                    {spec.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-[#FF6100] transition-colors">
                  {spec.title}
                </h3>
                <p className="text-black/50 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  {spec.desc}
                </p>
              </motion.div>
            ))}

            <div className="pt-8">
              <div className="h-[1px] w-24 bg-black/10 group-hover:w-full transition-all duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
