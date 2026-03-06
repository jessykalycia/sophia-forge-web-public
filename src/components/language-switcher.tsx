"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ direction = "down" }: { direction?: "up" | "down" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(loc: Locale) {
    router.replace(pathname, { locale: loc });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-w-[130px] cursor-pointer items-center justify-between gap-2 rounded-md border border-border-default bg-bg-surface px-3 py-2 font-space-mono text-xs text-text-secondary transition-colors hover:border-green-border hover:text-text-primary focus:border-green-primary focus:outline-none"
      >
        {localeNames[locale as Locale]}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute right-0 z-50 min-w-[130px] overflow-hidden rounded-lg border border-border-default bg-bg-surface py-1 ${
            direction === "up" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => select(loc)}
                className={`w-full cursor-pointer px-3 py-2 text-left font-figtree text-xs transition-colors hover:bg-green-ghost hover:text-text-primary ${
                  loc === locale ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {localeNames[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
