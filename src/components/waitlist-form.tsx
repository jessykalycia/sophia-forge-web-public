"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export function WaitlistForm() {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-figtree text-green-bright text-base">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full rounded-lg border border-border-default bg-bg-surface px-5 py-3 font-figtree text-text-primary placeholder:text-text-muted transition-colors focus:border-green-primary focus:outline-none sm:w-[320px]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full cursor-pointer rounded-lg bg-green-primary px-8 py-3 font-figtree font-semibold text-white transition-colors hover:bg-green-bright disabled:opacity-60 sm:w-auto"
      >
        {t("cta")}
      </button>
      {status === "error" && (
        <p className="font-figtree text-sm text-red-400">{t("error")}</p>
      )}
    </form>
  );
}
