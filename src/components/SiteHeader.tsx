"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "./Logo";
import { EmailLink } from "./EmailLink";
import { EASE } from "./motion/Reveal";
import { setScrollLocked, smoothScrollTo } from "./motion/SmoothScroll";
import { NAV, SITE } from "@/lib/site";

/** Phone menu: rows rise in one after another. */
const menuList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const menuItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * White top bar with the Visual Notes lockup on the left. Desktop menus open
 * on hover or keyboard focus; on phones the toggle opens a full-screen menu.
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

  // The phone menu covers the page: freeze the page behind it, and close it on
  // Escape or if the screen widens past phone size (e.g. a tablet rotating).
  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      setScrollLocked(false);
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

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
    <>
      <header
        className={`sticky top-0 z-50 border-b border-mist-200 bg-white/95 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(5,44,82,0.35)]" : ""
        }`}
      >
        <div
          data-header-bar
          className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-8 px-5"
        >
          <Link
            href="/"
            aria-label={`${SITE.name} home`}
            onClick={(e) => onNavClick(e, "/")}
            className="block py-2"
          >
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

          {/* Three lines that fold into an ✕. */}
          <button
            type="button"
            className="-mr-2 flex size-11 items-center justify-center text-navy-800 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3.5 w-6">
              <span
                className={`absolute top-0 left-0 h-[1.6px] w-6 rounded-full bg-current transition-transform duration-300 ease-soft ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-[6px] left-0 h-[1.6px] w-6 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute top-[12px] left-0 h-[1.6px] w-6 rounded-full bg-current transition-transform duration-300 ease-soft ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen phone menu. It lives outside <header> on purpose: the
          header's backdrop blur would make a fixed child size itself to the
          64px bar instead of the screen. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white md:hidden"
            data-lenis-prevent
          >
            <motion.nav
              aria-label="Mobile"
              variants={menuList}
              initial="hidden"
              animate="show"
              className="px-6 pt-2 pb-12"
            >
              <ul>
                {NAV.map((item) => (
                  <motion.li key={item.href} variants={menuItem} className="border-b border-mist-200 py-5">
                    <Link
                      href={item.href}
                      onClick={(e) => onNavClick(e, item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-center justify-between py-1 font-display text-[1.9rem] leading-tight font-light tracking-[0.04em] text-navy-800 uppercase"
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`text-lg ${isActive(item.href) ? "text-teal-600" : "text-mist-300"}`}
                      >
                        →
                      </span>
                    </Link>
                    {item.children && (
                      <div className="mt-1 flex flex-wrap gap-x-6">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={(e) => onNavClick(e, c.href)}
                            className="py-2 text-[14px] font-medium text-body"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={menuItem} className="mt-10">
                <p className="text-[11px] font-bold tracking-[0.22em] text-teal-700 uppercase">
                  Get in touch
                </p>
                <EmailLink
                  email={SITE.email}
                  align="start"
                  className="mt-1 inline-block py-2 text-[15px] break-all text-navy-800 underline decoration-teal-500 underline-offset-4"
                >
                  {SITE.email}
                </EmailLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
