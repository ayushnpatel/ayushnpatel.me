import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

type ThemedHeadingProps<T extends ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function ThemedHeading<T extends ElementType = "h2">({
  as,
  children,
  className,
  ...props
}: ThemedHeadingProps<T>) {
  const { colorTheme, isDark } = useTheme();
  const isMatrixInk = colorTheme === "matrix-ink";
  const isNoirGlass = colorTheme === "noir-glass";
  const Component = as || "h2";

  // Noir Glass - Liquid glass text effect
  if (isNoirGlass) {
    return (
      <Component
        className={cn("relative", className)}
        {...props}
      >
        <span className="liquid-glass-text">
          {children}
        </span>
      </Component>
    );
  }

  // Matrix Ink - Glowing terminal effect
  if (isMatrixInk) {
    return (
      <Component className={cn("relative overflow-hidden", className)} {...props}>
        <motion.span
          className="relative z-10 block"
          animate={{ opacity: [1, 0.85, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute inset-y-0 w-[2px] bg-primary/40 blur-[1px]"
          animate={{ left: ["-20%", "120%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </Component>
    );
  }

  // Default rendering
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

