import { Hero } from "@/components/Hero";
import { PhotoSection } from "@/components/PhotoSection";
import { Actions, Lead, PillLink, SectionTitle, TextSection } from "@/components/Section";
import { MethodSteps, StudyStats, TeamGrid } from "@/components/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

import hero from "@/assets/photos/hero.jpg";
import documentation from "@/assets/photos/documentation.jpg";
import monitor from "@/assets/photos/monitor.jpg";
import nurse from "@/assets/photos/nurse.jpg";
import ivStand from "@/assets/photos/iv-stand.jpg";

export default function Home() {
  return (
    <>
      <Hero image={hero} />

      <TextSection id="what-we-do">
        <SectionTitle>What we do</SectionTitle>
        <Lead>
          New England CareFlow builds research tools for critical-care nursing documentation.
          Our first, Visual Notes, restructures the narrative notes nurses write into a
          body-system chart — so a patient&apos;s story reads at a glance instead of being
          reassembled from paragraphs.
        </Lead>
        <Actions>
          <PillLink href="/about">About us</PillLink>
        </Actions>
      </TextSection>

      <PhotoSection image={documentation}>
        <SectionTitle tone="light">Visual Notes</SectionTitle>
        <Lead tone="light">
          Narrative notes in, a structured chart out — and every fact on it links back to the
          exact sentence it came from.
        </Lead>
        <Actions>
          <PillLink href="/products" tone="light">
            Our products
          </PillLink>
          <PillLink href={SITE.visualNotesUrl} tone="light" external>
            Open Visual Notes
          </PillLink>
        </Actions>
      </PhotoSection>

      <TextSection id="team" width="wide">
        <SectionTitle>Our team</SectionTitle>
        <TeamGrid />
        <Actions>
          <PillLink href="/about#team">Meet the team</PillLink>
        </Actions>
      </TextSection>

      <PhotoSection image={monitor}>
        <SectionTitle tone="light">The research</SectionTitle>
        <Lead tone="light">
          In a pilot study, critical-care nurses reviewed the same patient admission as written
          notes and as a visual note.
        </Lead>
        <StudyStats />
        <Actions delay={0.5}>
          <PillLink href="/research" tone="light">
            The study
          </PillLink>
        </Actions>
      </PhotoSection>

      <TextSection id="how-it-works" width="wide">
        <SectionTitle>How it works</SectionTitle>
        <MethodSteps />
        <Actions>
          <PillLink href="/research#method">The method</PillLink>
        </Actions>
      </TextSection>

      <PhotoSection image={nurse}>
        <SectionTitle tone="light">Built around nurses</SectionTitle>
        <Lead tone="light">
          Nurses already label their notes — NEURO, RESP, CV, GI. Visual Notes starts from those
          headers, so the chart follows the way nurses actually write.
        </Lead>
      </PhotoSection>

      <TextSection id="news">
        <SectionTitle>Latest news</SectionTitle>
        <Reveal delay={0.1}>
          <a
            href={SITE.preprintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-14 block max-w-2xl rounded-2xl border border-mist-200 bg-white p-8 text-left transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-teal-500 hover:shadow-[0_24px_50px_-28px_rgba(5,44,82,0.45)] md:p-10"
          >
            <p className="text-[11px] font-bold tracking-[0.22em] text-teal-700 uppercase">
              Research · Preprint
            </p>
            <h3 className="mt-3 font-display text-2xl font-light text-navy-800 md:text-[1.7rem]">
              Pilot study on visual notes and nurse workload
            </h3>
            <p className="mt-3 leading-relaxed font-light">
              Zaidi et al., JMIR Nursing. Forty-one critical-care nurses, one patient admission,
              two ways of reading it.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-navy-800 uppercase">
              Read the preprint
              <span aria-hidden className="transition-transform duration-500 ease-soft group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </Reveal>
      </TextSection>

      <PhotoSection image={ivStand}>
        <SectionTitle tone="light">Contact us</SectionTitle>
        <Lead tone="light">Research collaborations, pilot sites, or questions about the study.</Lead>
        <Actions>
          <PillLink href="/contact" tone="light">
            Get in touch
          </PillLink>
        </Actions>
      </PhotoSection>
    </>
  );
}
