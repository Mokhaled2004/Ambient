import { motion } from "framer-motion"; // Use standard framer-motion for stability
import Spline from "@splinetool/react-spline";
import { useRef, useEffect, useState, useCallback } from "react";
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
  const requestRef = useRef(); // For smooth animation frame handling

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

    // THRIFTY MOUSE MOVE: Using requestAnimationFrame to prevent lag
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const updateRotation = () => {
      objectsToRotate.forEach((obj) => {
        // Linear Interpolation (Lerp) could be added here for even smoother motion
        obj.rotation.y = Math.PI * mouseX * 0.15;
        obj.rotation.x = -Math.PI * mouseY * 0.1;
      });
      requestRef.current = requestAnimationFrame(updateRotation);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(updateRotation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isLoaded]);

  const containerVars = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Optimization: Added 'style: { willChange: "transform" }' to bypass layout engine
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
      {/* 1. THE 3D STAGE - Lowered resolution for mobile/lag fix */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/rc0PswljtEybbL4X/scene.splinecode"
          onLoad={onSplineLoad}
          renderMode="manual" // Helps with performance control
        />
      </div>

      {/* 2. FLOATING DATA NODES - Performance Optimized */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          variants={floatingIconVars(0)}
          animate="animate"
          style={{ willChange: "transform" }}
          className="absolute top-[25%] left-[15%] text-[#FF6100]/20 p-4 border border-[#FF6100]/10 rounded-2xl backdrop-blur-sm"
        >
          <Binary size={32} />
        </motion.div>

        <motion.div
          variants={floatingIconVars(1)}
          animate="animate"
          style={{ willChange: "transform" }}
          className="absolute bottom-[30%] right-[10%] text-black/10 p-4 border border-black/5 rounded-2xl backdrop-blur-sm"
        >
          <Cpu size={28} />
        </motion.div>
      </div>

      {/* 3. THE CONTENT LAYER */}
      <motion.div
        variants={containerVars}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center text-center pointer-events-none"
      >
        <motion.div
          variants={itemVars}
          className="mb-6 flex items-center gap-3 pointer-events-auto"
        >
          <div className="h-px w-8 bg-black/20" />
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-black">
            System: Ambient v4.0.2
          </span>
          <div className="h-px w-8 bg-black/20" />
        </motion.div>

        <motion.h1
          variants={{
            initial: { opacity: 0, scale: 0.95 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: "circOut" },
            },
          }}
          className="text-6xl sm:text-8xl md:text-[140px] lg:text-[160px] font-black leading-[0.85] tracking-[-0.07em] uppercase mb-10"
        >
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #FF6100" }}
          >
            Ambient
          </span>
        </motion.h1>

        <motion.div
          variants={itemVars}
          className="mt-10 flex flex-col md:flex-row items-center gap-5 pointer-events-auto"
        >
          <button className="h-14 px-10 bg-black text-white rounded-full font-bold text-sm flex items-center gap-3 hover:bg-[#FF6100] transition-all shadow-xl group">
            Deploy Mesh Gateway
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
