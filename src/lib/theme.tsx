import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "logistics-blue" | "luxury-gold" | "midnight-black" | "light-corporate";

export const THEMES: { id: ThemeId; label: string; swatch: string[]; tone: "dark" | "light" }[] = [
  { id: "logistics-blue", label: "Logistics Blue", swatch: ["#E8F0FE", "#1565C0", "#FF6A00"], tone: "light" },
  { id: "luxury-gold", label: "Luxury Gold", swatch: ["#FFFEF7", "#7C5E10", "#C9A84C"], tone: "light" },
  { id: "midnight-black", label: "Midnight", swatch: ["#EDE9FE", "#6D28D9", "#0891B2"], tone: "light" },
  { id: "light-corporate", label: "Corporate", swatch: ["#FFFFFF", "#0F1B3D", "#FF6A00"], tone: "light" },
];

const STORAGE_KEY = "spot-theme";
const DEFAULT: ThemeId = "light-corporate";

interface Ctx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}
const ThemeContext = createContext<Ctx>({ theme: DEFAULT, setTheme: () => {} });

function applyTheme(t: ThemeId) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  const tone = THEMES.find((x) => x.id === t)?.tone ?? "dark";
  root.classList.toggle("dark", tone === "dark");
  // Smooth tween
  root.classList.add("theme-transition");
  window.setTimeout(() => root.classList.remove("theme-transition"), 750);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as ThemeId)) || DEFAULT;
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  function setTheme(t: ThemeId) {
    setThemeState(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
    applyTheme(t);
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

/** Inline script string for __root.tsx — applies stored theme before paint. */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}')||'${DEFAULT}';document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.remove('dark');}catch(e){}})();`;
