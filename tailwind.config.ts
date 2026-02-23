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
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        stroke: "rgb(var(--stroke) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-strong": "rgb(var(--accent-strong) / <alpha-value>)",
        "accent-red": "#E8475F",
        "accent-gold": "#F59E0B",
        devlo: {
          50: "#F8FAFB",
          100: "#E8F4F8",
          600: "#2A6F97",
          700: "#1E4D6B",
          800: "#1B3A4B",
          900: "#0F2B3C",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F3F4F6",
          200: "#E5E7EB",
          400: "#9CA3AF",
          600: "#4B5563",
          900: "#1A1A2E",
        },
      },
      borderRadius: {
        soft: "var(--radius-soft)",
        panel: "var(--radius-panel)",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(16, 23, 42, 0.06)",
        panel: "0 18px 42px rgba(16, 23, 42, 0.1)",
      },
      spacing: {
        18: "4.5rem",
        30: "7.5rem",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Avenir Next", "Segoe UI", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
