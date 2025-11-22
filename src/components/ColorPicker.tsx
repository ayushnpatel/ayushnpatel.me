import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { ColorTheme } from "../hooks/useTheme";

const colorThemes: {
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
}

export function ColorPicker({ currentTheme, onThemeChange }: ColorPickerProps) {
  const currentThemeData =
    colorThemes.find((t) => t.value === currentTheme) || colorThemes[0];
  const currentColor = currentThemeData.color;
  const isMultiColor =
    currentThemeData.colors && currentThemeData.colors.length > 1;

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
        className="min-w-[180px] p-2 gap-1 bg-surface border-border-strong"
      >
        {colorThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className="flex items-center justify-between gap-4 px-3 py-2.5
                       rounded-sm cursor-pointer
                       hover:bg-hover focus:bg-hover
                       transition-colors duration-200
                       outline-none group"
          >
            <span className="font-display text-sm text-text tracking-tight">
              {theme.label}
            </span>
            {theme.colors && theme.colors.length > 1 ? (
              <div className="w-5 h-5 rounded-sm border border-border-subtle overflow-hidden flex flex-col transition-transform duration-200 group-hover:scale-110">
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
                className="w-5 h-5 rounded-sm border border-border-subtle
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
