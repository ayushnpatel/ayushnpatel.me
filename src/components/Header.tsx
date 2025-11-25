import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useState, useEffect } from "react";
import { SpinningGalaxy } from "./SpinningGalaxy";
import { ThemeButton } from "./ThemeButton";
import { ColorPicker } from "./ColorPicker";
import type { ColorTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

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
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size (below md breakpoint: 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create futuristic fade effect for mobile only
  // Fade starts at 50px scroll and completes by 200px scroll
  // Using a smooth easing curve for futuristic feel
  const mobileOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2], // Start fading after small initial scroll, complete by ~200px
    [1, 0],
    { clamp: true }
  );

  const mobileBlur = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [0, 10], // Progressive blur for futuristic effect
    { clamp: true }
  );

  // Create blur filter string using template
  const blurFilter = useMotionTemplate`blur(${mobileBlur}px)`;

  const mobileScale = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [1, 0.9], // Subtle scale down for depth effect
    { clamp: true }
  );

  const mobileTranslateY = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [0, -15], // Upward movement as it fades
    { clamp: true }
  );

  // Only apply motion styles on mobile
  const galaxyStyle = isMobile
    ? {
        opacity: mobileOpacity,
        filter: blurFilter,
        scale: mobileScale,
        y: mobileTranslateY,
      }
    : {};

  const controlsStyle = isMobile
    ? {
        opacity: mobileOpacity,
        filter: blurFilter,
        scale: mobileScale,
        y: mobileTranslateY,
      }
    : {};

  const isNoirGlass = colorTheme === "noir-glass";

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 md:px-6 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Spinning Galaxy */}
        <motion.div
          className={cn("shrink-0", isNoirGlass && isDark && "liquid-glass-galaxy")}
          style={{
            ...galaxyStyle,
            ...(isNoirGlass && !isDark ? {
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            } : {}),
          }}
          key={`galaxy-${isDark}`}
        >
          <SpinningGalaxy colorTheme={colorTheme} />
        </motion.div>

        {/* Center: Empty (title will be in main content) */}
        <div className="flex-1" />

        {/* Right: Color Picker and Theme Button */}
        <motion.div
          className={cn(
            "shrink-0 flex items-center gap-2 sm:gap-3",
            isNoirGlass && isDark && "liquid-glass-controls"
          )}
          style={{
            ...controlsStyle,
            ...(isNoirGlass && !isDark
              ? {
                  padding: "8px 12px",
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  border: "1px solid rgba(14, 165, 233, 0.2)",
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }
              : {}),
          }}
        >
          <ColorPicker
            currentTheme={colorTheme}
            onThemeChange={onColorChange}
            isDark={isDark}
          />
          <ThemeButton
            isDark={isDark}
            onToggle={onThemeToggle}
            colorTheme={colorTheme}
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
