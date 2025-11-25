import type { ColorTheme } from "@/hooks/useTheme";
import { ColorThemeList } from "./ColorPicker";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

interface ThemeButtonProps {
  isDark: boolean;
  onToggle: () => void;
  colorTheme: ColorTheme;
}

export function ThemeButton({
  isDark,
  onToggle,
  colorTheme,
}: ThemeButtonProps) {
  const isNoirGlass = colorTheme === "noir-glass";

  // Get button style based on theme
  const getButtonStyle = () => {
    if (isNoirGlass) {
      if (isDark) {
        return {
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)`,
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: `
            0 4px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.3),
            inset 0 -1px 1px rgba(255, 255, 255, 0.1)
          `,
        };
      } else {
        // Light mode - more visible with subtle glass effect
        return {
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)`,
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(14, 165, 233, 0.3)",
          boxShadow: `
            0 4px 16px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.8),
            inset 0 -1px 1px rgba(0, 0, 0, 0.05)
          `,
        };
      }
    }
    return {
      backgroundColor:
        ColorThemeList.find((t) => t.value === colorTheme)?.color + " / 100%",
    };
  };

  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-10 h-10 rounded-full",
        !isNoirGlass && "border-2 border-border-strong",
        "flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "hover:scale-110 hover:rotate-12",
        "active:scale-95",
        "shadow-sm hover:shadow-md",
        isNoirGlass && "liquid-glass-btn relative overflow-hidden"
      )}
      style={getButtonStyle()}
      aria-label="Toggle theme"
    >
      {/* Liquid glass highlight overlay */}
      {isNoirGlass && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.35) 0%, transparent 100%)`
              : `radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 100%)`,
          }}
        />
      )}
      <div className="relative w-6 h-6 z-10">
        <Sun
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100",
            isNoirGlass ? (isDark ? "text-white" : "text-sky-700") : "text-text"
          )}
          style={
            isNoirGlass
              ? {
                  filter: isDark
                    ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))"
                    : "drop-shadow(0 0 4px rgba(2, 132, 199, 0.4))",
                }
              : undefined
          }
          size={24}
          strokeWidth={2.5}
        />
        <Moon
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0",
            isNoirGlass ? "text-white" : "text-text"
          )}
          style={
            isNoirGlass
              ? {
                  filter: "drop-shadow(0 0 6px rgba(56, 189, 248, 0.6))",
                }
              : undefined
          }
          size={24}
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}
