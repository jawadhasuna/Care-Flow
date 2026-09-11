import type { MetadataRoute } from "next";

/** What phones use for "Add to Home Screen": name, colours and icons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "New England CareFlow",
    short_name: "CareFlow",
    description:
      "Research and prototype development in clinical visualization for critical-care nursing.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#052c52",
    icons: [
      { src: "/brand/icon-96.png", sizes: "96x96", type: "image/png" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
