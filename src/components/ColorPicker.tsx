import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { ColorTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

export const ColorThemeList: {
  value: ColorTheme;
  label: string;
  color: string;
  colors?: string[];
  style?: React.CSSProperties;
}[] = [
  { value: "green", label: "green", color: "oklch(58% 0.12 145)" },
  { value: "turquoise", label: "turquoise", color: "oklch(58% 0.14 200)" },
  { value: "amaretto", label: "amaretto", color: "oklch(58% 0.14 55)" },
  { value: "burgundy", label: "burgundy", color: "oklch(58% 0.14 15)" },
  { value: "boring", label: "boring", color: "oklch(50% 0 0)" },
  { value: "cobalt", label: "Cobalt", color: "#2563eb" },
  { value: "indigo", label: "Indigo", color: "#4f46e5" },
  { value: "periwinkle", label: "Periwinkle", color: "#818cf8" },
  { value: "slate", label: "Slate", color: "#64748b" },
  { value: "ice", label: "Ice", color: "#e0f2fe" },
  { value: "midnight", label: "Midnight", color: "#0f172a" },
  { value: "coral", label: "Coral", color: "#fb7185" },
  { value: "sandstone", label: "Sandstone", color: "#fbbf77" },
  { value: "lavender", label: "Lavender", color: "#c4b5fd" },
  { value: "rose", label: "Rose", color: "#fb7185" },
  { value: "copper", label: "Copper", color: "#c56a26" },
  { value: "peach", label: "Peach", color: "#fdba74" },
  { value: "charcoal", label: "Charcoal", color: "#111827" },
  {
    value: "noir-glass",
    label: "Noir Glass",
    color: "#0f172a",
    style: {
      background: "linear-gradient(135deg, #020617 0%, #0ea5e9 100%)",
    },
  },
  {
    value: "dawn-fade",
    label: "Dawn Fade",
    color: "#fb7185",
    style: {
      background: "linear-gradient(135deg, #fed7aa 0%, #bfdbfe 100%)",
    },
  },
  {
    value: "deep-space",
    label: "Deep Space",
    color: "#1d1252",
    style: {
      background:
        "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.8), #020016)",
    },
  },
  {
    value: "paperfolio",
    label: "Paperfolio",
    color: "#f5e9d8",
    style: {
      background:
        "repeating-linear-gradient(45deg, #f5ecde 0px, #f5ecde 4px, #e3cfaf 4px, #e3cfaf 5px)",
    },
  },
  {
    value: "matrix-ink",
    label: "Matrix Ink",
    color: "#22c55e",
    style: {
      backgroundColor: "#020c08",
      border: "2px solid #22c55e",
    },
  },
  {
    value: "neo-brutalism",
    label: "neo-brutalism",
    color: "#A8A6FF",
    colors: ["#A8A6FF", "#FFA6F6", "#B8FF9F"], // Violet, Pink, Lime
  },
];

interface ColorPickerProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  isDark?: boolean;
}

export function ColorPicker({
  currentTheme,
  onThemeChange,
  isDark = false,
}: ColorPickerProps) {
  const currentThemeData =
    ColorThemeList.find((t) => t.value === currentTheme) || ColorThemeList[0];
  const currentColor = currentThemeData.color;
  const isMultiColor =
    currentThemeData.colors && currentThemeData.colors.length > 1;
  const isNoirGlass = currentTheme === "noir-glass";

  // Get background style for the dropdown
  const getDropdownBackground = () => {
    // Special handling for noir-glass
    if (currentTheme === "noir-glass") {
      return {
        background: `linear-gradient(145deg, rgba(10, 15, 30, 0.95) 0%, rgba(5, 10, 25, 0.98) 100%)`,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      };
    }
    // Special handling for neo-brutalism gradient
    if (currentTheme === "neo-brutalism") {
      if (isDark) {
        return {
          background: `linear-gradient(135deg, #1a0a1a 0%, #0a0a1a 15%, #1a0a2a 30%, #0a1a0a 45%, #1a1a0a 60%, #0a0a2a 75%, #1a0a1a 90%, #0a0a0a 100%), radial-gradient(circle at 30% 30%, rgba(255, 0, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(128, 0, 255, 0.1) 0%, transparent 60%)`,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
        };
      } else {
        return {
          background: `linear-gradient(135deg, #f0e5ff 0%, #e0c5ff 18%, #ffc5f0 36%, #ffe5c5 54%, #c5ffe5 72%, #c5f0ff 90%, #e5e5ff 100%)`,
        };
      }
    }
    // For other themes, use the CSS variable
    return {
      backgroundColor: "var(--color-background)",
    };
  };

  // Get button style for noir-glass
  const getButtonStyle = () => {
    if (isNoirGlass) {
      // Different styling for light vs dark mode
      if (isDark) {
        return {
          background: `linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.2) 100%)`,
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: `
            0 4px 20px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(56, 189, 248, 0.2),
            inset 0 1px 1px rgba(255, 255, 255, 0.3)
          `,
        };
      } else {
        // Light mode - darker, more visible
        return {
          background: `linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(2, 132, 199, 0.35) 100%)`,
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          border: "1px solid rgba(14, 165, 233, 0.4)",
          boxShadow: `
            0 4px 16px rgba(0, 0, 0, 0.15),
            0 0 12px rgba(14, 165, 233, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.5)
          `,
        };
      }
    }
    return isMultiColor
      ? undefined
      : currentThemeData.style || { backgroundColor: currentColor };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-10 h-10 rounded-full",
            "flex items-center justify-center overflow-hidden",
            "transition-all duration-300 ease-in-out",
            "hover:scale-110 hover:rotate-12",
            "active:scale-95",
            "shadow-sm hover:shadow-md",
            "outline-none focus:outline-none",
            isNoirGlass && "liquid-glass-btn"
          )}
          style={getButtonStyle()}
          aria-label="Select color theme"
        >
          {isNoirGlass ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Glass highlight effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: isDark
                    ? `radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 100%)`
                    : `radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 100%)`,
                }}
              />
              {/* Center dot/indicator */}
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: isDark
                    ? `radial-gradient(circle, #38bdf8 0%, #0ea5e9 100%)`
                    : `radial-gradient(circle, #0284c7 0%, #0369a1 100%)`,
                  boxShadow: isDark
                    ? `0 0 10px rgba(56, 189, 248, 0.8)`
                    : `0 0 8px rgba(2, 132, 199, 0.6)`,
                }}
              />
            </div>
          ) : isMultiColor && currentThemeData.colors ? (
            <div className="w-full h-full flex flex-col">
              {currentThemeData.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ) : null}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-fit p-2 grid grid-cols-6 gap-2 border-border-strong"
        style={getDropdownBackground()}
      >
        {ColorThemeList.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className="p-0 rounded-md cursor-pointer focus:bg-transparent outline-none group"
            title={theme.label}
          >
            {theme.colors && theme.colors.length > 1 ? (
              <div className="w-8 h-8 rounded-md shadow-sm border border-border-subtle overflow-hidden flex flex-col transition-transform duration-200 group-hover:scale-110">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-md shadow-sm border border-border-subtle
                           transition-transform duration-200
                           group-hover:scale-110"
                style={theme.style || { backgroundColor: theme.color }}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
