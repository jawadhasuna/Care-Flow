"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "./Logo";
import { EASE } from "./motion/Reveal";
import { smoothScrollTo } from "./motion/SmoothScroll";
import { NAV, SITE } from "@/lib/site";

/**
 * White top bar with the Visual Notes lockup on the left. Desktop menus open
 * on hover or keyboard focus; on phones a toggle slides the menu down.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  /**
   * A link to the page you're already on glides instead of reloading — to the
   * top, or to its #section. Links to other pages navigate normally, and
   * SmoothScroll opens them at their top.
   */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    // Leave ctrl/cmd/shift-click alone so "open in new tab" still works.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const [path, hash] = href.split("#");
    if (path !== pathname) return;
    e.preventDefault();
    if (hash) {
      smoothScrollTo(`#${hash}`);
      window.history.replaceState(null, "", `#${hash}`);
    } else {
      smoothScrollTo(0);
      if (window.location.hash) window.history.replaceState(null, "", path);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-mist-200 bg-white/95 backdrop-blur-xl transition-shadow duration-500 ${
        scrolled ? "shadow-[0_10px_30px_-18px_rgba(5,44,82,0.35)]" : ""
      }`}
    >
      <div
        data-header-bar
        className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-8 px-5"
      >
        <Link href="/" aria-label={`${SITE.name} home`} onClick={(e) => onNavClick(e, "/")}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                className={`flex items-center gap-1.5 py-5 text-[12.5px] font-bold text-navy-800 transition-opacity hover:opacity-70 ${
                  isActive(item.href) ? "underline decoration-teal-500 decoration-2 underline-offset-8" : ""
                }`}
              >
                {item.label}
                {item.children && (
                  <svg
                    aria-hidden
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                  >
                    <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute top-full left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-soft group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="min-w-48 rounded-xl border border-mist-200 bg-white p-2 shadow-[0_18px_40px_-20px_rgba(5,44,82,0.4)]">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={(e) => onNavClick(e, c.href)}
                        className="block rounded-lg px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap text-navy-800 transition-colors hover:bg-mist-100 hover:text-teal-700"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-navy-800 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden border-t border-mist-200 bg-white md:hidden"
          >
            <ul className="px-5 py-4">
              {NAV.map((item) => (
                <li key={item.href} className="py-1">
                  <Link
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="block py-2 text-[15px] font-bold text-navy-800"
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={(e) => onNavClick(e, c.href)}
                      className="block py-1.5 pl-4 text-[14px] font-medium text-body"
                    >
                      {c.label}
                    </Link>
                  ))}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
