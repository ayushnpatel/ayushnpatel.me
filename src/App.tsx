import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { Job } from "./components/Job";
import { Code, Briefcase, Rocket, Zap } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { Vignette } from "./components/Vignette";
import { AnimatedYear } from "./components/AnimatedYear";
import { Pagination } from "./components/Pagination";
import { ImageCarousel } from "./components/ImageCarousel";
import { Socials } from "./components/Socials";
import pltrImage from "./assets/pltr.png";
import capitalOneImage from "./assets/capital-one-icon.png";
import snackpassImage from "./assets/snackpass.png";
// Import the job image directly - Bun will handle this
import palantirJobImage from "./assets/job/palantir/IMG_8104.png";

const JOBS = [
  {
    image: pltrImage,
    title: "fde @ palantir",
    date: "may 2025 - present",
    description:
      "platform forward deployed engineer, multi-tenancy and governance features working with AI startups for financial service companies",
    imageCount: 3,
    showDivider: false,
    index: 0,
    showCarousel: true,
    imageUrls: [palantirJobImage, palantirJobImage, palantirJobImage],
    captions: [
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
    ],
  },
  {
    image: capitalOneImage,
    title: "swe @ capital one",
    date: "jun 2023 - may 2025",
    description:
      "CRUD engineer, created net-new APIs in golang achieving 3000+ TPS modernizing the account + transaction data systems, various extracurriculars",
    imageCount: 3,
    showDivider: true,
    index: 1,
    showCarousel: false,
    imageUrls: [palantirJobImage, palantirJobImage, palantirJobImage],
    captions: [
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
    ],
  },
  {
    image: snackpassImage,
    title: "intern @ snackpass",
    date: "spring 2023 - summer 2023",
    description:
      "worked on 4 stacks — kiosk apps, ios + android app, web app, backend. lasting features amongst all of them — including current promotion system",
    imageCount: 3,
    showDivider: true,
    index: 2,
    showCarousel: false,
    imageUrls: [palantirJobImage, palantirJobImage, palantirJobImage],
    captions: [
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
      "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
    ],
  },
];

