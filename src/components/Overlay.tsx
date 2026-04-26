"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 0.75, 0]);
  const kuberX = useTransform(scrollYProgress, [0, 0.18], [0, 150]);
  const jhaX = useTransform(scrollYProgress, [0, 0.18], [0, -150]);
  const nameY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);
  const mobileNameY = useTransform(scrollYProgress, [0, 0.18], [0, -64]);

  // Section 2: 25% to 45%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 50% to 75%
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.8], [100, -100]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      {/* Section 1: Split name */}
      <motion.h1
        style={{ opacity: opacity1, x: kuberX, y: nameY }}
        className="absolute left-6 top-[48%] hidden -translate-y-1/2 font-kuber text-5xl text-white drop-shadow-2xl sm:left-12 sm:block sm:text-6xl md:left-24 md:text-8xl"
      >
        Kuber
      </motion.h1>

      <motion.h1
        style={{ opacity: opacity1, x: jhaX, y: nameY }}
        className="absolute right-6 top-[48%] hidden -translate-y-1/2 font-kuber text-5xl text-white drop-shadow-2xl sm:right-12 sm:block sm:text-6xl md:right-24 md:text-8xl"
      >
        Jha
      </motion.h1>

      <motion.h1
        style={{ opacity: opacity1, y: mobileNameY }}
        className="absolute inset-x-0 bottom-16 px-4 pb-10 text-center font-kuber text-5xl text-white drop-shadow-2xl sm:hidden"
      >
        Kuber Jha
      </motion.h1>

      <span className="absolute bottom-6 right-4 max-w-[130px] text-right text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-white drop-shadow-md sm:right-12 sm:max-w-none sm:text-base sm:tracking-[0.24em] md:right-24">
        FullStack Developer
      </span>

      <div className="absolute bottom-6 left-4 flex items-center gap-1.5 text-left sm:left-12 sm:gap-3 md:left-24">
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          className="overflow-visible"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="10" stroke="#FFF" strokeWidth="1.5" fill="none" />
          <motion.path
            d="M15.2 6.8l-2.1 6.3-6.3 2.1 2.1-6.3z"
            stroke="#FFF"
            strokeWidth="1.5"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "11px 11px" }}
          />
        </svg>
        <span className="text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-white drop-shadow-md sm:text-base sm:tracking-[0.24em]">
          Chandigarh, In
        </span>
      </div>

      {/* Section 2: Bottom center
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-14 text-center sm:px-12 md:px-24 md:pb-20"
      >
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white drop-shadow-xl md:text-6xl">
          I build digital experiences.
        </h2>
        <p className="mt-4 max-w-md text-lg text-gray-400 font-light drop-shadow-md md:text-xl">
          Crafting intuitive, high-performance web applications that leave a lasting impression.
        </p>
      </motion.div>
      */}

      {/* Section 3: Right aligned */}
      {/* <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl drop-shadow-xl">
          Bridging design and engineering.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-400 font-light max-w-md drop-shadow-md">
          Where aesthetic precision meets technical excellence.
        </p>
      </motion.div> */}
    </div>
  );
}
