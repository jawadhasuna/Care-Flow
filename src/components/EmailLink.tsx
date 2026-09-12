"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./motion/Reveal";
import { gmailCompose, mailto, outlookCompose } from "@/lib/site";

/**
 * An email link that works in a desktop browser too.
 *
 * On a phone, mailto: opens the mail app, so the link behaves normally. With
 * a mouse, mailto: often does nothing — most people have no desktop mail app
 * set up — so the click opens a small menu instead: Gmail or Outlook in a new
 * tab, both pre-addressed, or the computer's own mail app.
 */
export function EmailLink({
  email,
  className,
  align = "center",
  side = "below",
  children,
}: {
  email: string;
  className?: string;
  /** Where the menu lines up with the link. */
  align?: "center" | "start";
  /** "above" near the bottom of the page, so the menu doesn't open off it. */
  side?: "below" | "above";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const menuId = useId();

  // Close on a click elsewhere or on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Touch screens: let mailto: open the mail app, which works there.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    e.preventDefault();
    setOpen((o) => !o);
  };

  const options = [
    { label: "Gmail", href: gmailCompose(email), newTab: true },
    { label: "Outlook", href: outlookCompose(email), newTab: true },
    { label: "Email app", href: mailto(email), newTab: false },
  ];

  return (
    <span ref={wrap} className="relative inline-block">
      <a
        href={mailto(email)}
        onClick={onClick}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className={className}
      >
        {children}
      </a>

      <AnimatePresence>
        {open && (
          <motion.span
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: side === "above" ? 4 : -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === "above" ? 4 : -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={`absolute z-30 block w-52 rounded-xl border border-mist-200 bg-white p-1.5 text-left normal-case shadow-[0_18px_40px_-20px_rgba(5,44,82,0.45)] ${
              side === "above" ? "bottom-full mb-2" : "top-full mt-2"
            } ${align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"}`}
          >
            <span className="block px-3 pt-1.5 pb-1 text-[10px] font-bold tracking-[0.22em] text-teal-700 uppercase">
              Send with
            </span>
            {options.map((o) => (
              <a
                key={o.label}
                role="menuitem"
                href={o.href}
                target={o.newTab ? "_blank" : undefined}
                rel={o.newTab ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-[13px] font-semibold tracking-normal text-navy-800 transition-colors hover:bg-mist-100 hover:text-teal-700"
              >
                {o.label}
                {o.newTab && (
                  <span aria-hidden className="text-navy-800/40">
                    ↗
                  </span>
                )}
              </a>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
