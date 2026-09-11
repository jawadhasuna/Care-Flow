import Link from "next/link";
import { Mark } from "./Logo";
import { NAV, SITE, TEAM } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy-800 text-white/75">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Mark className="mark-reverse w-11" />
            <span className="font-display text-[0.94rem] font-extrabold tracking-[0.045em] text-white uppercase">
              New England <span className="text-teal-300">CareFlow</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed font-light">
            Research and prototype development in clinical visualization for
            critical-care nursing.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-bold tracking-[0.22em] text-teal-300 uppercase">Explore</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITE.visualNotesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Visual Notes ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-bold tracking-[0.22em] text-teal-300 uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <span className="block text-xs text-white/55">General enquiries</span>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-0.5 inline-block break-all transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </li>
            {TEAM.map((m) => (
              <li key={m.email}>
                <span className="block text-xs text-white/55">{m.name}</span>
                <a
                  href={`mailto:${m.email}`}
                  className="mt-0.5 inline-block break-all transition-colors hover:text-white"
                >
                  {m.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs leading-relaxed text-white/55 md:flex-row md:justify-between">
          <p>
            <span className="font-semibold text-white/75">Caution:</span> Visual Notes is a
            research prototype. It is not clinical decision support and is not for use in
            patient care.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} {SITE.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
