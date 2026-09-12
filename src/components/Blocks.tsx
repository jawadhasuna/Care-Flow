import Image from "next/image";
import { METHOD, TEAM, type TeamMember } from "@/lib/site";
import { EmailLink } from "./EmailLink";
import { Reveal } from "./motion/Reveal";

function LinkIcon({ link }: { link: TeamMember["link"] }) {
  if (link === "linkedin") {
    return (
      <svg aria-hidden width="14" height="14" viewBox="3 3 18 18" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </svg>
  );
}

/**
 * The team, one card each: portrait in a navy-to-seagreen ring, name and
 * role, then a footer strip with email and profile links. Photo and name
 * open the profile (a link can't nest inside another link, so the card
 * itself isn't one).
 */
export function TeamGrid() {
  return (
    <ul className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {TEAM.map((m, i) => (
        <Reveal as="li" key={m.name} delay={i * 0.12} className="h-full">
          <div className="group flex h-full flex-col items-center rounded-2xl border border-mist-200 bg-white px-6 pt-10 pb-5 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-teal-500 hover:shadow-[0_24px_50px_-28px_rgba(5,44,82,0.45)]">
            <a
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
            >
              <div className="relative mx-auto size-36 rounded-full bg-[conic-gradient(from_210deg,#052c52,#04acaf,#052c52)] p-[3px]">
                <div className="relative size-full overflow-hidden rounded-full bg-white">
                  <Image
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="144px"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                  />
                </div>
                <span className="absolute right-0.5 bottom-0.5 flex size-9 items-center justify-center rounded-full bg-navy-800 text-white ring-4 ring-white transition-colors duration-300 group-hover:bg-teal-700">
                  <LinkIcon link={m.link} />
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl text-navy-800">{m.name}</h3>
            </a>
            {/* Same line box whether or not there are credentials, so all
                three cards line up. */}
            <p className="mt-2 h-4 text-[11px] leading-4 font-bold tracking-[0.2em] text-teal-700 uppercase">
              {m.credentials}
            </p>
            <p className="mx-auto mt-3 max-w-[16rem] text-[15px] leading-relaxed font-light">
              {m.role}
            </p>

            {/* mt-auto pins the strip to the card's foot; pt-6 keeps a gap
                above it even on the tallest card, where mt-auto is zero. */}
            <div className="mt-auto w-full pt-6">
              <div className="flex flex-col items-center border-t border-mist-200 pt-3">
                <EmailLink
                  email={m.email}
                  className="inline-flex items-center gap-2 py-2 text-[14px] break-all text-navy-800 transition-colors hover:text-teal-700"
                >
                  <MailIcon />
                  <span className="underline decoration-mist-300 underline-offset-4">{m.email}</span>
                </EmailLink>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2 text-[11px] font-bold tracking-[0.2em] text-navy-800 uppercase opacity-60 transition-all duration-300 hover:text-teal-700 hover:opacity-100"
                >
                  {m.link === "linkedin" ? "LinkedIn" : "Website"}
                  <span aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Segment → Extract → Ground → Cover → Render, as five numbered steps. */
export function MethodSteps() {
  return (
    <ol className="mt-10 grid gap-8 text-left sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5 lg:gap-6">
      {METHOD.map((m, i) => (
        <Reveal as="li" key={m.step} delay={i * 0.1}>
          <div className="h-full border-t border-mist-300 pt-6">
            <span className="font-display text-sm font-medium tracking-[0.2em] text-teal-700">
              0{i + 1}
            </span>
            <h3 className="mt-2 font-display text-2xl font-light tracking-[0.04em] text-navy-800 uppercase">
              {m.step}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed font-light">{m.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Headline numbers from the pilot study, on a photo band. */
export function StudyStats() {
  const stats = [
    { value: "41", label: "Critical-care nurses" },
    { value: "−44%", label: "Perceived workload" },
    { value: "6 / 6", label: "Subscales improved" },
  ];
  return (
    <dl className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-10">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={0.15 + i * 0.12}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-6xl font-extralight tracking-tight text-white md:text-7xl">
            {s.value}
          </dd>
          <dd className="mt-3 text-[11px] font-bold tracking-[0.22em] text-teal-200 uppercase">
            {s.label}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
