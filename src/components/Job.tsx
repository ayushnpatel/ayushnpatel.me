import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface JobProps {
  icon?: LucideIcon;
  image?: string;
  title: string;
  date?: string;
  description: string;
  imageCount?: number;
  showDivider?: boolean;
  jobIndex: number;
  isExpanded?: boolean;
  selectedImageIndex?: number | null;
  onImageClick?: (jobIndex: number, imageIndex: number) => void;
  hoveredImage?: { jobIndex: number; imageIndex: number } | null;
  onImageHover?: (jobIndex: number, imageIndex: number | null) => void;
  isAbove?: boolean;
  imageUrls?: string[];
  captions?: string[];
  showCarousel?: boolean;
}

export function Job({
  icon: Icon,
  image,
  title,
  date,
  description,
  imageCount = 3,
  showDivider = false,
  jobIndex,
  isExpanded = false,
  selectedImageIndex = null,
  onImageClick,
  hoveredImage,
  onImageHover,
  isAbove = false,
  imageUrls = [],
  captions = [],
  showCarousel = false,
}: JobProps) {
  const clampedImageCount = Math.min(Math.max(imageCount, 1), 4);

  const handleImageClick = (imageIndex: number) => {
    if (onImageClick) {
      onImageClick(jobIndex, imageIndex);
    }
  };

  const handleImageHover = (imageIndex: number | null) => {
    if (onImageHover) {
      onImageHover(jobIndex, imageIndex);
    }
  };

  // Animation variants for job container
  const jobVariants = {
    initial: { opacity: 1, y: 0 },
    exit: (custom: { isAbove: boolean }) => ({
      opacity: 0,
      y: custom.isAbove ? -100 : 100,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as any,
      },
    }),
  };

  // Job content stays visible - no animation needed

  // Animation variants for images
  const imageVariants = {
    initial: {
      scale: 1,
      filter: "blur(0.3px)", // 5% blur
      opacity: 1,
    },
    hovered: {
      filter: "blur(0px)", // 0% blur when hovered
      opacity: 1,
    },
    otherHovered: {
      filter: "blur(0.5px)", // 5% blur
      opacity: 0.8,
    },
  };

  return (
    <motion.div
      className={cn(
        "relative w-full max-w-5xl mx-auto mb-8 md:mb-24",
        isExpanded && "mb-6 md:mb-12"
      )}
      variants={jobVariants}
      initial="initial"
      exit="exit"
      custom={{ isAbove }}
      layout
      onClick={(e) => e.stopPropagation()}
    >
      {/* Dotted divider - visible on all screen sizes */}
      {showDivider && <div className="job-divider" />}

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
          {Array.from({ length: clampedImageCount }).map((_, i) => {
            const imageUrl = imageUrls[i] || "";
            return (
              <div
                key={i}
                className="border-2 border-border-strong
                           bg-secondary-subtle
                           flex items-center justify-center
                           shadow-sm hover:shadow-md
                           transition-all duration-200
                           hover:-translate-x-px hover:-translate-y-px
                           w-[23%] aspect-square rounded-xs overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(i)}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`${title} image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] font-mono text-text-subtle">
                    16×16
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Single-row layout - maintains horizontal layout even when expanded */}
      <div className="hidden md:flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between gap-3 lg:gap-4">
          {/* Icon and Text - stays visible always */}
          <div className="flex items-center gap-2.5 lg:gap-3 min-w-0 flex-1 text-left">
            <div
              className="shrink-0 rounded-full border-[3px] border-border-strong
                       bg-surface-accent
                       flex items-center justify-center
                       shadow-md hover:shadow-lg
                       transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5
                       w-12 h-12"
            >
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain rounded-full"
                />
              ) : Icon ? (
                <Icon className="text-accent w-6 h-6" strokeWidth={2.5} />
              ) : null}
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <h3 className="text-lg lg:text-xl font-bold text-text leading-tight text-pretty">
                {title}
              </h3>
              {date && (
                <p className="text-xs lg:text-xs text-text-muted mt-0.5">
                  {date}
                </p>
              )}
              <p className="text-xs lg:text-sm text-text-muted text-pretty max-w-md mt-0.5">
                {description}
              </p>
            </div>
          </div>

          {/* Images - always show 3 small blurred images */}
          <div className="flex gap-8 shrink-0">
            {Array.from({ length: clampedImageCount }).map((_, i) => {
              const isHovered =
                hoveredImage?.jobIndex === jobIndex &&
                hoveredImage?.imageIndex === i;
              const isOtherHovered =
                hoveredImage?.jobIndex === jobIndex &&
                hoveredImage?.imageIndex !== i &&
                hoveredImage !== null;
              const isSelected = isExpanded && selectedImageIndex === i;

              const imageUrl = imageUrls[i] || "";
              return (
                <motion.div
                  key={i}
                  className="border-2 border-border-strong
                           bg-secondary-subtle
                           flex items-center justify-center
                           shadow-sm hover:shadow-md
                           hover:-translate-x-px hover:-translate-y-px
                           w-16 h-16 md:w-20 md:h-20 aspect-square rounded-xs cursor-pointer overflow-hidden"
                  variants={imageVariants}
                  initial="initial"
                  animate={
                    isHovered
                      ? "hovered"
                      : isOtherHovered
                      ? "otherHovered"
                      : "initial"
                  }
                  onClick={() => handleImageClick(i)}
                  onMouseEnter={() => handleImageHover(i)}
                  onMouseLeave={() => handleImageHover(null)}
                  transition={{ duration: 0.2 }}
                  layoutId={isSelected ? undefined : `image-${jobIndex}-${i}`}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${title} image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-mono text-text-subtle">
                      16×16
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
