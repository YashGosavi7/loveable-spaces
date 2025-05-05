
import { Project } from "@/data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "../../OptimizedImage";
import { useState, useEffect } from "react";

interface ProjectThumbnailGridProps {
  project: Project;
  onThumbnailClick: (index: number) => void;
}

const ProjectThumbnailGrid = ({ project, onThumbnailClick }: ProjectThumbnailGridProps) => {
  // Track which thumbnails are visible in the viewport
  const [visibleThumbnails, setVisibleThumbnails] = useState<number[]>([0, 1, 2]); // Initially load first 3
  
  // Detect when thumbnails enter viewport
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // If IntersectionObserver not supported, load all thumbnails
      setVisibleThumbnails(project.images.map((_, i) => i));
      return;
    }
    
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '200px 0px', // Load images 200px before they come into view
      threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index) && !visibleThumbnails.includes(index)) {
            setVisibleThumbnails(prev => [...prev, index]);
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all thumbnail containers
    const thumbnailContainers = document.querySelectorAll('.thumbnail-container');
    thumbnailContainers.forEach(container => {
      observer.observe(container);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [project.images.length, visibleThumbnails]);
  
  // Preload next few images when one is clicked
  const handleThumbnailClick = (index: number) => {
    // Preload the next 3 images after the clicked one
    const nextIndices = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (index + i) % project.images.length;
      if (!visibleThumbnails.includes(nextIndex)) {
        nextIndices.push(nextIndex);
      }
    }
    
    if (nextIndices.length > 0) {
      setVisibleThumbnails(prev => [...prev, ...nextIndices]);
    }
    
    onThumbnailClick(index);
  };

  return (
    <div className="mt-16">
      <h3 className="font-playfair text-2xl mb-6 text-center">Project Overview</h3>
      <p className="text-center text-darkGray/80 mb-8 max-w-2xl mx-auto">
        Explore all angles of this beautiful {project.category.toLowerCase()} design project located in {project.location}.
      </p>
      
      {/* Enhanced Grid Layout for Thumbnails - 3 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {project.images.map((image, index) => (
          <div 
            key={`thumb-${index}`} 
            className="thumbnail-container overflow-hidden border border-roseGold/10 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
            data-index={index}
          >
            <button 
              onClick={() => handleThumbnailClick(index)}
              className="w-full h-full"
              aria-label={`View image ${index + 1} in main gallery`}
            >
              <AspectRatio ratio={4/3} className="bg-lightGray/10">
                {visibleThumbnails.includes(index) ? (
                  <picture>
                    {/* WebP version with fallback */}
                    <source 
                      srcSet={`${image} 400w, ${image} 800w, ${image} 1200w`} 
                      type="image/webp" 
                      sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
                    />
                    {/* Regular image fallback */}
                    <OptimizedImage
                      src={image}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={300}
                      loading="lazy"
                      priority={index < 3} // Only prioritize first 3 thumbnails
                      preload={index < 6} // Preload first 6 thumbnails
                      quality={index < 6 ? "medium" : "low"} // Lower quality for later thumbnails
                    />
                  </picture>
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
