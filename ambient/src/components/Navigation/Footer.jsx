import React from "react";
import { motion } from "framer-motion";
import { Globe, Mail, Cpu, Terminal } from "lucide-react";
import LogoImg from "@/assets/AmbientLogo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer
      // Removed bg-white, added relative, z-10, text-white, and converted border to white/10 alpha
      className="relative z-10 border-t border-white/10 pt-16 md:pt-20 pb-8 md:pb-10 text-white"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <img
                src={LogoImg}
                alt="Ambient Logo"
                className="h-6 md:h-8 w-auto object-contain"
              />

            </div>
            {/* Swapped text-black/50 to responsive text-zinc-400 */}
            <p className="text-[#FF6100] text-sm leading-relaxed max-w-xs font-medium">
              Architecting the digital nervous system for the modern campus.
              Spatial intelligence meets seamless navigation.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  // Remapped border and icon color mechanics to fit premium dark theme scales
                  className="p-2 border border-white/10 text-[#FF6100] rounded-lg hover:border-[#FF6100] hover:text-[#FF6100] transition-all duration-300"
                >
                  {social.Icon && <social.Icon size={18} />}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-6">
              {/* Swapped header tracking weights to white alpha */}
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                {title}
              </h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      // Swapped link list states to zinc typography frameworks
                      className="text-sm font-bold text-[#FF6100] hover:text-[#FF6100] transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Upgraded bottom separator to white/10 grid alpha */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 items-center">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6100]">
                Cairo, EG // 30.0444° N, 31.2357° E
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              Build: v4.0.2-stable
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF6100]/80">
              System Status: Nominal
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-[#FF6100] shadow-[0_0_8px_#FF6100]" />
          </div>
        </div>
      </div>
    </footer>
  );
}