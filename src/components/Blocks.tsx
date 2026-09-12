import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
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

const cardLink =
  "group block outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4";

/**
 * A team portrait. With `toned` (the homepage) it sits in the site's soft-teal
 * tone — the photo at 35% colour under a 30% "color" blend of #0e5a73 — and
 * hover or keyboard focus on the surrounding link fades it to true colour;
 * touch screens (no hover) keep the tone. Without it (the About page) it shows
 * in original colour.
 */
function TonedPhoto({
  src,
  alt,
  sizes,
  toned = true,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  toned?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        className={`object-cover transition duration-700 ease-soft group-hover:scale-[1.03] ${
          toned ? "saturate-[0.35] group-hover:saturate-100 group-focus-visible:saturate-100" : ""
        }`}
      />
      {toned && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#0e5a73] opacity-30 mix-blend-color transition-opacity duration-700 ease-soft group-hover:opacity-0 group-focus-visible:opacity-0"
        />
      )}
    </>
  );
}

/**
 * Homepage team: three across, each a large 4:3 portrait with name, role and
 * credentials centred beneath. No contact links here — each person leads to
 * the About page's team section, where TeamList has the full details.
 */
export function TeamGrid() {
  return (
    <ul className="mt-12 grid gap-x-10 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      {TEAM.map((m, i) => (
        <Reveal as="li" key={m.name} delay={i * 0.12}>
          <Link href="/about#team" className={cardLink}>
            <div className="relative isolate aspect-[4/3] overflow-hidden bg-mist-100">
              <TonedPhoto
                src={m.photo}
                alt={`Portrait of ${m.name}`}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
              />
            </div>
            <h3 className="mt-7 font-display text-[1.35rem] font-semibold text-navy-800 transition-colors duration-300 group-hover:text-teal-700">
              {m.name}
            </h3>
          </Link>
          <p className="mx-auto mt-1 max-w-xs font-display text-lg leading-snug font-light text-navy-800">
            {m.role}
          </p>
          {m.credentials && (
            <p className="mt-3 text-sm font-light tracking-wide">{m.credentials}</p>
          )}
        </Reveal>
      ))}
    </ul>
  );
}

/**
 * About page team ("Meet the team"): one person per row, stacked vertically —
 * a tall 3:4 portrait on the left, and on the right name, role, credentials,
 * a two-line summary and contact links. On phones the portrait sits above.
 */
export function TeamList() {
  return (
    <ul className="mx-auto mt-12 max-w-4xl divide-y divide-mist-200 text-left sm:mt-16">
      {TEAM.map((m) => (
        <Reveal
          as="li"
          key={m.name}
          className="grid items-center gap-8 py-12 first:pt-0 last:pb-0 sm:grid-cols-[220px_1fr] md:grid-cols-[260px_1fr] md:gap-14"
        >
          <a
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardLink} mx-auto w-full max-w-[260px] sm:max-w-none`}
          >
            <div className="relative isolate aspect-[3/4] overflow-hidden bg-mist-100">
              <TonedPhoto
                src={m.portrait}
                alt={`Portrait of ${m.name}`}
                sizes="(min-width: 768px) 260px, 220px"
                toned={false}
              />
            </div>
            <span className="sr-only">
              {m.name} on {m.link === "linkedin" ? "LinkedIn" : "their website"} (opens in a new tab)
            </span>
          </a>

          <div>
            <h3 className="font-display text-2xl font-semibold text-navy-800">{m.name}</h3>
            <p className="mt-1 font-display text-lg leading-snug font-light text-navy-800">{m.role}</p>
            {m.credentials && (
              <p className="mt-2 text-[11px] font-bold tracking-[0.2em] text-teal-700 uppercase">
                {m.credentials}
              </p>
            )}
            <span aria-hidden className="mt-5 block h-px w-12 bg-teal-500" />
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-light">{m.bio}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6">
              <EmailLink
                email={m.email}
                align="start"
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
                <LinkIcon link={m.link} />
                {m.link === "linkedin" ? "LinkedIn" : "Website"}
                <span aria-hidden>↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
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
