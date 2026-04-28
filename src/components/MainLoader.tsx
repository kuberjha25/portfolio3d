import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onLoadingComplete: () => void;
}

const MainLoader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 300);
          }, 500);
          return 100;
        }
        const increment = Math.max(1, Math.floor((100 - prev) / 15));
        return Math.min(100, prev + increment);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const letters = "KUBER".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
          
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.05, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/3 blur-3xl"
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Name */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="text-5xl tracking-tighter text-white font-kuber drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-9xl"
                  style={{
                    textShadow: "0 0 30px rgba(255,255,255,0.3)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Loading Bar Container */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 w-64 sm:w-80 md:w-96"
            >
              {/* Progress Bar Background */}
              <div className="relative h-0.5 overflow-hidden rounded-full bg-gray-800">
                {/* Progress Bar Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Percentage Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-3 text-center text-xs tracking-wider text-gray-500"
              >
                {Math.floor(progress)}%
              </motion.p>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex gap-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-gray-600"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainLoader;