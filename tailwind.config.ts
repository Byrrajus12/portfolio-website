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
        bg:            "var(--bg)",
        surface:       "var(--surface)",
        "surface-2":   "var(--surface-2)",
        ink:           "var(--ink)",
        muted:         "var(--muted)",
        border:        "var(--border)",
        accent:        "var(--accent)",
        "accent-deep": "var(--accent-deep)",
      },
      fontFamily: {
        sans: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        mono: ["var(--font-spline-mono)", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5.5vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        feature: ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};

export default config;
