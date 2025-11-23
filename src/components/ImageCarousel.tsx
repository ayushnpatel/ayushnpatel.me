import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  startIndex?: number;
  onImageClick: (index: number) => void;
  selectedIndex?: number;
  altPrefix?: string;
  showAll?: boolean;
}

export function ImageCarousel({
  images,
  startIndex = 3,
  onImageClick,
  selectedIndex,
  altPrefix = "Image",
  showAll = false,
}: ImageCarouselProps) {
  const [carouselOffset, setCarouselOffset] = useState(0);
  
  // Get images from startIndex onward, or all images if showAll is true
  const carouselImages = showAll ? images : images.slice(startIndex);
  
  if (carouselImages.length === 0) {
    return null;
  }

  // Responsive visible count
  const visibleCountDesktop = 5;
  const visibleCountMobile = 3;
  
  const maxOffset = Math.max(0, carouselImages.length - visibleCountDesktop);

  const handlePrevious = () => {
    setCarouselOffset(Math.max(0, carouselOffset - 1));
  };

  const handleNext = () => {
    setCarouselOffset(Math.min(maxOffset, carouselOffset + 1));
  };

  // Show right arrow only if total images > 10
  const showRightArrow = images.length > 10;
  
  // Show left arrow only if user has scrolled (offset > 0)
  const showLeftArrow = carouselOffset > 0;

  const imageVariants = {
    initial: {
      filter: "blur(0px)",
      opacity: 1,
    },
    hovered: {
      filter: "blur(0px)",
      opacity: 1,
    },
    selected: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1.05,
    },
  };

  return (
    <div className="w-full max-w-5xl flex items-center gap-3">
      {/* Left Arrow - only show if user has scrolled */}
      {showLeftArrow && (
        <button
          onClick={handlePrevious}
          className="shrink-0 w-8 h-8 flex items-center justify-center
                     border-2 border-border-strong bg-surface
                     rounded-full shadow-sm hover:shadow-md
                     transition-all duration-200
                     hover:scale-110 active:scale-95"
          aria-label="Previous images"
        >
          <ChevronLeft className="w-4 h-4 text-text" />
        </button>
      )}

      {/* Carousel Container */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          className="flex gap-3"
          animate={{
            x: `${-carouselOffset * (64 + 12)}px`, // 64px width + 12px gap
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {carouselImages.map((imageUrl, i) => {
            const actualIndex = showAll ? i : startIndex + i;
            const isSelected = selectedIndex === actualIndex;
            
            return (
              <motion.div
                key={actualIndex}
                className="border-2 border-border-strong
                           bg-secondary-subtle
                           flex items-center justify-center
                           shadow-sm hover:shadow-md
                           w-16 h-16 aspect-square rounded-xs cursor-pointer
                           shrink-0 overflow-hidden"
                variants={imageVariants}
                initial="initial"
                whileHover="hovered"
                animate={isSelected ? "selected" : "initial"}
                onClick={() => onImageClick(actualIndex)}
                transition={{ duration: 0.2 }}
                style={{
                  opacity: showAll ? (isSelected ? 1 : 0.9) : undefined,
                }}
              >
                <img
                  src={imageUrl}
                  alt={`${altPrefix} ${actualIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right Arrow - only show if total images > 10 */}
      {showRightArrow && (
        <button
          onClick={handleNext}
          disabled={carouselOffset >= maxOffset}
          className="shrink-0 w-8 h-8 flex items-center justify-center
                     border-2 border-border-strong bg-surface
                     rounded-full shadow-sm hover:shadow-md
                     transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed
                     hover:scale-110 active:scale-95"
          aria-label="Next images"
        >
          <ChevronRight className="w-4 h-4 text-text" />
        </button>
      )}
    </div>
  );
}

