import type { ColorTheme } from "../hooks/useTheme";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

interface SocialsProps {
  colorTheme?: ColorTheme;
}

export function Socials({ colorTheme }: SocialsProps) {
  const { isDark } = useTheme();
  const isNoirGlass = colorTheme === "noir-glass";

  // For noir-glass, match the header text gradient color
  const noirGlassTextColor = isDark ? "text-white" : "text-slate-700";

  const linkClassName = cn(
    "transition-all duration-300",
    isNoirGlass
      ? cn(isDark && "liquid-glass-social", noirGlassTextColor)
      : "text-text hover:text-accent transition-colors"
  );

  // Style for light mode glass effect
  const getLinkStyle = () => {
    if (!isNoirGlass) return undefined;
    if (isDark) return undefined;
    
    // Light mode glass social style
    return {
      padding: "10px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(14, 165, 233, 0.2)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
    };
  };

  // Determine fill color for noir-glass theme
  const getFillColor = () => {
    if (!isNoirGlass) return "currentColor";
    return isDark ? "white" : "#1e293b"; // dark slate for light mode
  };

  const svgStyle = isNoirGlass
    ? { 
        filter: isDark 
          ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))" 
          : "drop-shadow(0 0 3px rgba(14, 165, 233, 0.25))"
      }
    : undefined;

  // Force re-render when theme changes by using key
  const themeKey = `socials-${isDark}-${colorTheme}`;

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6" key={themeKey}>
      {/* X/Twitter */}
      <a
        href="https://x.com/ayushnpatel"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        style={getLinkStyle()}
        aria-label="X (Twitter)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 300 271"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill={getFillColor()}
          style={svgStyle}
        >
          <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
        </svg>
      </a>

      {/* Mail */}
      <a
        href="mailto:ayushnpatel@gmail.com"
        className={linkClassName}
        style={getLinkStyle()}
        aria-label="Email"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 -4 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill={getFillColor()}
          style={svgStyle}
        >
          <path d="M442,279 C442,279.203 441.961,279.395 441.905,279.578 L433,270 L442,263 L442,279 L442,279 Z M415.556,280.946 L424.58,271.33 L428,273.915 L431.272,271.314 L440.444,280.946 C440.301,280.979 415.699,280.979 415.556,280.946 L415.556,280.946 Z M414,279 L414,263 L423,270 L414.095,279.578 C414.039,279.395 414,279.203 414,279 L414,279 Z M441,261 L428,271 L415,261 L441,261 L441,261 Z M440,259 L416,259 C413.791,259 412,260.791 412,263 L412,279 C412,281.209 413.791,283 416,283 L440,283 C442.209,283 444,281.209 444,279 L444,263 C444,260.791 442.209,259 440,259 L440,259 Z" transform="translate(-412, -259)" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/ayushnpatel"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        style={getLinkStyle()}
        aria-label="LinkedIn"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 382 382"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill={getFillColor()}
          style={svgStyle}
        >
          <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z" />
        </svg>
      </a>
    </div>
  );
}

