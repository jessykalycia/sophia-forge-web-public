"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-base/80 backdrop-blur-md border-b border-border-default"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <span className="font-raleway text-2xl font-extrabold text-green-primary">
          Sophia Forge
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://sophiafoundry.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 font-figtree text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("backToFoundry")}
          </a>
          <LanguageSwitcher direction="down" />
        </div>
      </div>
    </nav>
  );
}
