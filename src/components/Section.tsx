import Link from "next/link";
import { Reveal } from "./motion/Reveal";

/** Thin uppercase display heading, the site's signature type. */
export function Heading({
  children,
  tone = "dark",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={`font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.1] font-light tracking-[0.04em] uppercase ${
        tone === "light" ? "text-white" : "text-navy-800"
      }`}
    >
      {children}
    </Tag>
  );
}

/** Heading + short seagreen rule, revealed together. */
export function SectionTitle({
  children,
  tone = "dark",
  as,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  return (
    <Reveal>
      <Heading tone={tone} as={as}>
        {children}
      </Heading>
      <span aria-hidden className="mx-auto mt-7 block h-px w-12 bg-teal-500" />
    </Reveal>
  );
}

export function Lead({
  children,
  tone = "dark",
  delay = 0.1,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <p
        className={`mx-auto mt-8 max-w-2xl text-lg leading-[1.8] font-light md:text-xl ${
          tone === "light" ? "text-white/85" : "text-body"
        }`}
      >
        {children}
      </p>
    </Reveal>
  );
}

export function Actions({
  children,
  delay = 0.2,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="mt-12 flex flex-wrap justify-center gap-4">{children}</div>
    </Reveal>
  );
}

/** Outline pill style, shared by pill links and pill buttons. */
export function pillClass(tone: "dark" | "light" = "dark") {
  return `inline-flex items-center gap-2 rounded-full border-[1.5px] px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ease-soft ${
    tone === "light"
      ? "border-white text-white hover:bg-white hover:text-navy-800"
      : "border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white"
  }`;
}

/** Outline pill button; fills on hover. External links open in a new tab. */
export function PillLink({
  href,
  children,
  tone = "dark",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  external?: boolean;
}) {
  const className = pillClass(tone);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span aria-hidden>↗</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Plain white section with centred content, CoreMap-style. */
export function TextSection({
  id,
  width = "narrow",
  tint = false,
  children,
}: {
  id?: string;
  width?: "narrow" | "wide";
  /** A faint mist ground, to separate two white sections that meet. */
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`px-6 py-28 md:py-36 ${tint ? "bg-mist-50" : "bg-white"}`}>
      <div className={`mx-auto text-center ${width === "wide" ? "max-w-6xl" : "max-w-3xl"}`}>
        {children}
      </div>
    </section>
  );
}
