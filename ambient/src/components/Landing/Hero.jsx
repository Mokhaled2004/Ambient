import { motion } from "motion/react";
import Spline from "@splinetool/react-spline";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Binary,
  Zap,
  Cpu,
  Radio,
} from "lucide-react";

export default function AmbientCenterHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef(null);

  // --- HEAD FOLLOW LOGIC ---
  function onSplineLoad(e) {
    splineRef.current = e;
    setIsLoaded(true);
  }

  useEffect(() => {
    if (!splineRef.current) return;
    const objectNames = ["Group", "Head"];
    const objectsToRotate = objectNames
      .map((name) => splineRef.current.findObjectByName(name))
      .filter((obj) => obj);

    function handleMouseMove(e) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (e.clientX - centerX) / centerX;
      const normY = (e.clientY - centerY) / centerY;

      objectsToRotate.forEach((obj) => {
        obj.rotation.y = Math.PI * normX * 0.15;
        obj.rotation.x = -Math.PI * normY * 0.1;
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoaded]);

  // --- ANIMATION VARIANTS ---
  const containerVars = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingIconVars = (delay) => ({
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <section className="relative min-h-screen bg-[#FDFDFD] flex items-center justify-center overflow-hidden font-sans select-none">
      {/* 1. THE 3D STAGE */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/rc0PswljtEybbL4X/scene.splinecode"
          onLoad={onSplineLoad}
        />
      </div>

      {/* --- 2. FLOATING DATA NODES (Exciting Stuff) --- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Floating Binary Icon */}
        <motion.div
          variants={floatingIconVars(0)}
          animate="animate"
          className="absolute top-[25%] left-[15%] text-[#FF6100]/20 p-4 border border-[#FF6100]/10 rounded-2xl backdrop-blur-sm"
        >
          <Binary size={32} />
        </motion.div>

        {/* Floating CPU Icon */}
        <motion.div
          variants={floatingIconVars(1)}
          animate="animate"
          className="absolute bottom-[30%] right-[10%] text-black/10 p-4 border border-black/5 rounded-2xl backdrop-blur-sm"
        >
          <Cpu size={28} />
        </motion.div>

        {/* Floating Signal Icon */}
        <motion.div
          variants={floatingIconVars(2.5)}
          animate="animate"
          className="absolute top-[15%] right-[20%] text-[#FF6100]/20 p-4 border border-[#FF6100]/10 rounded-2xl backdrop-blur-sm"
        >
          <Radio size={24} />
        </motion.div>
      </div>

      {/* 3. THE CONTENT LAYER */}
      <motion.div
        variants={containerVars}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col items-center text-center pointer-events-none"
      >
        {/* WELCOME TAG - Slides up */}
        <motion.div
          variants={itemVars}
          className="mb-6 flex items-center gap-3 pointer-events-auto"
        >
          <div className="h-px w-8 bg-black/20" />
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-black">
            Welcome to Ambient
          </span>
          <div className="h-px w-8 bg-black/20" />
        </motion.div>

        {/* THE MAIN TEXT - Scale & Fade */}
        <motion.h1
          variants={{
            initial: { opacity: 0, scale: 0.9 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: "circOut" },
            },
          }}
          className="text-6xl sm:text-8xl md:text-[140px] lg:text-[160px] font-black leading-[0.85] tracking-[-0.07em] uppercase pointer-events-none mb-10 md:mb-14"
        >
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "3px #FF6100" }}
          >
            Ambient
          </span>
        </motion.h1>

        {/* BUTTONS - Staggered emergence */}
        <motion.div
          variants={itemVars}
          className="mt-10 flex flex-col md:flex-row items-center gap-5 pointer-events-auto"
        >
          <button className="w-full md:w-auto h-14 px-8 md:px-10 bg-black text-white rounded-full font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#FF6100] transition-all shadow-xl active:scale-95 group">
            Deploy Mesh Gateway
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <button className="h-14 w-14 flex items-center justify-center border border-black/10 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-sm group">
            <ChevronRight
              size={18}
              className="text-black group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
