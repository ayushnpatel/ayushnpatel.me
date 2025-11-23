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

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 md:px-6 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Spinning Galaxy */}
        <motion.div className="shrink-0" style={galaxyStyle}>
          <SpinningGalaxy />
        </motion.div>

        {/* Center: Empty (title will be in main content) */}
        <div className="flex-1" />

        {/* Right: Color Picker and Theme Button */}
        <motion.div
          className="shrink-0 flex items-center gap-2 sm:gap-3"
          style={controlsStyle}
        >
          <ColorPicker
            currentTheme={colorTheme}
            onThemeChange={onColorChange}
          />
          <ThemeButton isDark={isDark} onToggle={onThemeToggle} />
        </motion.div>
      </div>
    </motion.header>
  );
}
