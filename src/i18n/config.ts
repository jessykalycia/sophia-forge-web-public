export const locales = [
  "en",
  "pt-BR",
  "zh-CN",
  "ja",
  "ko",
  "de",
  "fr",
  "es",
  "ru",
  "it",
  "tr",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
  "zh-CN": "简体中文",
  ja: "日本語",
  ko: "한국어",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  it: "Italiano",
  tr: "Türkçe",
};
