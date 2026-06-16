import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import LogoImg from "@/assets/AmbientLogo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeTab, setActiveTab] = useState("#features");
  const [hoveredTab, setHoveredTab] = useState(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
  });

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Products", href: "#products" },
    { name: "Team", href: "#team" },
    { name: "Infrastructure", href: "#neural" },
  ];

  const handleLinkClick = (href) => {
    setActiveTab(href);
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Main nav bar */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ zIndex: 9999 }}
        className="fixed top-0 left-0 right-0 py-4 md:py-6"
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex-1 flex justify-start">
            <a
              href="#"
              style={{ position: "relative", zIndex: 10000, cursor: "pointer" }}
              className="group"
            >
              <img
                src={LogoImg}
                alt="Ambient Logo"
                className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
          </div>

          {/* CENTER NAV — desktop only */}
          <div
            style={{ position: "relative", zIndex: 10000 }}
            className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 rounded-full shadow-2xl"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.href;
                const isHovered = hoveredTab === link.href;
                return (
                  <div key={link.name} style={{ position: "relative" }}>
                    {/* Active background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        style={{ position: "absolute", inset: 0, zIndex: 0, borderRadius: "9999px", background: "white" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover underline */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hoverUnderline"
                        style={{ position: "absolute", bottom: 4, left: 16, right: 16, height: 2, zIndex: 0, background: "white" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}

                    {/* The actual link — sits above animations */}
                    <a
                      href={link.href}
                      style={{ position: "relative", zIndex: 1, display: "block", cursor: "pointer" }}
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full transition-colors duration-200 select-none ${isActive ? "text-black" : "text-white"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      onMouseEnter={() => setHoveredTab(link.href)}
                    >
                      {link.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTACT BUTTON — desktop only */}
          <div className="flex-1 hidden md:flex justify-end">
            <button
              onClick={() => handleLinkClick("#contact")}
              style={{ position: "relative", zIndex: 10000, cursor: "pointer" }}
              className="flex items-center gap-2.5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black bg-white rounded-full hover:bg-zinc-200 transition-all active:scale-95"
            >
              <Mail size={12} strokeWidth={2.5} /> Contact Us
            </button>
          </div>

          {/* BURGER — mobile only */}
          <button
            style={{ position: "relative", zIndex: 10000, cursor: "pointer" }}
            className="md:hidden p-2 -mr-2 text-white bg-transparent touch-manipulation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 9998 }}
            className="fixed inset-0 bg-[#0b0b0f]/98 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-6 w-full px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{ cursor: "pointer" }}
                  className={`text-2xl font-bold uppercase tracking-widest py-2 transition-colors ${activeTab === link.href
                    ? "text-white underline underline-offset-8 decoration-2"
                    : "text-zinc-400"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              ))}
              <button
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleLinkClick("#contact");
                  setMobileMenuOpen(false);
                }}
                className="mt-6 flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black bg-white rounded-full w-48 justify-center"
              >
                <Mail size={16} /> Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