export function App() {
  const { isDark, toggleTheme, colorTheme, setColorTheme } = useTheme();
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<{
    jobIndex: number;
    imageIndex: number;
  } | null>(null);

  // Handle escape key to close expanded state
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          // Exit fullscreen
          setIsFullscreen(false);
          setSelectedJob(null);
          setSelectedImageIndex(null);
        } else if (selectedJob !== null) {
          // Exit large image view back to normal (desktop)
          setSelectedJob(null);
          setSelectedImageIndex(null);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedJob, isFullscreen]);

  const handleImageClick = (jobIndex: number, imageIndex: number) => {
    // Check if we're on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // On mobile, go directly to fullscreen
      if (
        isFullscreen &&
        selectedJob === jobIndex &&
        selectedImageIndex === imageIndex
      ) {
        // Clicking the same image again closes fullscreen
        setIsFullscreen(false);
        setSelectedJob(null);
        setSelectedImageIndex(null);
      } else {
        setSelectedJob(jobIndex);
        setSelectedImageIndex(imageIndex);
        setIsFullscreen(true);
      }
    } else {
      // On desktop, use the expanded view first
      if (selectedJob === jobIndex && selectedImageIndex === imageIndex) {
        // Clicking the same image again closes it
        setSelectedJob(null);
        setSelectedImageIndex(null);
      } else {
        setSelectedJob(jobIndex);
        setSelectedImageIndex(imageIndex);
      }
    }
  };

  const handleImageHover = (jobIndex: number, imageIndex: number | null) => {
    if (imageIndex !== null) {
      setHoveredImage({ jobIndex, imageIndex });
    } else {
      setHoveredImage(null);
    }
  };

  const handleMainClick = () => {
    if (isFullscreen) {
      // Exit fullscreen
      setIsFullscreen(false);
      setSelectedJob(null);
      setSelectedImageIndex(null);
    } else if (selectedJob !== null) {
      // Exit large image view back to normal (desktop)
      setSelectedJob(null);
      setSelectedImageIndex(null);
    }
  };

  const handleLargeImageClick = () => {
    setIsFullscreen(true);
  };

  return (
    <div
      className="min-h-screen bg-background transition-colors duration-500 noise"
      onClick={handleMainClick}
    >
      <Vignette colorTheme={colorTheme} intensity={0.4} isDark={isDark} />
      <Header
        isDark={isDark}
        onThemeToggle={toggleTheme}
        colorTheme={colorTheme}
        onColorChange={setColorTheme}
      />

      <main className="pt-24 sm:pt-32 pb-10 px-8 sm:px-12 lg:px-12 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-text mb-4 text-balance">
            ayush patel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto text-pretty">
            <AnimatedYear />
          </p>
          <div className="mt-4">
            <Socials />
          </div>
        </div>

        {/* Jobs Section */}
        <div className="space-y-8 md:space-y-24 relative z-50">
          <AnimatePresence mode="popLayout">
            {JOBS.map((job, index) => {
              const isSelected = selectedJob === job.index;
              const isAbove = selectedJob !== null && job.index < selectedJob;
              const shouldShow = selectedJob === null || isSelected;

              return shouldShow ? (
                <motion.div key={job.index} className="relative">
                  {/* Dotted divider - show between jobs */}
                  {index > 0 && (
                    <div className="absolute top-0 left-0 right-0 job-divider" />
                  )}
                  <Job
                    image={job.image}
                    title={job.title}
                    date={job.date}
                    description={job.description}
                    imageCount={job.imageCount}
                    showDivider={false}
                    jobIndex={job.index}
                    isExpanded={isSelected}
                    selectedImageIndex={isSelected ? selectedImageIndex : null}
                    onImageClick={handleImageClick}
                    hoveredImage={hoveredImage}
                    onImageHover={handleImageHover}
                    isAbove={isAbove}
                    imageUrls={job.imageUrls}
                    captions={job.captions}
                    showCarousel={job.showCarousel}
                  />
                  {/* Large Image Row - appears below selected job */}
                  {isSelected &&
                    selectedImageIndex !== null &&
                    !isFullscreen && (
                      <motion.div
                        key={`expanded-${job.index}`}
                        className="w-full max-w-5xl mx-auto hidden md:flex flex-col gap-8 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Large Image and Caption */}
                        <div className="flex items-center gap-8 lg:gap-12">
                          {/* Large Image */}
                          <motion.div
                            className="border-2 border-border-strong
                                     bg-secondary-subtle
                                     flex items-center justify-center
                                     shadow-lg
                                     w-[400px] h-[400px] aspect-square rounded-xs shrink-0 cursor-pointer overflow-hidden"
                            layoutId={`large-image-${job.index}-${selectedImageIndex}`}
                            initial={{ scale: 0.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.2, opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            onClick={handleLargeImageClick}
                          >
                            {job.imageUrls[selectedImageIndex] ? (
                              <img
                                src={job.imageUrls[selectedImageIndex]}
                                alt={`${job.title} image ${
                                  selectedImageIndex + 1
                                }`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-3xl font-mono text-text font-bold">
                                16×16
                              </span>
                            )}
                          </motion.div>

                          {/* Caption - centered vertically and horizontally */}
                          <div className="flex-1 flex items-center justify-center">
                            <motion.div
                              className="text-base lg:text-lg text-text-muted text-center max-w-md"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                            >
                              {job.captions[selectedImageIndex]}
                            </motion.div>
                          </div>
                        </div>

                        {/* Carousel for additional images (4+) */}
                        {job.showCarousel && job.imageUrls.length > 3 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                          >
                            <ImageCarousel
                              images={job.imageUrls}
                              startIndex={3}
                              onImageClick={(index) =>
                                handleImageClick(job.index, index)
                              }
                              selectedIndex={selectedImageIndex}
                              altPrefix={job.title}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {isFullscreen &&
          selectedJob !== null &&
          selectedImageIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-100 flex flex-col items-center justify-center gap-4 md:gap-8 px-4 md:px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleMainClick}
            >
              {(() => {
                const currentJob = JOBS[selectedJob];
                const imageUrl = currentJob?.imageUrls[selectedImageIndex];
                // Limit to first imageCount images for fullscreen carousel
                const carouselImages =
                  currentJob?.imageUrls.slice(0, currentJob.imageCount) || [];
                return (
                  <div
                    className="flex flex-col items-center md:items-start gap-4 md:gap-8 max-w-5xl w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Large Image - responsive sizing */}
                    <motion.div
                      className="border-2 border-border-strong bg-secondary-subtle flex items-center justify-center shadow-2xl rounded-xs aspect-square overflow-hidden w-[85vw] md:w-[min(70vw,70vh)]"
                      layoutId={`fullscreen-image-${selectedJob}-${selectedImageIndex}`}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`Fullscreen image ${selectedImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl md:text-6xl font-mono text-text font-bold">
                          16×16
                        </span>
                      )}
                    </motion.div>

                    {/* Caption */}
                    {currentJob?.captions[selectedImageIndex] && (
                      <motion.div
                        className="text-base md:text-lg lg:text-xl text-text-muted text-center md:text-left max-w-2xl px-4 md:px-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        {currentJob.captions[selectedImageIndex]}
                      </motion.div>
                    )}

                    {/* Carousel for all images in fullscreen */}
                    {carouselImages.length > 0 && (
                      <motion.div
                        className="w-full px-4 md:px-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <ImageCarousel
                          images={carouselImages}
                          startIndex={0}
                          onImageClick={(index) => {
                            setSelectedImageIndex(index);
                          }}
                          selectedIndex={selectedImageIndex}
                          altPrefix={currentJob.title}
                          showAll={true}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}
      </AnimatePresence>

      {/* <Pagination /> */}
    </div>
  );
}
