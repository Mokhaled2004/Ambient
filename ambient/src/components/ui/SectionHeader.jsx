import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({
  topTag,
  mainTitle,
  ghostTitle,
  description,
}) {
  return (
    <section className="w-full bg-white pt-12 md:pt-16 pb-12 md:pb-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          {/* Left Column: Titles */}
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#FF6100] block mb-4 md:mb-6"
            >
              {topTag}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85] break-words"
            >
              {mainTitle} <br />
              <span className="text-black/10">{ghostTitle}.</span>
            </motion.h2>
          </div>

          {/* Right Column: Description Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:pb-4"
          >
            <p className="text-black/50 font-medium max-w-full md:max-w-sm leading-relaxed text-[14px] md:text-[15px]">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
