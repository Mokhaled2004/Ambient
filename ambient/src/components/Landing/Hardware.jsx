import React, { Suspense, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html, Center, Stage } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Separated Model Component for cleaner logic
function ESP32Model() {
  const { scene } = useGLTF("/models/esp32.glb");

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Texture & Color Fixes
        child.material.emissive = new THREE.Color("#000000");
        child.material.emissiveIntensity = 0;
        child.material.metalness = 0.4;
        child.material.roughness = 0.6;

        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
          child.material.map.needsUpdate = true;
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={45} rotation={[0.3, Math.PI / 4, 0]} />
    </Center>
  );
}

// Separated Info Segment for reusability
const InfoSegment = ({ title, subtitle, description }) => (
  <div className="mb-8 md:mb-12 last:mb-0 border-l-2 border-black/5 pl-6 md:pl-8 hover:border-[#FF6100] transition-colors duration-500">
    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6100] block mb-2">
      {title}
    </span>
    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3">
      {subtitle}
    </h4>
    <p className="text-black/50 text-sm max-w-sm leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

export default function Hardware() {
  return (
    <section className="bg-white text-black min-h-screen pt-12 pb-20 md:pb-32">
      {/* Title is imported or placed here */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Visualizer Block */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-3/5 h-[400px] md:h-[500px] lg:h-[700px] relative rounded-[2rem] md:rounded-[4rem] bg-[#f9f9f9] border border-black/5 overflow-hidden shadow-2xl shadow-black/5"
        >
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 35 }}
            gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Suspense
              fallback={
                <Html center className="font-bold text-[#FF6100]">
                  SYNCING NODE...
                </Html>
              }
            >
              <Stage
                intensity={0.5}
                environment="studio"
                adjustCamera={false}
                shadows={false}
              >
                <ESP32Model />
              </Stage>
            </Suspense>

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
            />
          </Canvas>

          {/* Real-time Status Overlays */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12 pointer-events-none">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">
              Active Mesh
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF6100] animate-ping" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-40">
                Node_0x1F2
              </span>
            </div>
          </div>
        </motion.div>

        {/* Functionality Text */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-2/5 py-10"
        >
          <InfoSegment
            title="Core Hardware"
            subtitle="ESP-WROOM-32"
            description="Dual-core processor with integrated BLE 5.0. It acts as the physical foundation of the campus mesh, broadcasting consistent data packets for real-time tracking."
          />

          <InfoSegment
            title="Positioning"
            subtitle="BLE Beacon & RSSI"
            description="The node broadcasts Received Signal Strength Indication (RSSI) metrics. The system utilizes trilateration to convert these signals into precise spatial coordinates."
          />

          <InfoSegment
            title="Monitoring"
            subtitle="Admin Control"
            description="Directly connected to the Admin Dashboard for live health telemetry. Monitor signal drop-offs, battery levels, and node uptime across the smart campus."
          />

          <button className="group mt-4 flex items-center gap-6">
            <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-[#FF6100] transition-all">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 10H15M15 10L11 6M15 10L11 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-black uppercase text-xs tracking-widest">
              Access Dashboard
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
