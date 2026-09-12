import type { Metadata } from "next";
import { PhotoSection } from "@/components/PhotoSection";
import { Actions, Heading, Lead, PillLink, SectionTitle, TextSection } from "@/components/Section";
import { SpinningMark } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

import documentation from "@/assets/photos/documentation.jpg";
import nurse from "@/assets/photos/nurse.jpg";

export const metadata: Metadata = { title: "Products" };

const FEATURES = [
  "Reads the narrative notes nurses already write",
  "Files every fact under one of fourteen fixed body systems",
  "Links each fact back to the exact words it came from",
  "Same notes in, same chart out — every time",
];

export default function ProductsPage() {
  return (
    <>
      <PhotoSection image={documentation} size="header" wash="strong">
        <SectionTitle tone="light" as="h1">
          Our products
        </SectionTitle>
        <Lead tone="light">
          Tools for critical-care nursing documentation. Visual Notes is the first.
        </Lead>
      </PhotoSection>

      <section id="visual-notes" className="bg-white px-6 py-20 md:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product tile: the mark reversed onto navy, with a seagreen glow. */}
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-8 py-12 text-center sm:px-10 sm:py-16 shadow-[0_40px_80px_-40px_rgba(5,44,82,0.6)]">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_15%,rgba(4,172,175,0.35),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(18,104,168,0.4),transparent_50%)]"
              />
              <div className="mark-reverse mx-auto w-fit">
                <SpinningMark width={180} />
              </div>
              <p className="mt-10 font-display text-4xl font-bold tracking-tight text-white">
                Visual <span className="text-teal-300">Notes</span>
              </p>
              <p className="mt-3 text-[11px] font-bold tracking-[0.3em] text-teal-200 uppercase">
                Product 01
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.22em] text-teal-700 uppercase">
                Product 01 · Research prototype
              </p>
              <div className="mt-4">
                <Heading>Visual Notes</Heading>
              </div>
              <span aria-hidden className="mt-7 block h-px w-12 bg-teal-500" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-[1.8] font-light">
                Visual Notes restructures narrative critical-care nursing documentation into a
                source-verifiable, body-system chart — so the patient story reads at a glance
                instead of being reassembled from paragraphs.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] leading-relaxed font-light">
                    <svg
                      aria-hidden
                      className="mt-1 shrink-0 text-teal-600"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
                <PillLink href={SITE.visualNotesUrl} external>
                  Open Visual Notes
                </PillLink>
                <PillLink href="/research">The research</PillLink>
              </div>
              <p className="mt-8 text-xs leading-relaxed font-light">
                Not clinical decision support, and not for use in patient care.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <TextSection id="more" tint>
        <SectionTitle>More on the way</SectionTitle>
        <Lead>
          Visual Notes is the first of our products. More tools for critical-care teams are in
          development.
        </Lead>
      </TextSection>

      <PhotoSection image={nurse}>
        <SectionTitle tone="light">Pilot it with us</SectionTitle>
        <Lead tone="light">
          Interested in trying Visual Notes at your site? We&apos;d like to hear from you.
        </Lead>
        <Actions>
          <PillLink href="/contact" tone="light">
            Contact
          </PillLink>
        </Actions>
      </PhotoSection>
    </>
  );
}
