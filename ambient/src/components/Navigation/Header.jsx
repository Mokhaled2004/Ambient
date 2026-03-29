import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import LogoImg from "@/assets/AmbientLogo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "System Flow", href: "#flow" },
    { name: "Docs", href: "#docs" },
    { name: "Team", href: "#team" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-[100] py-6"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* 1. LOGO (Excluded from center border) */}
        <div className="flex-1 flex justify-start">
          <div className="cursor-pointer group">
            <img
              src={LogoImg}
              alt="Ambient Logo"
              className="h-10 md:h-15 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* 2. CENTER NAV (The Floating Rounded Border) */}
        <div className="hidden md:flex items-center bg-white/70 backdrop-blur-xl border border-black/5 px-8 py-3 rounded-full shadow-sm">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-black/60 hover:text-[#FF6100] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6100] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* 3. CONTACT (Excluded from center border) */}
        <div className="flex-1 hidden md:flex justify-end">
          <button className="flex items-center gap-3 px-7 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-[#FF6100] rounded-full shadow-[0_10px_25px_-8px_rgba(255,97,0,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(255,97,0,0.5)] hover:-translate-y-0.5 transition-all active:scale-95">
            <Mail size={14} strokeWidth={3} />
            Contact Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-4 text-black"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-black uppercase tracking-tighter"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="mt-8 flex items-center gap-3 px-10 py-5 text-sm font-black uppercase tracking-[0.2em] text-white bg-[#FF6100] rounded-2xl">
                <Mail size={20} /> Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
