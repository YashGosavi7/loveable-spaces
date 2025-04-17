
import { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (scrollContainerRef.current && !hasScrolled.current) {
      // Initial scroll to first thumbnail
      hasScrolled.current = true;
    }
  }, [scrollContainerRef]);

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
              <OptimizedImage 
                src={image} 
                alt={`${project.title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                width={144}
                height={80}
                // Only prioritize the visible thumbnails
                priority={Math.abs(index - activeImageIndex) < 3}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectThumbnails;
