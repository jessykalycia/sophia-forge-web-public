import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "green-primary": "var(--green-primary)",
        "green-bright": "var(--green-bright)",
        "green-dim": "var(--green-dim)",
        "green-ghost": "var(--green-ghost)",
        "green-border": "var(--green-border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
      },
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        figtree: ["var(--font-figtree)"],
        "space-mono": ["var(--font-space-mono)"],
      },
      maxWidth: {
        container: "1100px",
      },
      keyframes: {
        "scroll-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "scroll-pulse": "scroll-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
