import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { ColorTheme } from "../hooks/useTheme";

export const ColorThemeList: {
  value: ColorTheme;
  label: string;
  color: string;
  colors?: string[];
}[] = [
  { value: "green", label: "green", color: "oklch(58% 0.12 145)" },
  { value: "turquoise", label: "turquoise", color: "oklch(58% 0.14 200)" },
  { value: "amaretto", label: "amaretto", color: "oklch(58% 0.14 55)" },
  { value: "burgundy", label: "burgundy", color: "oklch(58% 0.14 15)" },
  { value: "boring", label: "boring", color: "oklch(50% 0 0)" },
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

  // Get background style for the dropdown
  const getDropdownBackground = () => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-10 h-10 rounded-full
                     flex items-center justify-center overflow-hidden
                     transition-all duration-300 ease-in-out
                     hover:scale-110 hover:rotate-12
                     active:scale-95
                     shadow-sm hover:shadow-md
                     outline-none focus:outline-none"
          style={isMultiColor ? undefined : { backgroundColor: currentColor }}
          aria-label="Select color theme"
        >
          {isMultiColor && currentThemeData.colors ? (
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
                style={{ backgroundColor: theme.color }}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
