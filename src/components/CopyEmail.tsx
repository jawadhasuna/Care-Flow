"use client";

import { useState } from "react";
import { pillClass } from "./Section";

/**
 * Copies an email address to the clipboard — the fallback for visitors whose
 * computer has no email app set up, where a mailto: link does nothing.
 */
export function CopyEmail({
  email,
  variant = "pill",
}: {
  email: string;
  /** "pill" for a full button, "icon" for a small square beside an address. */
  variant?: "pill" | "icon";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (old browser or permissions): show it to copy by hand.
      window.prompt("Copy this email address:", email);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={copy}
        title={copied ? "Copied" : "Copy email address"}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-navy-800 transition-colors hover:bg-mist-100 hover:text-teal-700"
      >
        <span className="sr-only" aria-live="polite">
          {copied ? `Copied ${email}` : `Copy ${email}`}
        </span>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    );
  }

  return (
    <button type="button" onClick={copy} className={`${pillClass()} cursor-pointer`}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
