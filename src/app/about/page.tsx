import type { Metadata } from "next";
import { PhotoSection } from "@/components/PhotoSection";
import { Actions, Lead, PillLink, SectionTitle, TextSection } from "@/components/Section";
import { TeamGrid } from "@/components/Blocks";

import hallway from "@/assets/photos/hallway.jpg";
import ivStand from "@/assets/photos/iv-stand.jpg";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PhotoSection image={hallway} size="header" wash="strong">
        <SectionTitle tone="light" as="h1">
          About us
        </SectionTitle>
        <Lead tone="light">Clinical visualization for critical-care nursing.</Lead>
      </PhotoSection>

      <TextSection id="company">
        <SectionTitle>Our company</SectionTitle>
        <Lead>
          New England CareFlow LLC is a research and prototype development company. We build
          tools that help critical-care teams see the patient story at a glance — starting with
          Visual Notes, which turns narrative nursing documentation into a structured,
          source-verifiable chart.
        </Lead>
        <Lead delay={0.2}>
          Our work is grounded in nursing research: our first pilot study measured how a visual
          note changes the workload of reviewing a patient admission.
        </Lead>
        <Actions delay={0.3}>
          <PillLink href="/research">Our research</PillLink>
        </Actions>
      </TextSection>

      <TextSection id="team" width="wide" tint>
        <SectionTitle>The team</SectionTitle>
        <TeamGrid />
      </TextSection>

      <PhotoSection image={ivStand}>
        <SectionTitle tone="light">Work with us</SectionTitle>
        <Lead tone="light">We&apos;re glad to hear from researchers, clinicians and pilot sites.</Lead>
        <Actions>
          <PillLink href="/contact" tone="light">
            Contact
          </PillLink>
        </Actions>
      </PhotoSection>
    </>
  );
}
