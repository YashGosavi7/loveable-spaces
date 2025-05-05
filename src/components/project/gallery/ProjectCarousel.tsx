
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/data/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../../OptimizedImage";

interface ProjectCarouselProps {
  project: Project;
  onSlideChange: (index: number) => void;
  currentSlide: number;
  navButtonClass?: string;
}

const ProjectCarousel = ({ 
  project, 
  onSlideChange, 
  currentSlide, 
  navButtonClass = "bg-roseGold/90 hover:bg-roseGold text-white" 
}: ProjectCarouselProps) => {
  const [imagesLoaded, setImagesLoaded] = useState<{[key: number]: boolean}>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Determine optimal dimensions for responsive loading
  const getImageDimensions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Optimized dimensions with exact aspect ratio
    if (isMobile) {
      return { width: 600, height: 338 }; // 16:9 aspect for mobile
    } else if (isTablet) {
      return { width: 1200, height: 675 }; // 16:9 aspect for tablet
    }
    return { width: 1800, height: 1013 }; // 16:9 aspect for desktop
  };

  // Add image preloading for smoother carousel experience
  useEffect(() => {
    // Add preload link for the current slide
    if (typeof document !== 'undefined' && project.images[currentSlide]) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = project.images[currentSlide];
      preloadLink.type = 'image/webp';
      preloadLink.fetchPriority = 'high';
      document.head.appendChild(preloadLink);
      
      // Preload next image
      const nextSlide = (currentSlide + 1) % project.images.length;
      const nextPreloadLink = document.createElement('link');
      nextPreloadLink.rel = 'prefetch';
      nextPreloadLink.as = 'image';
      nextPreloadLink.href = project.images[nextSlide];
      nextPreloadLink.type = 'image/webp';
      document.head.appendChild(nextPreloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
        document.head.removeChild(nextPreloadLink);
      };
    }
  }, [currentSlide, project.images]);

  const prevSlide = () => {
    const newIndex = currentSlide === 0 ? project.images.length - 1 : currentSlide - 1;
    onSlideChange(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentSlide === project.images.length - 1 ? 0 : currentSlide + 1;
    onSlideChange(newIndex);
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Enhanced mobile touch handlers with smoother swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantMove = Math.abs(distance) > 50; // Min distance for swipe
    
    if (isSignificantMove) {
      if (distance > 0) {
        // Swipe left, show next slide
        nextSlide();
      } else {
        // Swipe right, show previous slide
        prevSlide();
      }
    }
    
    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Check if image has loaded
  const isImageLoaded = (index: number) => {
    return !!imagesLoaded[index];
  };

  // Get appropriate sizing for different devices
  const { width, height } = getImageDimensions();

  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden rounded-lg shadow-md bg-lightGray/10 aspect-[16/9] w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 md:p-3 ${navButtonClass} opacity-80 hover:opacity-100 transition-opacity`}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 md:p-3 ${navButtonClass} opacity-80 hover:opacity-100 transition-opacity`}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Slides with smooth transitions */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentSlide} 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Main image - optimized for fast loading */}
            <OptimizedImage
              src={project.images[currentSlide]} 
              alt={`Interior design view ${currentSlide + 1} of ${project.images.length}`}
              className="w-full h-full object-contain"
              width={width}
              height={height}
              onLoad={() => handleImageLoad(currentSlide)}
              priority={true}
              quality="high"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              blur={false}
              skipLazyLoading={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Improved dots navigation with current indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {project.images.map((_, index) => (
          <button
            key={index} 
            onClick={() => onSlideChange(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-roseGold w-6' 
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
