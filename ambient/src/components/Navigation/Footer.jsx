import { motion } from "framer-motion";
// Swapping brand icons for technical ones to ensure the build passes
import { Globe, Mail, Cpu, Shield, Terminal, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Defined links to fix the "links is not defined" error in your previous snippet
  const links = {
    Product: ["Mobile App", "Admin Dashboard", "Map Studio"],
    Resources: ["Documentation", "Hardware Specs", "API Reference"],
  };

  const socialLinks = [
    { Icon: Terminal, href: "#" }, // Stands in for Github
    { Icon: Cpu, href: "#" }, // Stands in for LinkedIn/Tech
    { Icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-black/[0.05] pt-16 md:pt-20 pb-8 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-[#FF6100] rounded-sm flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
              </div>
              <span className="text-lg md:text-xl font-black uppercase tracking-tighter">
                Ambient<span className="text-[#FF6100]">.</span>
              </span>
            </div>
            <p className="text-black/50 text-sm leading-relaxed max-w-xs font-medium">
              Architecting the digital nervous system for the modern campus.
              Spatial intelligence meets seamless navigation.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 border border-black/5 rounded-lg hover:border-[#FF6100] hover:text-[#FF6100] transition-all"
                >
                  {social.Icon && <social.Icon size={18} />}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
                {title}
              </h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm font-bold text-black/60 hover:text-[#FF6100] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 items-center">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-black/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Cairo, EG // 30.0444° N, 31.2357° E
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">
              Build: v4.0.2-stable
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6100]/60">
              System Status: Nominal
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-[#FF6100] shadow-[0_0_8px_rgba(255,97,0,0.4)]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
