import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";
import { isLite, isMobileWidth } from "../utils/device";
import { markHeroReady } from "../utils/heroReady";

const FRAME_COUNT = 96;
const MAX_PARALLEL = 6;

// Phones get smaller frames (960px wide), desktops get 1280px.
const FRAME_DIR = `${import.meta.env.BASE_URL}hero/${isMobileWidth() ? "m" : "d"}/`;
const framePath = (i: number) => `${FRAME_DIR}${String(i).padStart(3, "0")}.webp`;

// Load order: first frame, then every 32nd, 16th, 8th ... so scrolling works
// early with a rough animation that gets smoother as more frames arrive.
function loadOrder(count: number) {
  const order: number[] = [0];
  const seen = new Set(order);
  for (let step = 32; step >= 1; step /= 2) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

export function Hero() {
  const [lite] = useState(isLite);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const drawnRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Draw the loaded frame closest to the current scroll position,
  // but only if it differs from what's already on the canvas.
  const draw = () => {
    rafRef.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frames = framesRef.current;
    const target = Math.round(frameIndex.get());
    let img: HTMLImageElement | null = null;
    for (let d = 0; d < FRAME_COUNT && !img; d++) {
      img = frames[target - d] ?? frames[target + d] ?? null;
    }
    if (!img || img === drawnRef.current) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0);
    drawnRef.current = img;
    markHeroReady();
  };

  const scheduleDraw = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
  };

  useMotionValueEvent(frameIndex, "change", () => {
    if (!lite) scheduleDraw();
  });

  useEffect(() => {
    if (lite) return;
    let cancelled = false;
    framesRef.current = Array.from({ length: FRAME_COUNT }, () => null);
    const queue = loadOrder(FRAME_COUNT);

    const next = () => {
      const i = queue.shift();
      if (i === undefined || cancelled) return;
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          framesRef.current[i] = img;
          scheduleDraw();
        })
        .catch(() => {})
        .finally(next);
    };

    for (let k = 0; k < MAX_PARALLEL; k++) next();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lite]);

  const mediaClass =
    "absolute inset-0 h-full w-full object-cover object-[47%_center] sm:object-[center_30%] md:object-[center_20%]";

  return (
    <div
      ref={containerRef}
      id="top"
      className={`relative w-full bg-[#0a0a0a] ${lite ? "h-[160svh]" : "h-[400svh]"}`}
    >
      {/* Full-bleed: the floating navbar sits on top of the image */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {lite ? (
          <img
            src={framePath(0)}
            alt=""
            fetchPriority="high"
            onLoad={markHeroReady}
            onError={markHeroReady}
            className={mediaClass}
          />
        ) : (
          <canvas ref={canvasRef} className={mediaClass} />
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-36 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/2 bg-gradient-to-b from-transparent via-[#0a0a0a]/55 to-[#0a0a0a]" />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

export default Hero;
