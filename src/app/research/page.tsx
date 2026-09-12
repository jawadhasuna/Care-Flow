import type { Metadata } from "next";
import { PhotoSection } from "@/components/PhotoSection";
import { Actions, Lead, PillLink, SectionTitle, TextSection } from "@/components/Section";
import { MethodSteps } from "@/components/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

import icu from "@/assets/photos/icu.jpg";
import monitor from "@/assets/photos/monitor.jpg";
import documentation from "@/assets/photos/documentation.jpg";

export const metadata: Metadata = { title: "Research" };

const RESULTS = [
  { value: "54.95", label: "Workload · written notes" },
  { value: "30.68", label: "Workload · visual note" },
  { value: "−44.2%", label: "Change (P < .001)" },
];

const GUARANTEES = [
  {
    title: "The body systems are fixed",
    text: "Fourteen body systems, identical for every patient, taken from the headers nurses actually write. A system can never be dropped because a model forgot it.",
  },
  {
    title: "Every fact shows its source",
    text: "Each statement on the chart carries the note it came from and its exact words. Anything that can't be found in the source never reaches the chart.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PhotoSection image={icu} size="header" wash="strong">
        <SectionTitle tone="light" as="h1">
          The research
        </SectionTitle>
        <Lead tone="light">Measuring what a visual note changes for the nurse reading it.</Lead>
      </PhotoSection>

      <TextSection id="study" width="wide">
        <SectionTitle>The pilot study</SectionTitle>
        <Lead>
          Forty-one registered critical-care nurses reviewed the same patient admission twice —
          first as conventional written SOAP notes, then as a structured visual note — and
          scored their perceived workload on the raw NASA-TLX after each.
        </Lead>

        <dl className="mx-auto mt-12 grid max-w-4xl gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-10">
          {RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={0.15 + i * 0.12}>
              <dt className="sr-only">{r.label}</dt>
              <dd className="font-display text-5xl font-extralight tracking-tight text-navy-800 md:text-6xl">
                {r.value}
              </dd>
              <dd className="mt-3 text-[11px] font-bold tracking-[0.2em] text-teal-700 uppercase">
                {r.label}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-14 max-w-2xl text-sm leading-relaxed font-light">
            Improvements appeared on all six subscales. As a fixed-order pilot on a single case,
            the finding is preliminary: order and familiarity effects cannot be ruled out.
          </p>
        </Reveal>
        <Actions delay={0.35}>
          <PillLink href={SITE.preprintUrl} external>
            Read the preprint
          </PillLink>
        </Actions>
      </TextSection>

      <PhotoSection image={monitor} wash="strong">
        <SectionTitle tone="light">Two guarantees</SectionTitle>
        <div className="mt-10 grid gap-10 text-left md:mt-14 md:grid-cols-2 md:gap-12">
          {GUARANTEES.map((g, i) => (
            <Reveal key={g.title} delay={0.15 + i * 0.12}>
              <h3 className="font-display text-2xl font-light tracking-[0.03em] text-white uppercase">
                {g.title}
              </h3>
              <p className="mt-4 leading-relaxed font-light text-white/80">{g.text}</p>
            </Reveal>
          ))}
        </div>
      </PhotoSection>

      <TextSection id="method" width="wide">
        <SectionTitle>How it works</SectionTitle>
        <Lead>Five steps take a nurse&apos;s narrative notes to a verified chart.</Lead>
        <MethodSteps />
      </TextSection>

      <PhotoSection image={documentation}>
        <SectionTitle tone="light">See it for yourself</SectionTitle>
        <Lead tone="light">
          Visual Notes runs on a synthetic sample case — no real patient data.
        </Lead>
        <Actions>
          <PillLink href={SITE.visualNotesUrl} tone="light" external>
            Open Visual Notes
          </PillLink>
        </Actions>
      </PhotoSection>
    </>
  );
}
