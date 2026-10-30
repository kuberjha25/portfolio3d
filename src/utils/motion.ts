import type { Variants } from "framer-motion";

// Smooth "ease-out-expo" curve used everywhere for a calm, modern feel.
const EASE = [0.22, 1, 0.36, 1] as const;
const OFFSET = 28;

type Direction = "left" | "right" | "up" | "down" | undefined;
type MotionType = "decay" | "spring" | "keyframes" | "tween" | "inertia" | undefined;

// Text Variant motion
export const textVariant = (delay?: number): Variants => ({
  hidden: { y: 18, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay },
  },
});

// FadeIn motion (the `type` argument is kept for compatibility; all use the same easing)
export const fadeIn = (
  direction: Direction,
  _type: MotionType,
  delay: number,
  duration: number,
): Variants => ({
  hidden: {
    x: direction === "left" ? OFFSET : direction === "right" ? -OFFSET : 0,
    y: direction === "up" ? OFFSET : direction === "down" ? -OFFSET : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay, duration: Math.min(duration, 0.9), ease: EASE },
  },
});

// zoom in motion
export const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: { scale: 0.96, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { delay, duration, ease: EASE },
  },
});

// slide in motion
export const slideIn = (
  direction: Direction,
  _type: MotionType,
  delay: number,
  duration: number,
): Variants => ({
  hidden: {
    x: direction === "left" ? -OFFSET * 2 : direction === "right" ? OFFSET * 2 : 0,
    y: direction === "up" ? OFFSET * 2 : direction === "down" ? -OFFSET * 2 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay, duration, ease: EASE },
  },
});

// staggered container motion
export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number,
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});
