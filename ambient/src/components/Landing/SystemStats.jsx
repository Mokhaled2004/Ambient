import { motion } from "framer-motion";
import { Cpu, Signal, ShieldCheck, Zap } from "lucide-react";

const stats = [
  {
    title: "Precision",
    value: "0.5M SPATIAL",
    desc: "Ultra-wideband accuracy for indoor tracking.",
    icon: <Signal className="text-[#FF6100]" size={24} />,
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Nodes",
    value: "ACTIVE MESH",
    desc: "Self-healing ESP32 mesh network.",
    icon: <Cpu className="text-black" size={24} />,
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Latency",
    value: "12MS (AVG)",
    desc: "Real-time telemetry with zero lag.",
    icon: <Zap className="text-[#FF6100]" size={24} />,
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Security",
    value: "AES-128",
    desc: "Enterprise-grade data encryption.",
    icon: <ShieldCheck className="text-black" size={24} />,
    gridClass: "md:col-span-2 md:row-span-1",
  },
];

export default function SystemStats() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFDFD]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100]">
            System Specifications
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85] mt-4 break-words">
            The Engine Behind <br /> Ambient.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white border border-black/5 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col min-h-[160px] md:min-h-0 ${stat.gridClass}`}
            >
              {/* Top Row: Icon & ID */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black text-black/20 tracking-widest">
                  0{index + 1} // 10
                </span>
              </div>

              {/* Data Row */}
              <div className="mt-auto">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs text-black/50 mt-2 font-medium leading-relaxed max-w-full sm:max-w-[200px]">
                  {stat.desc}
                </p>
              </div>

              {/* Decorative Pulse (for the Nodes card) */}
              {stat.title === "Nodes" && (
                <div className="absolute top-8 right-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
