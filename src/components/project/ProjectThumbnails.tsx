
import { useRef, useEffect, useState } from "react";
import OptimizedImage from "../OptimizedImage";
import { Project } from "@/data/projectsData";

interface ProjectThumbnailsProps {
  project: Project;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  orientation?: "horizontal" | "vertical";
  onThumbnailClick?: (index: number) => void;
}

const BATCH_SIZE = 6; // Increased for projects with many images

const ProjectThumbnails = ({ 
  project, 
  activeImageIndex, 
  setActiveImageIndex,
  scrollContainerRef,
  orientation = "horizontal",
  onThumbnailClick
}: ProjectThumbnailsProps) => {
  const [loadedCount, setLoadedCount] = useState(Math.min(BATCH_SIZE, project.images.length));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastThumbnailRef = useRef<HTMLButtonElement | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  
  // Thumbnail dimensions
  const { width, height } = isMobile 
    ? { width: 60, height: 45 }
    : { width: 80, height: 60 };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
    if (onThumbnailClick) {
      onThumbnailClick(index);
    }
  };

  // Load more thumbnails as user scrolls
  useEffect(() => {
    if (orientation !== "horizontal" || project.images.length <= loadedCount) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && loadedCount < project.images.length) {
        const nextBatch = isMobile ? 4 : BATCH_SIZE;
        setLoadedCount(prevCount => Math.min(prevCount + nextBatch, project.images.length));
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, { 
      root: scrollContainerRef.current,
      threshold: 0.1,
      rootMargin: isMobile ? "0px 0px 0px 30px" : "0px 0px 0px 100px"
    });

    const currentObserver = observerRef.current;
    const currentLastThumbnail = lastThumbnailRef.current;

    if (currentLastThumbnail) {
      currentObserver.observe(currentLastThumbnail);
    }

    return () => {
      if (currentLastThumbnail) {
        currentObserver.unobserve(currentLastThumbnail);
      }
      currentObserver.disconnect();
    };
  }, [loadedCount, project.images.length, scrollContainerRef, orientation, isMobile]);

  // Auto-scroll to active thumbnail
  useEffect(() => {
    if (scrollContainerRef.current && loadedCount > activeImageIndex) {
      const thumbnails = scrollContainerRef.current.querySelectorAll(".thumbnail");
      if (thumbnails[activeImageIndex]) {
        const thumbnail = thumbnails[activeImageIndex] as HTMLElement;
        const container = scrollContainerRef.current;
        
        let scrollPosition;
        const scrollOptions: ScrollToOptions = { behavior: isMobile ? "auto" : "smooth" };

        if (orientation === "vertical") {
          scrollPosition = thumbnail.offsetTop - (container.clientHeight - thumbnail.clientHeight) / 2;
          container.scrollTo({ ...scrollOptions, top: scrollPosition });
        } else {
          scrollPosition = thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2;
          container.scrollTo({ ...scrollOptions, left: scrollPosition });
        }
      }
    }
  }, [activeImageIndex, scrollContainerRef, orientation, loadedCount, isMobile]);

  const projectStyles = {
    activeBorderClass: "ring-2 ring-roseGold"
  };

  const imagesToDisplay = project.images.slice(0, loadedCount);

  return (
    <div className={`bg-darkGray/95 p-2 ${
      orientation === "vertical" ? "h-[calc(100vh-300px)] overflow-y-auto" : "py-2"
    }`}>
      <div 
        className={`${
          orientation === "vertical" 
            ? "flex flex-col gap-2 overflow-y-auto hide-scrollbar" 
            : "flex gap-2 overflow-x-auto hide-scrollbar"
        }`}
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-label="Project image thumbnails"
      >
        {imagesToDisplay.map((image, index) => (
          <button
            key={index}
            ref={index === imagesToDisplay.length - 1 ? lastThumbnailRef : null}
            className={`flex-shrink-0 thumbnail ${
              orientation === "vertical" 
                ? `w-[${width}px] h-[${height}px] mb-2` 
                : `w-[${width}px] h-[${height}px]`
            } overflow-hidden ${
              index === activeImageIndex ? projectStyles.activeBorderClass : "ring-1 ring-white/20"
            } rounded-md transition-all ${isMobile ? 'duration-75' : 'duration-150'} ease-out`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1} of ${project.images.length}`}
            aria-current={index === activeImageIndex ? "true" : "false"}
            tabIndex={0}
          >
            <OptimizedImage 
              src={image} 
              alt={`${project.title} project gallery image ${index + 1}`}
              className={`w-full h-full object-cover ${isMobile ? 'hover:scale-102' : 'hover:scale-105'} transition-transform ${isMobile ? 'duration-100' : 'duration-200'}`}
              width={width}
              height={height}
              priority={index < (isMobile ? 3 : BATCH_SIZE)}
              preload={index < (isMobile ? 4 : BATCH_SIZE * 2)}
              skipLazyLoading={index < (isMobile ? 3 : BATCH_SIZE)}
              quality={isMobile ? "low" : "low"}
              format="webp"
            />
          </button>
        ))}
        
        {/* Loading indicator for remaining thumbnails */}
        {loadedCount < project.images.length && (
          <div className="flex-shrink-0 w-[80px] h-[60px] bg-darkGray/50 rounded-md flex items-center justify-center">
            <div className="text-white/70 text-xs">+{project.images.length - loadedCount}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectThumbnails;
