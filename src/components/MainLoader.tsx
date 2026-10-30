import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  // True once the page has what it needs for the first screen.
  ready: boolean;
  onLoadingComplete: () => void;
}

const MainLoader = ({ ready, onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Creep toward 90% while waiting; jump to 100% as soon as we're ready.
  useEffect(() => {
    if (ready) {
      setProgress(100);
      const t = setTimeout(() => setIsVisible(false), 250);
      return () => clearTimeout(t);
    }
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + Math.max(1, (90 - prev) / 8)));
    }, 60);
    return () => clearInterval(interval);
  }, [ready]);

  const letters = "KUBER".split("");

  return (
    <AnimatePresence onExitComplete={onLoadingComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Soft background glow (gradients instead of blur filters: much cheaper to draw) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_45%)]" />

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
                  className="text-5xl tracking-tighter text-white font-kuber sm:text-7xl md:text-8xl lg:text-9xl"
                  style={{ textShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Loading Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-12 w-64 sm:w-80 md:w-96"
            >
              <div className="relative h-0.5 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-white transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-center text-xs tracking-wider text-gray-500">
                {Math.floor(progress)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainLoader;
