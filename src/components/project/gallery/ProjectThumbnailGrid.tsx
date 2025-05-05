
import { Project } from "@/data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "../../OptimizedImage";
import { useState, useEffect, useRef, useMemo } from "react";

interface ProjectThumbnailGridProps {
  project: Project;
  onThumbnailClick: (index: number) => void;
}

const ProjectThumbnailGrid = ({ project, onThumbnailClick }: ProjectThumbnailGridProps) => {
  // Track which thumbnails are visible in the viewport
  const [visibleThumbnails, setVisibleThumbnails] = useState<number[]>([0, 1, 2]); // Initially load first 3
  const gridRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Memoize the thumbnail dimensions to prevent recreation on each render
  const thumbnailDimensions = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      width: isMobile ? 300 : 400,
      height: isMobile ? 225 : 300
    };
  }, []);

  // Super aggressive IntersectionObserver implementation for thumbnails
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // If IntersectionObserver not supported, load all thumbnails
      setVisibleThumbnails(project.images.map((_, i) => i));
      return;
    }
    
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '400px 0px', // Load images 400px before they come into view
      threshold: 0.01 // Trigger when just 1% of the element is visible
    };
    
    // Create a new observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index) && !visibleThumbnails.includes(index)) {
            setVisibleThumbnails(prev => [...prev, index]);
            
            // Also load the next 2 thumbnails for smoother experience
            const nextIndices = [index + 1, index + 2]
              .filter(i => i < project.images.length && !visibleThumbnails.includes(i));
            
            if (nextIndices.length > 0) {
              setVisibleThumbnails(prev => [...prev, ...nextIndices]);
            }
          }
          
          // Stop observing once we've detected intersection
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Only start observing after a short delay to prioritize initial render
    setTimeout(() => {
      // Observe all thumbnail containers
      if (gridRef.current) {
        const thumbnailContainers = gridRef.current.querySelectorAll('.thumbnail-container');
        thumbnailContainers.forEach(container => {
          observerRef.current?.observe(container);
        });
      }
    }, 100);
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [project.images.length, visibleThumbnails]);
  
  // Function to determine if a thumbnail is visible or will be soon
  const shouldRenderThumbnail = (index: number) => {
    // Always render the first few thumbnails
    if (index < 3) return true;
    
    // Render thumbnails that were detected by IntersectionObserver
    return visibleThumbnails.includes(index);
  };
  
  return (
    <div className="mt-16">
      <h3 className="font-playfair text-2xl mb-6 text-center">Project Overview</h3>
      <p className="text-center text-darkGray/80 mb-8 max-w-2xl mx-auto">
        Explore all angles of this beautiful {project.category.toLowerCase()} design project located in {project.location}.
      </p>
      
      {/* Enhanced Grid Layout for Thumbnails - 3 columns on desktop */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {project.images.map((image, index) => (
          <div 
            key={`thumb-${index}`} 
            className="thumbnail-container overflow-hidden border border-roseGold/10 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
            data-index={index}
          >
            <button 
              onClick={() => onThumbnailClick(index)}
              className="w-full h-full"
              aria-label={`View image ${index + 1} in main gallery`}
            >
              <AspectRatio ratio={4/3} className="bg-lightGray/10">
                {shouldRenderThumbnail(index) ? (
                  <OptimizedImage
                    src={image}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width={thumbnailDimensions.width}
                    height={thumbnailDimensions.height}
                    loading="lazy"
                    priority={index < 3} // Only prioritize first 3 thumbnails
                    preload={index < 6} // Preload first 6 thumbnails
                    quality={index < 6 ? "medium" : "low"} // Lower quality for later thumbnails
                    decoding="async"
                    fetchPriority={index < 3 ? "high" : "auto"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-lightGray/5">
                    <div className="w-6 h-6 rounded-full border-2 border-roseGold/30 border-t-transparent animate-spin"></div>
                  </div>
                )}
              </AspectRatio>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectThumbnailGrid;
