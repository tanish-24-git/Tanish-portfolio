export const themePresets = {
  light: {
    // off-white background, no pure white
    "--background": "#f4f6f8",
    "--foreground": "#0f172a",
    "--muted": "#e6e9ee",
    "--muted-foreground": "#475569",
    "--card": "#f7f9fb",
    "--border": "#d5dbe3",
    "--primary": "#2563eb", // blue
    "--accent": "#0ea5e9", // cyan
  },
  dark: {
    "--background": "#0b1220",
    "--foreground": "#e6eaf2",
    "--muted": "#121a2b",
    "--muted-foreground": "#93a0b8",
    "--card": "#0f172a",
    "--border": "#1e293b",
    "--primary": "#22d3ee", // cyan
    "--accent": "#34d399", // green
  },
  blue: {
    "--background": "#0b1020",
    "--foreground": "#e6f1ff",
    "--muted": "#101733",
    "--muted-foreground": "#9fb3d9",
    "--card": "#0f1630",
    "--border": "#1b2550",
    "--primary": "#60a5fa",
    "--accent": "#38bdf8",
  },
  green: {
    "--background": "#0c1a14",
    "--foreground": "#eaf8f1",
    "--muted": "#11241c",
    "--muted-foreground": "#a7d7c4",
    "--card": "#0f231b",
    "--border": "#1e3a2f",
    "--primary": "#34d399",
    "--accent": "#22d3ee",
  },
} as const

export type ThemePresets = typeof themePresets
export type ThemeName = keyof typeof themePresets

export function varsForTheme(name: ThemeName) {
  const t = themePresets[name]
  // Map to shadcn token variables Tailwind uses
  return {
    "--background": t["--background"],
    "--foreground": t["--foreground"],
    "--muted": t["--muted"],
    "--muted-foreground": t["--muted-foreground"],
    "--card": t["--card"],
    "--border": t["--border"],
    "--primary": t["--primary"],
    "--accent": t["--accent"],
  }
}
