import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { OptimizedImage } from "./OptimizedImage";
import { useTheme } from "../hooks/useTheme";
import { ThemedHeading } from "./ThemedHeading";

interface JobProps {
  icon?: LucideIcon;
  image?: string;
  title: string | ReactNode;
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
  disableAnimations?: boolean;
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
  disableAnimations = false,
}: JobProps) {
  const { colorTheme, isDark } = useTheme();
  const isPaperfolio = colorTheme === "paperfolio";
  const isNoirGlass = colorTheme === "noir-glass";
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
        "relative w-full max-w-5xl md:max-w-7xl lg:max-w-[90rem] mb-8 md:mb-24",
        isExpanded && "mb-6 md:mb-12"
      )}
      variants={disableAnimations ? undefined : jobVariants}
      {...(disableAnimations
        ? {}
        : {
            initial: "initial",
            exit: "exit",
            whileHover:
              isPaperfolio && !isExpanded
                ? { rotateX: -2, rotateY: 3, y: -2 }
                : undefined,
            custom: { isAbove },
          })}
      layout={!disableAnimations}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      style={{ transformOrigin: "center center" }}
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
            className={cn(
              "shrink-0 rounded-full flex items-center justify-center w-14 h-14",
              "transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5",
              isNoirGlass
                ? "liquid-glass-icon"
                : "border-[3px] border-border-strong bg-surface-accent shadow-md hover:shadow-lg"
            )}
            style={
              isNoirGlass
                ? isDark
                  ? {
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)`,
                      backdropFilter: "blur(12px) saturate(180%)",
                      WebkitBackdropFilter: "blur(12px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: `
                        0 4px 20px rgba(0, 0, 0, 0.25),
                        0 0 15px rgba(56, 189, 248, 0.15),
                        inset 0 1px 1px rgba(255, 255, 255, 0.35)
                      `,
                    }
                  : {
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)`,
                      backdropFilter: "blur(12px) saturate(180%)",
                      WebkitBackdropFilter: "blur(12px) saturate(180%)",
                      border: "1px solid rgba(14, 165, 233, 0.25)",
                      boxShadow: `
                        0 4px 16px rgba(0, 0, 0, 0.1),
                        inset 0 1px 1px rgba(255, 255, 255, 0.9)
                      `,
                    }
                : undefined
            }
          >
            {image ? (
              <OptimizedImage
                src={image}
                alt={typeof title === "string" ? title : "Job"}
                className="w-full h-full object-contain rounded-full"
                sizes="56px"
                width={56}
                height={56}
              />
            ) : Icon ? (
              <Icon className="text-accent w-7 h-7" strokeWidth={2.5} />
            ) : null}
          </div>

          {/* Text content - top aligned, stacked */}
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            {/* Title + Date row */}
            <div className="flex items-start justify-between gap-3">
              <ThemedHeading
                as="h3"
                className="text-lg font-bold text-text leading-tight text-pretty"
              >
                {title}
              </ThemedHeading>
              {date && (
                <p
                  className={cn(
                    "text-sm font-bold leading-tight shrink-0",
                    isNoirGlass
                      ? isDark
                        ? "text-sky-300/80"
                        : "text-sky-700"
                      : "text-text"
                  )}
                  style={
                    isNoirGlass && isDark
                      ? { textShadow: "0 0 6px rgba(56, 189, 248, 0.3)" }
                      : undefined
                  }
                >
                  {date}
                </p>
              )}
            </div>
            {/* Description - directly below title/date */}
            <p
              className={cn(
                "text-[11px] text-pretty leading-snug",
                isNoirGlass
                  ? isDark
                    ? "text-white/80"
                    : "text-slate-600"
                  : "text-text-muted"
              )}
              style={
                isNoirGlass && isDark
                  ? { textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }
                  : undefined
              }
            >
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
                className={cn(
                  "flex items-center justify-center transition-all duration-200",
                  "hover:-translate-x-px hover:-translate-y-px",
                  "w-[23%] aspect-square rounded-xs overflow-hidden cursor-pointer",
                  isNoirGlass
                    ? ""
                    : "border-2 border-border-strong bg-secondary-subtle shadow-sm hover:shadow-md"
                )}
                style={
                  isNoirGlass
                    ? isDark
                      ? {
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)`,
                          backdropFilter: "blur(10px) saturate(150%)",
                          WebkitBackdropFilter: "blur(10px) saturate(150%)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          boxShadow: `
                            0 4px 16px rgba(0, 0, 0, 0.2),
                            inset 0 1px 1px rgba(255, 255, 255, 0.2)
                          `,
                        }
                      : {
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)`,
                          backdropFilter: "blur(10px) saturate(150%)",
                          WebkitBackdropFilter: "blur(10px) saturate(150%)",
                          border: "1px solid rgba(14, 165, 233, 0.2)",
                          boxShadow: `
                            0 4px 12px rgba(0, 0, 0, 0.08),
                            inset 0 1px 1px rgba(255, 255, 255, 0.8)
                          `,
                        }
                    : undefined
                }
                onClick={() => handleImageClick(i)}
              >
                {imageUrl ? (
                  <OptimizedImage
                    src={imageUrl}
                    alt={`${title} image ${i + 1}`}
                    className="w-full h-full object-cover"
                    sizes="23vw"
                    width={200}
                    height={200}
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
      <div className="hidden md:flex flex-col gap-4 xl:gap-5">
        <div className="flex flex-row items-center justify-between gap-3 lg:gap-4 xl:gap-5">
          {/* Icon and Text - stays visible always */}
          <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-4 min-w-0 flex-1 text-left">
            <div
              className={cn(
                "shrink-0 rounded-full flex items-center justify-center w-12 h-12 xl:w-14 xl:h-14",
                "transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5",
                isNoirGlass
                  ? "liquid-glass-icon"
                  : "border-[3px] border-border-strong bg-surface-accent shadow-md hover:shadow-lg"
              )}
              style={
                isNoirGlass
                  ? isDark
                    ? {
                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)`,
                        backdropFilter: "blur(12px) saturate(180%)",
                        WebkitBackdropFilter: "blur(12px) saturate(180%)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: `
                          0 4px 20px rgba(0, 0, 0, 0.25),
                          0 0 15px rgba(56, 189, 248, 0.15),
                          inset 0 1px 1px rgba(255, 255, 255, 0.35)
                        `,
                      }
                    : {
                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)`,
                        backdropFilter: "blur(12px) saturate(180%)",
                        WebkitBackdropFilter: "blur(12px) saturate(180%)",
                        border: "1px solid rgba(14, 165, 233, 0.25)",
                        boxShadow: `
                          0 4px 16px rgba(0, 0, 0, 0.1),
                          inset 0 1px 1px rgba(255, 255, 255, 0.9)
                        `,
                      }
                  : undefined
              }
            >
              {image ? (
                <OptimizedImage
                  src={image}
                  alt={typeof title === "string" ? title : "Job"}
                  className="w-full h-full object-contain rounded-full"
                  sizes="(min-width: 1280px) 56px, 48px"
                  width={56}
                  height={56}
                />
              ) : Icon ? (
                <Icon className="text-accent w-6 h-6 xl:w-7 xl:h-7" strokeWidth={2.5} />
              ) : null}
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <ThemedHeading
                as="h3"
                className="text-lg lg:text-xl xl:text-2xl font-bold text-text leading-tight text-pretty"
              >
                {title}
              </ThemedHeading>
              {date && (
                <p
                  className={cn(
                    "text-xs lg:text-xs xl:text-sm mt-0.5",
                    isNoirGlass
                      ? isDark
                        ? "text-sky-300/80"
                        : "text-sky-700"
                      : "text-text-muted"
                  )}
                  style={
                    isNoirGlass && isDark
                      ? { textShadow: "0 0 6px rgba(56, 189, 248, 0.3)" }
                      : undefined
                  }
                >
                  {date}
                </p>
              )}
              <p
                className={cn(
                  "text-xs lg:text-sm xl:text-base text-pretty max-w-md lg:max-w-lg xl:max-w-xl mt-0.5",
                  isNoirGlass
                    ? isDark
                      ? "text-white/80"
                      : "text-slate-600"
                    : "text-text-muted"
                )}
                style={
                  isNoirGlass && isDark
                    ? { textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }
                    : undefined
                }
              >
                {description}
              </p>
            </div>
          </div>

          {/* Images - always show 3 small blurred images */}
          {/* <div className="flex gap-8 shrink-0">
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
                  variants={disableAnimations ? undefined : imageVariants}
                  {...(disableAnimations
                    ? {}
                    : {
                        initial: "initial",
                        animate: isHovered
                          ? "hovered"
                          : isOtherHovered
                          ? "otherHovered"
                          : "initial",
                        transition: { duration: 0.2 },
                      })}
                  onClick={() => handleImageClick(i)}
                  onMouseEnter={() => handleImageHover(i)}
                  onMouseLeave={() => handleImageHover(null)}
                  layoutId={
                    disableAnimations || isSelected
                      ? undefined
                      : `image-${jobIndex}-${i}`
                  }
                >
                  {imageUrl ? (
                    <OptimizedImage
                      src={imageUrl}
                      basePath={imageUrl}
                      alt={`${title} image ${i + 1}`}
                      className="w-full h-full object-cover"
                      sizes="80px"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <span className="text-xs font-mono text-text-subtle">
                      16×16
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}
