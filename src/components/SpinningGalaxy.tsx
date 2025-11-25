import type { ColorTheme } from "../hooks/useTheme";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

interface SpinningGalaxyProps {
  colorTheme?: ColorTheme;
}

export function SpinningGalaxy({ colorTheme }: SpinningGalaxyProps) {
  const { isDark } = useTheme();
  const isNoirGlass = colorTheme === "noir-glass";

  // Colors based on light/dark mode for noir-glass
  const glassColors = {
    primary: isDark ? "#38bdf8" : "#0284c7",
    secondary: isDark ? "#0ea5e9" : "#0369a1",
    tertiary: isDark ? "#7dd3fc" : "#0ea5e9",
    accent: isDark ? "#22d3ee" : "#0891b2",
  };

  // Explicit style for light mode to prevent any inherited box styling
  const wrapperStyle = isNoirGlass && !isDark ? {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
  } : undefined;

  return (
    <div 
      className={cn("relative w-16 h-16", isNoirGlass && isDark && "liquid-glass-glow")}
      style={wrapperStyle}
    >
      <div className="absolute inset-0 animate-spin-slow">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={isNoirGlass ? { 
            filter: isDark 
              ? "drop-shadow(0 0 8px rgba(56, 189, 248, 0.5))" 
              : "drop-shadow(0 0 6px rgba(2, 132, 199, 0.4))"
          } : undefined}
        >
          <defs>
            <radialGradient id="galaxy-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </radialGradient>
            {isNoirGlass && (
              <>
                <radialGradient id="galaxy-glass-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={glassColors.primary} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={glassColors.secondary} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={glassColors.tertiary} stopOpacity="0.3" />
                </radialGradient>
                <filter id="galaxy-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </>
            )}
          </defs>

          {/* Central core */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill={isNoirGlass ? "url(#galaxy-glass-gradient)" : "currentColor"}
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
            opacity="0.9"
            filter={isNoirGlass ? "url(#galaxy-glow)" : undefined}
          />

          {/* Spiral arms with rough edges */}
          <path
            d="M 50 50 Q 65 35 75 30 Q 80 28 82 25"
            stroke={isNoirGlass ? glassColors.primary : "url(#galaxy-gradient)"}
            strokeWidth="3"
            fill="none"
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
            strokeLinecap="round"
            opacity={isNoirGlass ? 0.9 : 1}
          />
          <path
            d="M 50 50 Q 35 65 25 70 Q 20 72 18 75"
            stroke={isNoirGlass ? glassColors.secondary : "url(#galaxy-gradient)"}
            strokeWidth="3"
            fill="none"
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
            strokeLinecap="round"
            opacity={isNoirGlass ? 0.9 : 1}
          />
          <path
            d="M 50 50 Q 65 65 70 75 Q 72 80 75 82"
            stroke={isNoirGlass ? glassColors.tertiary : "url(#galaxy-gradient)"}
            strokeWidth="2.5"
            fill="none"
            className={!isNoirGlass ? "text-powder-blush dark:text-celadon" : undefined}
            strokeLinecap="round"
            opacity={isNoirGlass ? 0.85 : 1}
          />
          <path
            d="M 50 50 Q 35 35 30 25 Q 28 20 25 18"
            stroke={isNoirGlass ? glassColors.accent : "url(#galaxy-gradient)"}
            strokeWidth="2.5"
            fill="none"
            className={!isNoirGlass ? "text-powder-blush dark:text-celadon" : undefined}
            strokeLinecap="round"
            opacity={isNoirGlass ? 0.85 : 1}
          />

          {/* Scattered stars */}
          <circle
            cx="70"
            cy="25"
            r="1.5"
            fill={isNoirGlass ? glassColors.tertiary : "currentColor"}
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
          />
          <circle
            cx="30"
            cy="75"
            r="1.5"
            fill={isNoirGlass ? glassColors.primary : "currentColor"}
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
          />
          <circle
            cx="80"
            cy="50"
            r="1"
            fill={isNoirGlass ? glassColors.accent : "currentColor"}
            className={!isNoirGlass ? "text-powder-blush dark:text-celadon" : undefined}
          />
          <circle
            cx="20"
            cy="50"
            r="1"
            fill={isNoirGlass ? glassColors.secondary : "currentColor"}
            className={!isNoirGlass ? "text-powder-blush dark:text-celadon" : undefined}
          />
          <circle
            cx="60"
            cy="70"
            r="1.2"
            fill={isNoirGlass ? glassColors.tertiary : "currentColor"}
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
          />
          <circle
            cx="40"
            cy="30"
            r="1.2"
            fill={isNoirGlass ? glassColors.primary : "currentColor"}
            className={!isNoirGlass ? "text-celadon dark:text-powder-blush" : undefined}
          />
        </svg>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
