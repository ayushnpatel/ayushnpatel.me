import { SpinningGalaxy } from "./SpinningGalaxy";
import { ThemeButton } from "./ThemeButton";
import { ColorPicker } from "./ColorPicker";
import type { ColorTheme } from "../hooks/useTheme";

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
  colorTheme: ColorTheme;
  onColorChange: (theme: ColorTheme) => void;
}

export function Header({
  isDark,
  onThemeToggle,
  colorTheme,
  onColorChange,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Spinning Galaxy */}
        <div className="shrink-0">
          <SpinningGalaxy />
        </div>

        {/* Center: Empty (title will be in main content) */}
        <div className="flex-1" />

        {/* Right: Color Picker and Theme Button */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          <ColorPicker
            currentTheme={colorTheme}
            onThemeChange={onColorChange}
          />
          <ThemeButton isDark={isDark} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}
