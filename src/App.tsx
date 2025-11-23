import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { Job } from "./components/Job";
import { Code, Briefcase, Rocket, Zap } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { Vignette } from "./components/Vignette";
import { AnimatedYear } from "./components/AnimatedYear";
import { Pagination } from "./components/Pagination";
import pltrImage from "./assets/pltr.png";
import capitalOneImage from "./assets/capital-one-icon.png";
import snackpassImage from "./assets/snackpass.png";
// Import the job image directly - Bun will handle this
import palantirJobImage from "../public/job/palantir/IMG_8104.png";

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
          // Exit fullscreen back to large image view
          setIsFullscreen(false);
        } else if (selectedJob !== null) {
          // Exit large image view back to normal
          setSelectedJob(null);
          setSelectedImageIndex(null);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedJob, isFullscreen]);

  const handleImageClick = (jobIndex: number, imageIndex: number) => {
    if (selectedJob === jobIndex && selectedImageIndex === imageIndex) {
      // Clicking the same image again closes it
      setSelectedJob(null);
      setSelectedImageIndex(null);
    } else {
      setSelectedJob(jobIndex);
      setSelectedImageIndex(imageIndex);
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
      // Exit fullscreen back to large image view
      setIsFullscreen(false);
    } else if (selectedJob !== null) {
      // Exit large image view back to normal
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

      <main className="pt-24 sm:pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-text mb-4 text-balance">
            ayush patel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto text-pretty">
            <AnimatedYear /> 🚀
            <br /> reach out at{" "}
            <a
              href="mailto:ayushnpatel@gmail.com"
              className="underline font-bold text-text hover:text-accent transition-colors"
            >
              ayushnpatel@gmail.com
            </a>
          </p>
        </div>

        {/* Jobs Section */}
        <div className="space-y-16 md:space-y-24 relative z-50">
          <AnimatePresence mode="popLayout">
            {[
              {
                image: pltrImage,
                title: "fde @ palantir",
                date: "may 2025 - present",
                description:
                  "platform forward deployed engineer, multi-tenancy and governance features working with AI startups for financial service companies",
                imageCount: 3,
                showDivider: false,
                index: 0,
                imageUrls: [
                  palantirJobImage,
                  palantirJobImage,
                  palantirJobImage,
                ],
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
                imageUrls: [
                  palantirJobImage,
                  palantirJobImage,
                  palantirJobImage,
                ],
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
                imageUrls: [
                  palantirJobImage,
                  palantirJobImage,
                  palantirJobImage,
                ],
                captions: [
                  "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
                  "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
                  "enjoyed my first time trying oxtail dumplings in santa monica during an onsite in nov 2025. best meal on the trip!",
                ],
              },
            ].map((job) => {
              const isSelected = selectedJob === job.index;
              const isAbove = selectedJob !== null && job.index < selectedJob;
              const shouldShow = selectedJob === null || isSelected;

              return shouldShow ? (
                <>
                  <Job
                    key={job.index}
                    image={job.image}
                    title={job.title}
                    date={job.date}
                    description={job.description}
                    imageCount={job.imageCount}
                    showDivider={job.showDivider}
                    jobIndex={job.index}
                    isExpanded={isSelected}
                    selectedImageIndex={isSelected ? selectedImageIndex : null}
                    onImageClick={handleImageClick}
                    hoveredImage={hoveredImage}
                    onImageHover={handleImageHover}
                    isAbove={isAbove}
                    imageUrls={job.imageUrls}
                    captions={job.captions}
                  />
                  {/* Large Image Row - appears below selected job */}
                  {isSelected &&
                    selectedImageIndex !== null &&
                    !isFullscreen && (
                      <motion.div
                        key={`expanded-${job.index}`}
                        className="w-full max-w-5xl mx-auto hidden md:flex items-center gap-8 lg:gap-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        onClick={(e) => e.stopPropagation()}
                      >
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
                          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
                      </motion.div>
                    )}
                </>
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
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-100 hidden md:flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleMainClick}
            >
              {(() => {
                const jobs = [
                  {
                    imageUrls: [
                      palantirJobImage,
                      palantirJobImage,
                      palantirJobImage,
                    ],
                  },
                  {
                    imageUrls: [
                      palantirJobImage,
                      palantirJobImage,
                      palantirJobImage,
                    ],
                  },
                  {
                    imageUrls: [
                      palantirJobImage,
                      palantirJobImage,
                      palantirJobImage,
                    ],
                  },
                ];
                const currentJob = jobs[selectedJob];
                const imageUrl = currentJob?.imageUrls[selectedImageIndex];
                return (
                  <motion.div
                    className="border-2 border-border-strong
                             bg-secondary-subtle
                             flex items-center justify-center
                             shadow-2xl
                             rounded-xs max-w-[90vw] max-h-[90vh] aspect-square overflow-hidden"
                    layoutId={`fullscreen-image-${selectedJob}-${selectedImageIndex}`}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: "min(90vw, 90vh)" }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`Fullscreen image ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl font-mono text-text font-bold">
                        16×16
                      </span>
                    )}
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
      </AnimatePresence>

      {/* <Pagination /> */}
    </div>
  );
}
