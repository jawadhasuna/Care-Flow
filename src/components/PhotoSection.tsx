"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Full-bleed photo band with white type on a navy wash. The photo drifts
 * slower than the page (parallax): it sits in a frame 24% taller than the
 * band and slides ±9% of that frame, which never exposes an edge.
 */
export function PhotoSection({
  image,
  id,
  size = "band",
  wash = "default",
  focus,
  children,
}: {
  image: StaticImageData;
  id?: string;
  /** "band" for homepage sections, "header" for the top of inner pages. */
  size?: "band" | "header";
  /** "strong" for bright photos that need more navy to hold white type. */
  wash?: "default" | "strong";
  /** Which part of the photo stays in view when a wide band crops it, as a
   *  CSS object-position — e.g. "50% 20%" keeps the upper part. Default: centre. */
  focus?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-9%", "9%"]);

  const height =
    size === "header"
      ? "min-h-[22rem] md:min-h-[34rem] py-20 md:py-24"
      : "min-h-[30rem] md:min-h-[42rem] py-20 md:py-28";

  const washClass =
    wash === "strong"
      ? "bg-[linear-gradient(180deg,rgba(4,29,54,0.72),rgba(2,16,31,0.82))]"
      : "bg-[linear-gradient(180deg,rgba(4,29,54,0.5),rgba(2,16,31,0.7))]";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative isolate flex items-center justify-center overflow-hidden bg-navy-900 px-6 text-center text-white ${height}`}
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[12%] -z-20 h-[124%]">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          style={focus ? { objectPosition: focus } : undefined}
        />
      </motion.div>
      <div aria-hidden className={`absolute inset-0 -z-10 ${washClass}`} />
      <div className="relative w-full max-w-4xl">{children}</div>
    </section>
  );
}
