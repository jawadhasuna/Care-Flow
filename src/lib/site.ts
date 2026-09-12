/** Company facts and navigation, kept in one place so every page agrees. */
import type { StaticImageData } from "next/image";

import maryumPhoto from "@/assets/team/maryum.jpg";
import naveedPhoto from "@/assets/team/naveed.jpg";
import jawadPhoto from "@/assets/team/jawad.jpg";

export const SITE = {
  name: "New England CareFlow",
  legalName: "New England CareFlow LLC",
  description:
    "New England CareFlow LLC builds research tools for critical-care nursing documentation, starting with Visual Notes.",
  email: "newenglandcareflow@gmail.com",
  visualNotesUrl: "https://visualizenotes.vercel.app",
  preprintUrl: "https://preprints.jmir.org/preprint/102954",
};

/** Pre-filled on every email link, so website enquiries stand out in the inbox. */
const EMAIL_SUBJECT = "Enquiry from the New England CareFlow website";

/** Opens the device's mail app — reliable on phones, often a no-op on desktops. */
export function mailto(email: string) {
  return `mailto:${email}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
}

/** Gmail's web compose window, for desktop visitors with no mail app. */
export function gmailCompose(email: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;
}

/** Outlook's web compose window. */
export function outlookCompose(email: string) {
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
}

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our company", href: "/about#company" },
      { label: "The team", href: "/about#team" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [{ label: "Visual Notes", href: "/products#visual-notes" }],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Pilot study", href: "/research#study" },
      { label: "How it works", href: "/research#method" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export type TeamMember = {
  name: string;
  credentials: string;
  role: string;
  photo: StaticImageData;
  href: string;
  link: "linkedin" | "website";
  email: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Maryum Zaidi",
    credentials: "MSN, PhD, RN",
    role: "Co-Founder & Chief Executive Officer",
    photo: maryumPhoto,
    href: "https://www.linkedin.com/in/maryum-zaidi/",
    link: "linkedin",
    email: "maryumzaidi2@gmail.com",
  },
  {
    name: "Syed Naveed Zaidi",
    credentials: "MS, PhD",
    role: "Co-Founder & Chief Technology Officer",
    photo: naveedPhoto,
    href: "https://www.linkedin.com/in/naveed-zaidi-7699032/",
    link: "linkedin",
    email: "Syed.naveed@gmail.com",
  },
  {
    name: "Jawad Hassan",
    credentials: "",
    role: "Digital Innovation & Web Operations Specialist",
    photo: jawadPhoto,
    href: "https://www.jawadhasuna.site",
    link: "website",
    email: "jawadhassanbusiness@gmail.com",
  },
];

/** The Visual Notes pipeline, in plain language. */
export const METHOD = [
  {
    step: "Segment",
    text: "Notes are split on the section headers nurses already write — NEURO, RESP, CV. No AI involved.",
  },
  {
    step: "Extract",
    text: "Each section is mapped onto a fixed set of fourteen body systems, identical for every patient.",
  },
  {
    step: "Ground",
    text: "Every fact keeps a link to the exact words it came from, and is checked against the source.",
  },
  {
    step: "Cover",
    text: "Sentences left unused get a second pass, so nothing is quietly dropped.",
  },
  {
    step: "Render",
    text: "The verified result is drawn the same way every time — same notes, same chart.",
  },
];
