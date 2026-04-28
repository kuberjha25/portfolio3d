"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 191;
const PAD_LENGTH = 3;
const FRAME_BASE_PATH = `${import.meta.env.BASE_URL}sequence/`;
const NAV_HEIGHT = 66;

function getFramePath(index: number) {
  const paddedIndex = (index + 1).toString().padStart(PAD_LENGTH, "0");
  return `${FRAME_BASE_PATH}frame_${paddedIndex}_delay-0.042s.webp`;
  // return `${FRAME_BASE_PATH}ezgif-frame-${paddedIndex}.png`;
}

function drawHeroFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
) {
  // If we just want to fill the canvas, we can use the canvas's internal resolution
  // and CSS object-cover will handle the rest. This completely removes the laggy ctx.filter.
  if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const hasLoadedFrames = loadedCount > 50; // Wait for at least 50 frames to load

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    let isMounted = true;
    imagesRef.current = Array.from({ length: FRAME_COUNT }, () => null);

    const preloadFrame = (index: number) => {
      const img = new Image();

      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[index] = img;
        setLoadedCount((count) => count + 1);
      };

      img.onerror = () => {
        if (!isMounted) return;
        console.warn(`Could not load hero frame: ${getFramePath(index)}`);
      };

      img.src = getFramePath(index);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      preloadFrame(i);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedFrames) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationFrameId: number;

    const render = () => {
      const currentIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(frameIndex.get()))
      );

      const img =
        imagesRef.current[currentIndex] ??
        imagesRef.current.find((loadedImage) => loadedImage !== null);

      if (img?.complete && img.naturalWidth !== 0) {
        drawHeroFrame(ctx, canvas, img);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Remove the window resize listener since the canvas size is now based on the image size
    // and CSS object-cover handles the responsiveness perfectly.
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasLoadedFrames, frameIndex]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400svh] w-full bg-[#121212] pt-15"
      style={{ "--nav-height": `${NAV_HEIGHT}px` } as CSSProperties}
    >
      <div className="sticky top-[var(--nav-height)] h-[calc(100svh-var(--nav-height))] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-[47%_center] sm:object-[center_30%] md:object-[center_20%]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/2 bg-gradient-to-b from-transparent via-[#121212]/55 to-[#121212]" />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

export default Hero;
