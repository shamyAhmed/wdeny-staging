"use client";

import { FaInstagram, FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { useGetSettings } from "@/hooks/useGetSettings";
import { SocialLinks } from "@/app/[locale]/_types/Api";

const iconMap: Record<keyof SocialLinks, React.ReactNode> = {
  twitter:   <FaXTwitter />,
  facebook:  <FiFacebook />,
  instagram: <FaInstagram />,
  linkedIn:  <FaLinkedin />,
  whatsapp:  <FaWhatsapp />,
};

const ORDER: (keyof SocialLinks)[] = [
  "twitter",
  "facebook",
  "instagram",
  "linkedIn",
  "whatsapp",
];

// ── TopBar variant ────────────────────────────────────────────────────────────
// Renders a row of circular icon buttons (white/20 bg on the primary top-bar).
export function TopBarSocialLinks() {
  const { settings, isLoading } = useGetSettings();

  return (
    <div className="flex items-center gap-3">
      {isLoading
        ? ORDER.map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-white/30 animate-pulse" />
          ))
        : ORDER.filter((key) => !!settings?.socialLinks?.[key]).map((key) => (
            <a
              key={key}
              href={settings!.socialLinks[key]}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {iconMap[key]}
            </a>
          ))}
    </div>
  );
}

// ── Footer variant ────────────────────────────────────────────────────────────
// Renders <li> elements to slot directly into the footer's <ul className="social">.
export function FooterSocialLinks() {
  const { settings, isLoading } = useGetSettings();

  return (
    <>
      {isLoading
        ? ORDER.map((_, i) => (
            <li key={i}>
              <div className="w-6 h-6 rounded-full bg-white/30 animate-pulse" />
            </li>
          ))
        : ORDER.filter((key) => !!settings?.socialLinks?.[key]).map((key) => (
            <li key={key}>
              <a
                href={settings!.socialLinks[key]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconMap[key]}
              </a>
            </li>
          ))}
    </>
  );
}
