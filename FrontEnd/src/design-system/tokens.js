/**
 * Design system tokens — single source of truth.
 * Import these in components that need programmatic access (e.g. chart colors).
 * For Tailwind class usage, rely on tailwind.config.js extensions.
 */
export const colors = {
  bg: "#0f0f11",
  surface: "#17171a",
  border: "#2a2a30",
  muted: "#6b7280",
  text: "#e4e4e7",
  accent: "#6366f1",
  accentDim: "#312e81",
  danger: "#ef4444",
  success: "#22c55e",
  codeBg: "#0d0d0f",
};

export const fontFamily = {
  mono: '"JetBrains Mono", ui-monospace, monospace',
  sans: "Inter, ui-sans-serif, system-ui, sans-serif",
};

export const spacing = {
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
};

export const radius = {
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
};
