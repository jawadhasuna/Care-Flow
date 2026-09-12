"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE } from "./motion/Reveal";
import { smoothScrollTo } from "./motion/SmoothScroll";

const LINES = ["See the whole", "patient story"];

/**
 * First screen: full-height photo that settles from a slight zoom on load,
 * a headline that rises line by line, and a parallax fade as you scroll away.
 */
export function Hero({ image }: { image: StaticImageData }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-[calc(100svh-4rem)] min-h-[32rem] items-center justify-center overflow-hidden bg-navy-900 text-white"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,16,31,0.4)_0%,rgba(4,29,54,0.55)_55%,rgba(2,16,31,0.85)_100%)]"
      />

      <motion.div style={{ opacity: fade }} className="px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="text-[11px] font-bold tracking-[0.32em] text-teal-300 uppercase"
        >
          New England CareFlow LLC
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(2rem,10.5vw,2.6rem)] leading-[1.05] sm:text-[clamp(2.6rem,6.4vw,5rem)] font-light tracking-[0.03em] uppercase">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.45 + i * 0.14, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="mx-auto mt-7 max-w-xl text-base font-light text-white/80 md:text-lg"
        >
          Clinical visualization for critical-care nursing documentation.
        </motion.p>
      </motion.div>

      <a
        href="#what-we-do"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo("#what-we-do");
        }}
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 text-white/80 transition-colors hover:text-white"
      >
        <svg
          className="scroll-cue"
          width="34"
          height="18"
          viewBox="0 0 34 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 1l16 15L33 1" />
        </svg>
      </a>
    </section>
  );
}
