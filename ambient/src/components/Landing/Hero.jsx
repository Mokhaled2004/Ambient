import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AmbientCenterHero() {
  const [isMobile, setIsMobile] = useState(false);
  const viewerRef = useRef(null);
  const requestRef = useRef();

  // Use a ref to store coordinates without triggering re-renders
  const mouseCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) {
      return () => window.removeEventListener("resize", checkMobile);
    }

    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleMouseMove = (e) => {
      mouseCoords.current.x =
        (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseCoords.current.y =
        (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const onLoad = () => {
      const spline = viewer.getSpline();
      const objectNames = ["Group", "Head"];
      const objectsToRotate = objectNames
        .map((name) => spline.findObjectByName(name))
        .filter((obj) => obj);

      const updateRotation = () => {
        objectsToRotate.forEach((obj) => {
          obj.rotation.y = Math.PI * mouseCoords.current.x * 0.15;
          obj.rotation.x = -Math.PI * mouseCoords.current.y * 0.1;
        });
        requestRef.current = requestAnimationFrame(updateRotation);
      };

      requestRef.current = requestAnimationFrame(updateRotation);
    };

    viewer.addEventListener("load", onLoad);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      viewer.removeEventListener("load", onLoad);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  return (
    <section className="relative min-h-screen bg-[#FDFDFD] flex items-center justify-center overflow-hidden select-none">
      {/* FIXED STYLE BLOCK */}
      <style>{`
        spline-viewer::part(logo) {
          display: none !important;
        }
      `}</style>

      {/* 1. THE STAGE */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {!isMobile ? (
          <>
            <spline-viewer
              ref={viewerRef}
              url="/models/robot.spline"
              hint="none"
              loading-reveal="async"
            ></spline-viewer>

            <div className="absolute bottom-4 right-4 w-44 h-12 bg-[#1c222b]/95 backdrop-blur-md z-10 pointer-events-none flex items-center justify-center rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-white/5">
              <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">
                Built with Ambient
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFDFD] via-[#FF6100]/5 to-[#FDFDFD]" />
        )}
      </div>

      {/* 2. THE CONTENT LAYER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center text-center pointer-events-none"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-black/20" />
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-black">
            Welcome to Ambient
          </span>
          <div className="h-px w-8 bg-black/20" />
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-[140px] lg:text-[160px] font-black leading-[0.85] tracking-[-0.07em] uppercase mb-10">
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #FF6100" }}
          >
            Ambient
          </span>
        </h1>

        <button className="h-14 px-10 bg-black text-white rounded-full font-bold text-sm flex items-center gap-3 hover:bg-[#FF6100] transition-all pointer-events-auto shadow-xl group">
          Deploy Mesh Gateway
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </motion.div>
    </section>
  );
}
