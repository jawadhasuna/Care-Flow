"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** The page's one Lenis instance; null until mounted, or under reduced motion. */
let lenis: Lenis | null = null;

/** Height of the sticky top bar (not the mobile menu that can open below it). */
function headerHeight() {
  return document.querySelector("[data-header-bar]")?.getBoundingClientRect().height ?? 0;
}

/** Document position that puts `el` just below the sticky header. */
function topOf(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY - headerHeight();
}

/**
 * Glide to a position, a "#id" selector or an element, landing just below the
 * sticky header. Jumps instead of gliding when smooth scroll is off.
 */
export function smoothScrollTo(target: number | string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  const top = typeof el === "number" ? el : topOf(el);
  if (lenis) lenis.scrollTo(top, { duration: 1.4 });
  else window.scrollTo({ top });
}

/** Freeze page scrolling (under the open mobile menu) or release it. */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/**
 * Glide-scrolling for the whole page. Lenis eases the native scroll position
 * rather than faking it, so anchors, the scrollbar and Motion's useScroll all
 * keep working. Skipped entirely for visitors who ask for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const cameFromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      cameFromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);

    let frame = 0;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      const tick = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("popstate", onPop);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // A new page opens at its top (or its #section), just below the header.
  // Left alone, Next.js scrolls the new page's first section flush to the
  // window top — tucking 64px of it under the sticky header — and Lenis can
  // carry leftover glide across. Back/forward keeps the restored position.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (cameFromHistory.current) {
      cameFromHistory.current = false;
      return;
    }
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    const top = el ? topOf(el) : 0;
    // Set the position natively first: Lenis skips any scrollTo whose target
    // equals the target it last knew, and that can be stale right after
    // Next.js has scrolled the page itself. Then bring Lenis in line.
    window.scrollTo({ top });
    lenis?.scrollTo(top, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
