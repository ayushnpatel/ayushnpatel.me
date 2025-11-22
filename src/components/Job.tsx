import type { LucideIcon } from "lucide-react";

interface JobProps {
  icon?: LucideIcon;
  image?: string;
  title: string;
  date?: string;
  description: string;
  imageCount?: number;
  showDivider?: boolean;
}

export function Job({
  icon: Icon,
  image,
  title,
  date,
  description,
  imageCount = 3,
  showDivider = false,
}: JobProps) {
  const clampedImageCount = Math.min(Math.max(imageCount, 1), 4);

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Dotted divider - only visible on xs and sm, hidden on md+ */}
      {showDivider && (
        <div className="w-full max-w-5xl mx-auto job-divider md:hidden" />
      )}

      {/* Mobile: Three-row layout */}
      <div className="md:hidden space-y-4">
        {/* Row 1: Icon (left, top-aligned) | Title+Date (top) + Description (below) */}
        <div className="flex items-start gap-4">
          {/* Icon - top aligned */}
          <div
            className="shrink-0 rounded-full border-[3px] border-border-strong
                       bg-surface-accent
                       flex items-center justify-center
                       shadow-md hover:shadow-lg
                       transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5
                       w-14 h-14"
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain rounded-full"
              />
            ) : Icon ? (
              <Icon className="text-accent w-7 h-7" strokeWidth={2.5} />
            ) : null}
          </div>

          {/* Text content - top aligned, stacked */}
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            {/* Title + Date row */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-text leading-tight text-pretty">
                {title}
              </h3>
              {date && (
                <p className="text-sm font-bold text-text leading-tight shrink-0">
                  {date}
                </p>
              )}
            </div>
            {/* Description - directly below title/date */}
            <p className="text-[11px] text-text-muted text-pretty leading-snug">
              {description}
            </p>
          </div>
        </div>

        {/* Row 2: Images evenly spaced - always square, 30% smaller */}
        <div className="flex items-center justify-between gap-4">
          {Array.from({ length: clampedImageCount }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-border-strong
                         bg-secondary-subtle
                         flex items-center justify-center
                         shadow-sm hover:shadow-md
                         transition-all duration-200
                         hover:-translate-x-px hover:-translate-y-px
                         w-[23%] aspect-square rounded-xs"
            >
              <span className="text-[10px] font-mono text-text-subtle">
                16×16
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Single-row layout */}
      <div className="hidden md:flex flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Icon and Text */}
        <div className="flex items-center gap-4 lg:gap-6 min-w-0 flex-1 text-left">
          <div
            className="shrink-0 rounded-full border-[3px] border-border-strong
                       bg-surface-accent
                       flex items-center justify-center
                       shadow-md hover:shadow-lg
                       transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5
                       w-20 h-20"
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain rounded-full"
              />
            ) : Icon ? (
              <Icon className="text-accent w-10 h-10" strokeWidth={2.5} />
            ) : null}
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <h3 className="text-2xl lg:text-3xl font-bold text-text leading-tight text-pretty">
              {title}
            </h3>
            {date && (
              <p className="text-sm lg:text-base text-text-muted mt-1">
                {date}
              </p>
            )}
            <p className="text-base lg:text-lg text-text-muted text-pretty max-w-md mt-1">
              {description}
            </p>
          </div>
        </div>

        {/* Images - always square */}
        <div className="flex gap-3 shrink-0">
          {Array.from({ length: clampedImageCount }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-border-strong
                         bg-secondary-subtle
                         flex items-center justify-center
                         shadow-sm hover:shadow-md
                         transition-all duration-200
                         hover:-translate-x-px hover:-translate-y-px
                         w-20 h-20 aspect-square rounded-xs"
            >
              <span className="text-xs font-mono text-text-subtle">16×16</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
