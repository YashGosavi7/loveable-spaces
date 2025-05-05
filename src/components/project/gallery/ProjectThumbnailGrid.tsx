
import { Project } from "@/data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "../../OptimizedImage";
import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";

interface ProjectThumbnailGridProps {
  project: Project;
  onThumbnailClick: (index: number) => void;
  preloadedSlides?: number[];
}

const ProjectThumbnailGrid = ({ project, onThumbnailClick, preloadedSlides = [0, 1, 2] }: ProjectThumbnailGridProps) => {
  // Track which thumbnails are visible in the viewport with a larger buffer
  const [visibleThumbnails, setVisibleThumbnails] = useState<number[]>(preloadedSlides);
  const [showAllThumbnails, setShowAllThumbnails] = useState(project.images.length <= 9);
  const gridRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Memoize the thumbnail dimensions to prevent recreation on each render
  const thumbnailDimensions = useMemo(() => {
    return {
      width: 350, // Increased from 300px for better visibility
      height: 263  // Maintain 4:3 aspect ratio
    };
  }, []);

  // Super aggressive IntersectionObserver implementation with increased root margin
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
      rootMargin: '1800px 0px', // Much more aggressive - load images 1800px before they come into view
      threshold: 0.01 // Trigger when just 1% of the element is visible
    };
    
    // Create a new observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index) && !visibleThumbnails.includes(index)) {
            setVisibleThumbnails(prev => [...prev, index]);
            
            // Also preload the next 6 thumbnails for smoother experience (increased from 3)
            const nextIndices = [index + 1, index + 2, index + 3, index + 4, index + 5, index + 6]
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
    
    // Start observing immediately for better performance
    setTimeout(() => {
      // Observe all thumbnail containers
      if (gridRef.current) {
        const thumbnailContainers = gridRef.current.querySelectorAll('.thumbnail-container');
        thumbnailContainers.forEach(container => {
          observerRef.current?.observe(container);
        });
      }
    }, 10); // Minimal delay for better perceived performance
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [project.images.length, visibleThumbnails]);
  
  // Function to determine if a thumbnail is visible or will be soon
  const shouldRenderThumbnail = (index: number) => {
    // Always render the first thumbnails
    if (index < 9) return true;
    
    // If "View All" is clicked, show all thumbnails
    if (showAllThumbnails) return true;
    
    // Render thumbnails that were detected by IntersectionObserver
    return visibleThumbnails.includes(index);
  };

  // Determine how many thumbnails to initially show
  const visibleThumbnailsCount = 9;
  const hasMoreThumbnails = project.images.length > visibleThumbnailsCount;
  
  // Get visible thumbnails
  const getVisibleImages = () => {
    if (showAllThumbnails) {
      return project.images;
    }
    return project.images.slice(0, visibleThumbnailsCount);
  };
  
  return (
    <div className="mt-16 scroll-mt-16" id="project-thumbnails">
      <h3 className="font-playfair text-2xl mb-6 text-center">Project Overview</h3>
      <p className="text-center text-darkGray/80 mb-8 max-w-2xl mx-auto">
        Explore all angles of this beautiful {project.category.toLowerCase()} design project located in {project.location}.
      </p>
      
      {/* Enhanced Grid Layout for Thumbnails - 3 columns on desktop with smoother animations */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {/* Display thumbnails with enhanced loading and hover effects */}
        {getVisibleImages().map((image, index) => (
          <div 
            key={`thumb-${index}`} 
            className="thumbnail-container overflow-hidden border border-roseGold/10 rounded-md shadow-sm hover:shadow-lg transition-all duration-300"
            data-index={index}
          >
            <button 
              onClick={() => onThumbnailClick(index)}
              className="w-full h-full relative group"
              aria-label={`View image ${index + 1} in lightbox gallery`}
            >
              <AspectRatio ratio={4/3} className="bg-lightGray/10">
                {shouldRenderThumbnail(index) ? (
                  <OptimizedImage
                    src={image}
                    alt={`Design thumbnail ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                    width={thumbnailDimensions.width}
                    height={thumbnailDimensions.height}
                    loading={index < 9 ? "eager" : "lazy"} // Eagerly load first 9 thumbnails
                    priority={index < 6} // Prioritize first 6 thumbnails
                    preload={index < 12} // Preload first 12 thumbnails
                    quality={index < 9 ? "medium" : "low"} // Better quality for visible thumbnails
                    decoding="async"
                    fetchPriority={index < 6 ? "high" : "auto"}
                    skipLazyLoading={index < 9} // Skip lazy loading for first 9 thumbnails
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-lightGray/5">
                    <div className="w-6 h-6 rounded-full border-2 border-roseGold/30 border-t-transparent animate-spin"></div>
                  </div>
                )}
              </AspectRatio>
              
              {/* Improved hover overlay with zoom indicator */}
              <div className="absolute inset-0 bg-darkGray/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                <div className="text-white text-center">
                  <span className="block text-lg mb-2">Click to zoom</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-roseGold/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
      
      {/* Improved View More Button */}
      {hasMoreThumbnails && !showAllThumbnails && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllThumbnails(true)}
            className="flex items-center gap-2 px-6 py-3 bg-darkGray/80 hover:bg-darkGray text-white rounded-md transition-colors duration-300"
          >
            View All {project.images.length} Images <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectThumbnailGrid;
