/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f0f11",
        surface: "#17171a",
        border: "#2a2a30",
        muted: "#6b7280",
        text: "#e4e4e7",
        accent: "#6366f1",
        "accent-dim": "#312e81",
        danger: "#ef4444",
        success: "#22c55e",
        "code-bg": "#0d0d0f",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      borderRadius: {
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
      },
      transitionDuration: {
        200: "200ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0, 0, 0.2, 1)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      height: {
        14: "3.5rem",
      },
      maxWidth: {
        "2xl": "42rem",
        "7xl": "80rem",
      },
      width: {
        60: "15rem",
        70: "17.5rem",
      },
      ringOffsetColor: {
        bg: "#0f0f11",
      },
    },
  },
  plugins: [],
};
