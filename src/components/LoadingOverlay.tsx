import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { ColorTheme } from "../hooks/useTheme";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  colorTheme?: ColorTheme;
  isDark?: boolean;
}

export function LoadingOverlay({
  visible,
  message,
  colorTheme = "green",
  isDark = false,
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-100 loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Wave background container */}
          <div className="absolute inset-0 loading-wave-container">
            <div className="loading-wave loading-wave-1" />
            <div className="loading-wave loading-wave-2" />
            <div className="loading-wave loading-wave-3" />
          </div>

          {/* Icon and message container */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            {/* Spinning icon */}
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Loader2
                className="w-16 h-16 md:w-20 md:h-20 text-text"
                strokeWidth={2}
              />
            </motion.div>

            {/* Optional message */}
            {message && (
              <motion.p
                className="text-base md:text-lg text-text-muted font-body text-center px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
