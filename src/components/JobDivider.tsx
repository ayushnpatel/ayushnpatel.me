import { useEffect, useRef } from "react";

interface JobDividerProps {
  delay?: number;
}

export function JobDivider({ delay = 0 }: JobDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            containerRef.current?.classList.add("animate-draw-line");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 md:hidden overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated diagonal line with gradient */}
      <div className="relative h-0.5 bg-gradient-to-r from-transparent via-border-strong to-transparent">
        {/* Animated dot that travels along the line */}
        <div className="absolute top-1/2 left-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-sm animate-slide-dot" />

        {/* Decorative dashes with staggered animation */}
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div
            className="h-1.5 w-1.5 rounded-full bg-border-strong animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full bg-border-strong animate-pulse"
            style={{ animationDelay: "200ms" }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full bg-border-strong animate-pulse"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}
