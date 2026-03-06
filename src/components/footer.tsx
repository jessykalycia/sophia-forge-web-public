"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border-default">
      <div className="mx-auto max-w-container px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-raleway text-lg font-extrabold text-green-primary">
              Sophia Forge
            </span>
            <p className="mt-1 font-figtree text-sm text-text-secondary">
              <a
                href="https://sophiafoundry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-green-primary"
              >
                {t("tagline")}
              </a>
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a
              href="mailto:jessyka@sophiafoundry.com"
              className="font-space-mono text-xs text-text-secondary transition-colors hover:text-green-primary"
            >
              {t("email")}
            </a>
            <LanguageSwitcher direction="up" />
          </div>
        </div>

        <div className="mt-8 border-t border-border-subtle pt-6">
          <p className="font-space-mono text-xs text-text-muted">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
