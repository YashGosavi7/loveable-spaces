
import { useRef, useEffect, useState, useCallback } from "react";
import OptimizedImage from "../OptimizedImage";
import { Project } from "@/data/projectsData";

interface ProjectThumbnailsProps {
  project: Project;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  orientation?: "horizontal" | "vertical";
}

const BATCH_SIZE = 4; // Increased batch size for better performance

const ProjectThumbnails = ({ 
  project, 
  activeImageIndex, 
  setActiveImageIndex,
  scrollContainerRef,
  orientation = "horizontal"
}: ProjectThumbnailsProps) => {
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastThumbnailRef = useRef<HTMLButtonElement | null>(null);

  // Smaller thumbnail dimensions for faster loading
  const { width, height } = { width: 80, height: 60 }; // Reduced from 100x75

  useEffect(() => {
    if (orientation !== "horizontal" || project.images.length <= loadedCount) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && loadedCount < project.images.length) {
        setLoadedCount(prevCount => Math.min(prevCount + BATCH_SIZE, project.images.length));
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, { 
      root: scrollContainerRef.current,
      threshold: 0.1,
      rootMargin: "0px 0px 0px 50px" // Reduced margin
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
  }, [loadedCount, project.images.length, scrollContainerRef, orientation]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const thumbnails = scrollContainerRef.current.querySelectorAll(".thumbnail");
      if (thumbnails[activeImageIndex]) {
        const thumbnail = thumbnails[activeImageIndex] as HTMLElement;
        const container = scrollContainerRef.current;
        
        let scrollPosition;
        const scrollOptions: ScrollToOptions = { behavior: "smooth" };

        if (orientation === "vertical") {
          scrollPosition = thumbnail.offsetTop - (container.clientHeight - thumbnail.clientHeight) / 2;
          container.scrollTo({ ...scrollOptions, top: scrollPosition });
        } else {
          scrollPosition = thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2;
          container.scrollTo({ ...scrollOptions, left: scrollPosition });
        }
      }
    }
  }, [activeImageIndex, scrollContainerRef, orientation, loadedCount]);

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
                ? "w-[80px] h-[60px] mb-2" 
                : "w-[80px] h-[60px]"
            } overflow-hidden ${
              index === activeImageIndex ? projectStyles.activeBorderClass : "ring-1 ring-white/20"
            } rounded-md transition-all duration-150 ease-out`} // Faster transition
            onClick={() => setActiveImageIndex(index)}
            aria-label={`View image ${index + 1} of ${project.images.length}`}
            aria-current={index === activeImageIndex ? "true" : "false"}
            tabIndex={0}
          >
            <OptimizedImage 
              src={image} 
              alt={`Balaji Design Studio project gallery image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" // Reduced scale and faster transition
              width={width}
              height={height}
              priority={index < BATCH_SIZE}
              preload={index < BATCH_SIZE * 2}
              skipLazyLoading={index < BATCH_SIZE}
              quality="low" // Ultra-aggressive quality for thumbnails
              format="webp"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectThumbnails;
