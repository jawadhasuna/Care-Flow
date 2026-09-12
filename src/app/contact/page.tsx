import type { Metadata } from "next";
import { PhotoSection } from "@/components/PhotoSection";
import { Actions, Lead, PillLink, SectionTitle, TextSection } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { SITE, TEAM, mailto } from "@/lib/site";

import ivStand from "@/assets/photos/iv-stand.jpg";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PhotoSection image={ivStand} size="header">
        <SectionTitle tone="light" as="h1">
          Contact us
        </SectionTitle>
        <Lead tone="light">Research collaborations, pilot sites, or questions about the study.</Lead>
      </PhotoSection>

      <TextSection>
        <SectionTitle>Get in touch</SectionTitle>
        <Lead>Email us and we&apos;ll get back to you.</Lead>
        <Reveal delay={0.2}>
          <a
            href={mailto(SITE.email)}
            className="mt-10 inline-block font-display text-xl font-light break-all text-navy-800 underline decoration-teal-500 decoration-1 underline-offset-8 transition-colors hover:text-teal-700 md:text-3xl"
          >
            {SITE.email}
          </a>
        </Reveal>
        <Actions delay={0.3}>
          <PillLink href={mailto(SITE.email)}>Send an email</PillLink>
          <CopyEmail email={SITE.email} />
        </Actions>

        <Reveal delay={0.35}>
          <div className="mx-auto mt-16 max-w-2xl border-t border-mist-200 pt-10 md:mt-20 md:pt-12">
            <h3 className="text-[11px] font-bold tracking-[0.22em] text-teal-700 uppercase">
              Or reach the team directly
            </h3>
            <ul className="mt-6 divide-y divide-mist-200 text-left">
              {TEAM.map((m) => (
                <li
                  key={m.email}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span>
                    <span className="block font-display text-lg text-navy-800">{m.name}</span>
                    <span className="block text-sm font-light">{m.role}</span>
                  </span>
                  <span className="flex items-center gap-1 sm:shrink-0">
                    <a
                      href={mailto(m.email)}
                      className="py-1.5 text-[15px] break-all text-navy-800 underline decoration-teal-500 underline-offset-4 transition-colors hover:text-teal-700"
                    >
                      {m.email}
                    </a>
                    <CopyEmail email={m.email} variant="icon" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-14 max-w-md text-sm leading-relaxed font-light">
            Please don&apos;t send patient-identifiable or protected health information by email.
          </p>
        </Reveal>
      </TextSection>
    </>
  );
}
