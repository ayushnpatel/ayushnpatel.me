import type { ImgHTMLAttributes } from "react";

interface OptimizedImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "srcSet" | "sizes"
  > {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  basePath?: string;
}

/**
 * OptimizedImage component that handles responsive images with proper srcSet and sizes.
 *
 * The basePath should be the original image path (e.g., "./assets/image.jpg")
 * vite-imagetools will process URLs with query params at build time.
 *
 * This component constructs optimized URLs with:
 * - Multiple widths: 400, 800, 1200, 1600px
 * - Multiple formats: AVIF, WebP, JPEG (with proper fallback)
 * - Quality: 85 (visually lossless)
 * - Metadata stripped
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px",
  basePath,
  className,
  ...props
}: OptimizedImageProps) {
  // Extract base path from src (remove query params and hash).
  // If basePath is provided, use it; otherwise extract from src.
  let baseUrl: string;
  if (basePath) {
    baseUrl = basePath;
  } else {
    // Remove query params and hash so we keep the actual asset path that Vite outputs.
    baseUrl = src.split("?")[0].split("#")[0];
  }

  const quality = 85;
  const widths = [400, 800, 1200, 1600];

  // Construct srcSet URLs - these need to be static strings for vite-imagetools to process
  // Vite-imagetools will process these URLs at build time if they're static
  const buildSrcSet = (format: string) =>
    widths
      .map(
        (w) =>
          `${baseUrl}?w=${w}&format=${format}&quality=${quality}&metadata=none ${w}w`
      )
      .join(", ");

  return (
    <picture>
      {/* AVIF source - best compression */}
      <source srcSet={buildSrcSet("avif")} sizes={sizes} type="image/avif" />
      {/* WebP source - good compression */}
      <source srcSet={buildSrcSet("webp")} sizes={sizes} type="image/webp" />
      {/* JPEG fallback - universal support */}
      <img
        src={`${baseUrl}?w=1600&format=jpeg&quality=${quality}&metadata=none`}
        srcSet={buildSrcSet("jpeg")}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  );
}
