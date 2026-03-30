import { motion } from "framer-motion";

export default function AboutVision() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">
          {/* Left Side: Small Label */}
          <div className="w-full md:w-1/4">
            <div className="md:sticky md:top-32 mb-6 md:mb-0">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#FF6100] border-l-2 border-[#FF6100] pl-4">
                Origin Story
              </span>
            </div>
          </div>

          {/* Right Side: Big Bold Statement */}
          <div className="w-full md:w-3/4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.2] md:leading-[1.1] text-black break-words"
            >
              We are a team of engineers{" "}
              <span className="text-black/20">
                reimagining how humans interact with physical environments.
              </span>{" "}
              Ambient started as a graduation project with a simple goal: to
              make indoor spaces as searchable and navigable as the web.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 border-t border-black/5 pt-10 md:pt-12"
            >
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF6100] mb-4">
                  Our Vision
                </h4>
                <p className="text-black/50 font-medium leading-relaxed">
                  To eliminate the friction of complex indoor environments
                  through a unified spatial layer that lives in the background
                  of your daily life.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF6100] mb-4">
                  The Team
                </h4>
                <p className="text-black/50 font-medium leading-relaxed">
                  Driven by AI, IoT, and high-precision spatial data, we bridge
                  the gap between hardware and human experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
