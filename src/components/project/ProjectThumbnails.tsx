
import { useRef, useEffect, useState, useCallback } from "react";
import OptimizedImage from "../OptimizedImage";
import { Project } from "@/data/projectsData";
import { getOptimalImageDimensions } from "@/utils/imageUtils";

interface ProjectThumbnailsProps {
  project: Project;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  orientation?: "horizontal" | "vertical";
}

const ProjectThumbnails = ({ 
  project, 
  activeImageIndex, 
  setActiveImageIndex,
  scrollContainerRef,
  orientation = "horizontal"
}: ProjectThumbnailsProps) => {
  const hasScrolled = useRef(false);
  const [visibleRange, setVisibleRange] = useState({start: 0, end: 7}); // Increased buffer
  
  // Determine the optimal dimensions for thumbnails based on device
  const getThumbnailDimensions = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
    
    return {
      width: orientation === "vertical" ? 100 : 350,
      height: orientation === "vertical" ? 75 : 263
    };
  }, [orientation]);
  
  const { width, height } = getThumbnailDimensions();

  // Initial scroll setup
  useEffect(() => {
    if (scrollContainerRef.current && !hasScrolled.current) {
      // Initial scroll to first thumbnail
      hasScrolled.current = true;
    }
  }, [scrollContainerRef]);

  // Super aggressive visibility detection for thumbnails with larger buffers
  useEffect(() => {
    if (scrollContainerRef.current) {
      const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        
        // Calculate which thumbnails should be in the visible range (with larger buffer)
        const thumbnailWidth = 100; // Thumbnail width in pixels (increased as per requirements)
        const gap = 10; // Gap between thumbnails (increased as per requirements)
        const startIndex = Math.max(0, Math.floor(scrollLeft / (thumbnailWidth + gap)) - 4); // Larger buffer
        const visibleCount = Math.ceil(containerWidth / (thumbnailWidth + gap)) + 8; // Larger buffer
        const endIndex = Math.min(project.images.length - 1, startIndex + visibleCount);
        
        setVisibleRange({start: startIndex, end: endIndex});
      };
      
      // Call once to set initial visible range
      handleScroll();
      
      // Add scroll listener with passive flag for better performance
      scrollContainerRef.current.addEventListener('scroll', handleScroll, {passive: true});
      
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [project.images.length, scrollContainerRef]);

  // Smart scrolling to active thumbnail with improved animation
  useEffect(() => {
    if (scrollContainerRef.current) {
      const thumbnails = scrollContainerRef.current.querySelectorAll(".thumbnail");
      if (thumbnails[activeImageIndex]) {
        const thumbnail = thumbnails[activeImageIndex] as HTMLElement;
        const container = scrollContainerRef.current;
        
        // Better centering logic - different for vertical and horizontal
        let scrollPosition;
        
        if (orientation === "vertical") {
          scrollPosition = thumbnail.offsetTop - (container.clientHeight - thumbnail.clientHeight) / 2;
          
          // Use smooth scrolling with RAF for better performance
          const startPosition = container.scrollTop;
          const targetPosition = scrollPosition;
          const distance = targetPosition - startPosition;
          const duration = 300; // ms
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother motion
            const easeInOutCubic = progress < 0.5 
              ? 4 * progress * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = startPosition + distance * easeInOutCubic;
            }
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
        } else {
          // Original horizontal scrolling logic
          const scrollLeft = thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2;
          
          const startPosition = container.scrollLeft;
          const targetPosition = scrollLeft;
          const distance = targetPosition - startPosition;
          const duration = 300; // ms
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother motion
            const easeInOutCubic = progress < 0.5 
              ? 4 * progress * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollLeft = startPosition + distance * easeInOutCubic;
            }
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      }
    }
  }, [activeImageIndex, scrollContainerRef, orientation]);

  // Smarter decision on which thumbnails to render
  const shouldRenderThumbnail = (index: number) => {
    // Always render the active thumbnail and those near it
    if (Math.abs(index - activeImageIndex) <= 2) return true;
    
    // Render thumbnails in the visible range plus buffer
    return index >= visibleRange.start && index <= visibleRange.end;
  };
  
  // Get project-specific styling
  const getProjectStyles = () => {
    if (project.id === "bhushan-naikwadi-elegant-abode") {
      return {
        activeBorderClass: "ring-2 ring-roseGold"
      };
    }
    return {
      activeBorderClass: "ring-2 ring-roseGold"
    };
  };
  
  const { activeBorderClass } = getProjectStyles();

  return (
    <div className={`bg-darkGray/95 p-2 ${
      orientation === "vertical" ? "h-[calc(100vh-300px)] overflow-y-auto" : "py-6"
    }`}>
      <div 
        className={`${
          orientation === "vertical" 
            ? "flex flex-col gap-3 overflow-y-auto hide-scrollbar scroll-smooth" 
            : "flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth"
        }`}
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-label="Project image thumbnails"
      >
        {project.images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 ${
              orientation === "vertical" 
                ? "w-[100px] h-[75px] mb-3" 
                : "w-[100px] md:w-[100px] h-[75px] md:h-[75px]"
            } overflow-hidden thumbnail ${
              index === activeImageIndex ? activeBorderClass : "ring-1 ring-white/20"
            } rounded-md ${orientation === "horizontal" ? "mr-[10px]" : ""}`}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`View image ${index + 1} of ${project.images.length}`}
            aria-current={index === activeImageIndex ? "true" : "false"}
            style={{
              transition: 'all 0.2s ease-out'
            }}
            tabIndex={0}
          >
            {shouldRenderThumbnail(index) ? (
              <OptimizedImage 
                src={image} 
                alt={`Interior design thumbnail ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                width={100}
                height={75}
                // Higher priority for active and nearby thumbnails
                priority={index === activeImageIndex}
                preload={Math.abs(index - activeImageIndex) < 3}
                // Skip lazy loading for active and nearby thumbnails
                skipLazyLoading={Math.abs(index - activeImageIndex) < 2}
                // Progressive quality loading
                quality={Math.abs(index - activeImageIndex) < 2 ? "high" : "medium"}
              />
            ) : (
              // Just show a placeholder for thumbnails that are far from view
              <div 
                className="w-full h-full bg-darkGray/30"
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectThumbnails;
