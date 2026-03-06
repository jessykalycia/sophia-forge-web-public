import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { FadeIn, FadeInStagger, FadeInStaggerChild } from "@/components/motion";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(18, 160, 102, 0.06) 0%, transparent 70%)",
          }}
        />

        <FadeIn className="relative z-10">
          <p className="font-space-mono text-xs font-bold uppercase tracking-[0.25em] text-green-primary">
            // {t("hero.eyebrow")}
          </p>

          <h1
            className="mt-6 font-raleway font-extrabold text-text-primary"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {t("hero.headline")}
          </h1>

          <p className="mx-auto mt-6 max-w-[560px] font-figtree text-lg text-text-secondary">
            {t("hero.subline")}
          </p>

          <div className="mt-10">
            <a
              href="#waitlist"
              className="inline-block rounded-lg bg-green-primary px-8 py-3 font-figtree font-semibold text-white transition-colors hover:bg-green-bright"
            >
              {t("hero.cta")}
            </a>
          </div>
        </FadeIn>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <p className="animate-scroll-pulse font-space-mono text-xs uppercase tracking-widest text-text-muted">
            {t("hero.scroll")}
          </p>
          <div className="h-12 w-px animate-scroll-pulse bg-gradient-to-b from-green-dim to-transparent" />
        </div>
      </section>

      {/* What Is Sophia Forge */}
      <section
        className="mx-auto max-w-container px-6"
        style={{ paddingTop: "2rem", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}
      >
        <FadeIn>
          <p
            className="mx-auto max-w-[700px] text-center font-figtree text-text-secondary"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.8 }}
          >
            {t("what.body")}
          </p>
        </FadeIn>
      </section>

      {/* Feature Pillars */}
      <section
        className="mx-auto max-w-container px-6"
        style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)" }}
      >
        <FadeInStagger className="grid items-stretch gap-6 sm:grid-cols-2">
          {(["asset_sync", "task_tracking", "collaboration", "ai_workflows", "ue5", "more_engines"] as const).map(
            (key) => (
              <FadeInStaggerChild key={key} className="h-full">
                <div
                  className="h-full rounded-xl border border-border-default border-t-2 border-t-green-primary bg-bg-surface p-8"
                  style={key === "more_engines" ? { opacity: 0.7 } : undefined}
                >
                  <FeatureIcon feature={key} />
                  <h3 className="mt-4 font-raleway text-lg font-bold text-text-primary">
                    {t(`features.${key}`)}
                  </h3>
                  <p className="mt-2 font-figtree text-sm text-text-secondary">
                    {t(`features.${key}_desc`)}
                  </p>
                </div>
              </FadeInStaggerChild>
            )
          )}
        </FadeInStagger>
      </section>

      {/* Built By Someone Who Uses It */}
      <section
        className="mx-auto max-w-container px-6"
        style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)" }}
      >
        <FadeIn className="text-center">
          <p className="font-space-mono text-xs font-bold uppercase tracking-[0.25em] text-green-primary">
            // {t("quote.eyebrow")}
          </p>

          <blockquote className="mx-auto mt-8 max-w-[640px]">
            <p
              className="font-figtree italic text-text-secondary"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.8 }}
            >
              &ldquo;{t("quote.text")}&rdquo;
            </p>
          </blockquote>

          <div className="mt-8">
            <p className="font-space-mono text-sm font-bold text-text-primary">
              {t("quote.author")}
            </p>
            <p className="mt-1 font-space-mono text-xs text-text-muted">
              {t("quote.role")}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Early Access Waitlist */}
      <section
        id="waitlist"
        className="mx-auto max-w-container px-6"
        style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)" }}
      >
        <FadeIn className="text-center">
          <p className="font-space-mono text-xs font-bold uppercase tracking-[0.25em] text-green-primary">
            // {t("waitlist.eyebrow")}
          </p>

          <h2
            className="mt-6 font-raleway font-extrabold text-text-primary"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {t("waitlist.headline")}
          </h2>

          <p className="mx-auto mt-4 max-w-[480px] font-figtree text-text-secondary">
            {t("waitlist.subline")}
          </p>

          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>

          <p className="mt-4 font-space-mono text-xs text-text-muted">
            {t("waitlist.disclaimer")}
          </p>
        </FadeIn>
      </section>
    </>
  );
}

function FeatureIcon({ feature }: { feature: string }) {
  const icons: Record<string, JSX.Element> = {
    asset_sync: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="#12a066" strokeWidth="2" />
        <rect x="18" y="18" width="10" height="10" rx="2" stroke="#12a066" strokeWidth="2" />
        <path d="M14 9h4M9 14v4M18 23h-4M23 18v-4" stroke="#12a066" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    task_tracking: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="24" height="4" rx="1" stroke="#12a066" strokeWidth="2" />
        <rect x="4" y="14" width="24" height="4" rx="1" stroke="#12a066" strokeWidth="2" />
        <rect x="4" y="22" width="16" height="4" rx="1" stroke="#12a066" strokeWidth="2" />
      </svg>
    ),
    collaboration: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="12" r="4" stroke="#12a066" strokeWidth="2" />
        <circle cx="22" cy="12" r="4" stroke="#12a066" strokeWidth="2" />
        <path d="M4 26c0-3.3 2.7-6 6-6h2M20 20h2c3.3 0 6 2.7 6 6" stroke="#12a066" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 20v6M13 23h6" stroke="#12a066" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    ai_workflows: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" stroke="#12a066" strokeWidth="2" />
        <path d="M16 10v4l3 2" stroke="#12a066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="2" fill="#12a066" />
      </svg>
    ),
    ue5: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L28 10v12L16 28 4 22V10L16 4z" stroke="#12a066" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 10l12 6m0 0l12-6m-12 6v12" stroke="#12a066" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    more_engines: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="16" r="2" fill="#12a066" />
        <circle cx="16" cy="16" r="2" fill="#12a066" />
        <circle cx="24" cy="16" r="2" fill="#12a066" />
      </svg>
    ),
  };

  return icons[feature] || null;
}
