import { Moon, Sun } from "lucide-react";

interface ThemeButtonProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeButton({ isDark, onToggle }: ThemeButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 rounded-full border-2 border-border-strong
                 bg-surface hover:bg-hover active:bg-active
                 flex items-center justify-center
                 transition-all duration-300 ease-in-out
                 hover:scale-110 hover:rotate-12
                 active:scale-95
                 shadow-sm hover:shadow-md"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 text-text transition-all duration-300 ${
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
          size={24}
          strokeWidth={2.5}
        />
        <Moon
          className={`absolute inset-0 text-text transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
          size={24}
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}
