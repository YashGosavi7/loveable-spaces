
import { useState, useEffect, useRef } from "react";
import OptimizedImage from "../OptimizedImage";
import { generatePlaceholderColor } from "@/utils/imageUtils";

interface ProjectImageThumbnailsProps {
  images: string[];
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
}

const ProjectImageThumbnails = ({
  images,
  activeImageIndex,
  onSelectImage
}: ProjectImageThumbnailsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  
  // Generate placeholder colors for each thumbnail
  const placeholderColors = images.map(image => generatePlaceholderColor(image));

  // Ensure the active thumbnail is visible by scrolling to it
  useEffect(() => {
    if (scrollContainerRef.current && images.length > 0) {
      const container = scrollContainerRef.current;
      const thumbnailWidth = 100; // Width of each thumbnail
      const gap = 10; // Gap between thumbnails
      const activeThumb = container.children[activeImageIndex] as HTMLElement;
      
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - (container.clientWidth - thumbnailWidth) / 2 + thumbnailWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeImageIndex, images.length]);

  // Use Intersection Observer to track visible thumbnails
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.2 // 20% visibility required
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        
        setVisibleIndices(prev => {
          if (entry.isIntersecting && !prev.includes(index)) {
            return [...prev, index];
          } else if (!entry.isIntersecting && prev.includes(index)) {
            return prev.filter(i => i !== index);
          }
          return prev;
        });
      });
    }, options);
    
    // Observe all thumbnail elements
    const container = scrollContainerRef.current;
    Array.from(container.children).forEach(child => {
      observer.observe(child);
    });
    
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex overflow-x-auto gap-3 py-2 pb-4 hide-scrollbar max-w-full mx-auto"
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        scrollSnapType: 'x mandatory'
      }}
      aria-label="Project image thumbnails"
    >
      {images.map((image, index) => (
        <button
          key={index}
          data-index={index}
          onClick={() => onSelectImage(index)}
          className={`flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 scroll-snap-align-start ${
            index === activeImageIndex 
              ? 'ring-2 ring-roseGold transform scale-105' 
              : 'ring-1 ring-lightGray/30 hover:ring-roseGold/50'
          }`}
          style={{ 
            width: '100px',
            height: '75px',
            scrollSnapAlign: 'start'
          }}
          aria-label={`View image ${index + 1} of ${images.length}`}
          aria-current={index === activeImageIndex ? "true" : "false"}
        >
          <OptimizedImage
            src={image}
            alt={`Thumbnail of ${index + 1} - interior project by Lovable`}
            width={100}
            height={75}
            className="w-full h-full object-cover"
            // Only preload visible and nearby thumbnails
            priority={index === activeImageIndex}
            preload={Math.abs(index - activeImageIndex) <= 2}
            // Progressive image quality
            quality={index === activeImageIndex ? "medium" : "low"}
            placeholderColor={placeholderColors[index]}
          />
        </button>
      ))}
    </div>
  );
};

export default ProjectImageThumbnails;
