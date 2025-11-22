import { useState, useEffect } from "react";

export type ColorTheme =
  | "green"
  | "turquoise"
  | "amaretto"
  | "burgundy"
  | "boring"
  | "neo-brutalism";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window === "undefined") return "green";
    const saved = localStorage.getItem("colorTheme");
    const theme =
      saved &&
      [
        "green",
        "turquoise",
        "amaretto",
        "burgundy",
        "boring",
        "neo-brutalism",
      ].includes(saved)
        ? (saved as ColorTheme)
        : "green";
    // Set attribute immediately to avoid flash
    document.documentElement.setAttribute("data-color-theme", theme);
    return theme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-color-theme", colorTheme);
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme, colorTheme, setColorTheme };
}
