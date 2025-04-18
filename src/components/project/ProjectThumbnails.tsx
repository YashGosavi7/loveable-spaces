
import { useRef, useEffect, useState } from "react";
import OptimizedImage from "../OptimizedImage";
import { Project } from "@/data/projectsData";

interface ProjectThumbnailsProps {
  project: Project;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ProjectThumbnails = ({ 
  project, 
  activeImageIndex, 
  setActiveImageIndex,
  scrollContainerRef
}: ProjectThumbnailsProps) => {
  const hasScrolled = useRef(false);
  const [visibleRange, setVisibleRange] = useState({start: 0, end: 5}); // Only load visible thumbnails plus a buffer

  // Initial scroll setup
  useEffect(() => {
    if (scrollContainerRef.current && !hasScrolled.current) {
      // Initial scroll to first thumbnail
      hasScrolled.current = true;
    }
  }, [scrollContainerRef]);

  // Smart visibility detection for thumbnails
  useEffect(() => {
    if (scrollContainerRef.current) {
      const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        
        // Calculate which thumbnails should be in the visible range (with buffer)
        const thumbnailWidth = 36; // Approximate width in pixels
        const gap = 3; // Gap between thumbnails
        const startIndex = Math.max(0, Math.floor(scrollLeft / (thumbnailWidth + gap)) - 2);
        const visibleCount = Math.ceil(containerWidth / (thumbnailWidth + gap)) + 4;
        const endIndex = Math.min(project.images.length - 1, startIndex + visibleCount);
        
        setVisibleRange({start: startIndex, end: endIndex});
      };
      
      // Call once to set initial visible range
      handleScroll();
      
      // Add scroll listener
      scrollContainerRef.current.addEventListener('scroll', handleScroll, {passive: true});
      
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [project.images.length, scrollContainerRef]);

  // Smart scrolling to active thumbnail
  useEffect(() => {
    if (scrollContainerRef.current) {
      const thumbnails = scrollContainerRef.current.querySelectorAll(".thumbnail");
      if (thumbnails[activeImageIndex]) {
        const thumbnail = thumbnails[activeImageIndex] as HTMLElement;
        const container = scrollContainerRef.current;
        const scrollLeft = thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeImageIndex, scrollContainerRef]);

  // Only show thumbnails that are likely to be visible
  const shouldRenderThumbnail = (index: number) => {
    // Always render the active thumbnail
    if (index === activeImageIndex) return true;
    
    // Render thumbnails in the visible range plus buffer
    return index >= visibleRange.start && index <= visibleRange.end;
  };

  return (
    <section className="bg-darkGray/95 py-6">
      <div className="container mx-auto">
        <div 
          className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar" 
          ref={scrollContainerRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          aria-label="Project image thumbnails"
        >
          {project.images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-28 md:w-36 h-20 overflow-hidden thumbnail ${
                index === activeImageIndex ? "ring-2 ring-roseGold" : "ring-1 ring-white/20"
              }`}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`View image ${index + 1} of ${project.images.length}`}
              aria-current={index === activeImageIndex ? "true" : "false"}
            >
              {shouldRenderThumbnail(index) ? (
                <OptimizedImage 
                  src={image} 
                  alt={`${project.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={144}
                  height={80}
                  // Prioritize the active thumbnail and adjacent ones
                  priority={index === activeImageIndex}
                  preload={Math.abs(index - activeImageIndex) < 2}
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
    </section>
  );
};

export default ProjectThumbnails;
