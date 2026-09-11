"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Glide-scrolling for the whole page. Lenis eases the native scroll position
 * rather than faking it, so anchors, the scrollbar and Motion's useScroll all
 * keep working. Skipped entirely for visitors who ask for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
