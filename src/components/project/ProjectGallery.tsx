
import { Project } from "@/data/projectsData";
import { useState, useCallback, useEffect } from "react";
import ProjectCarousel from "./gallery/ProjectCarousel";
import ProjectThumbnailGrid from "./gallery/ProjectThumbnailGrid";
import ProjectSummary from "./gallery/ProjectSummary";
import ImagePreloader from "./gallery/ImagePreloader";

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preloadedSlides, setPreloadedSlides] = useState<number[]>([0, 1]);
  
  // Determine connection speed for adaptive preloading
  const detectConnectionSpeed = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      
      if (conn) {
        if (conn.saveData) return 'slow';
        if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'slow';
        if (conn.effectiveType === '3g') return 'medium';
        if (conn.downlink < 1) return 'slow';
        if (conn.downlink >= 5) return 'fast';
        return 'normal';
      }
    }
    return 'normal';
  }, []);
  
  // Preload critical project images on initial load
  useEffect(() => {
    const connectionSpeed = detectConnectionSpeed();
    
    // Add preload hints for optimal image loading
    const addImagePreloadHints = () => {
      // Always preload the first (hero) image
      if (project.images.length > 0) {
        const heroImage = project.images[0];
        
        // Add preload for the hero image
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = heroImage;
        preloadLink.type = 'image/webp'; // Assume WebP support for modern browsers
        preloadLink.setAttribute('fetchpriority', 'high');
        document.head.appendChild(preloadLink);
        
        // For faster connections, preload the next image too
        if (connectionSpeed !== 'slow' && project.images.length > 1) {
          const nextImage = project.images[1];
          const nextImageLink = document.createElement('link');
          nextImageLink.rel = 'preload';
          nextImageLink.as = 'image';
          nextImageLink.href = nextImage;
          nextImageLink.type = 'image/webp';
          document.head.appendChild(nextImageLink);
        }
        
        // Clean up on unmount
        return () => {
          document.head.removeChild(preloadLink);
          if (connectionSpeed !== 'slow' && project.images.length > 1) {
            document.head.removeChild(document.querySelector(`link[href="${project.images[1]}"]`)!);
          }
        };
      }
    };
    
    // Run the preload function
    const cleanup = addImagePreloadHints();
    
    // Return cleanup function
    return cleanup;
  }, [project.images, detectConnectionSpeed]);
  
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    
    // Preload next few slides when slide changes
    const nextSlidesToPreload = [];
    const totalSlides = project.images.length;
    
    // Determine how many slides to preload based on connection speed
    const connectionSpeed = detectConnectionSpeed();
    const preloadCount = connectionSpeed === 'slow' ? 1 : 
                         connectionSpeed === 'medium' ? 2 : 3;
    
    // Preload next slides
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = (index + i) % totalSlides;
      if (!preloadedSlides.includes(nextIndex)) {
        nextSlidesToPreload.push(nextIndex);
      }
    }
    
    if (nextSlidesToPreload.length > 0) {
      setPreloadedSlides(prev => [...prev, ...nextSlidesToPreload]);
    }
  }, [project.images.length, preloadedSlides, detectConnectionSpeed]);

  // Custom styles for specific projects
  const getProjectSpecificStyles = () => {
    if (project.id === "bhushan-naikwadi-elegant-abode") {
      return {
        navButtonClass: "bg-roseGold/90 hover:bg-roseGold text-white",
        dotClass: "bg-roseGold w-4"
      };
    }
    return {
      navButtonClass: "bg-roseGold/90 hover:bg-roseGold text-white",
      dotClass: "bg-roseGold w-4"
    };
  };
  
  const { navButtonClass } = getProjectSpecificStyles();
  
  return (
    <section className="bg-warmWhite py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl mb-10 text-center">Project Gallery</h2>
        
        {/* Main Carousel */}
        <ProjectCarousel 
          project={project}
          onSlideChange={handleSlideChange}
          currentSlide={currentSlide}
          navButtonClass={navButtonClass}
        />
        
        {/* Hidden preloads to ensure smooth carousel navigation */}
        <ImagePreloader 
          imagePaths={project.images}
          preloadedIndices={preloadedSlides}
        />
        
        {/* Thumbnail Grid below gallery */}
        <ProjectThumbnailGrid 
          project={project}
          onThumbnailClick={handleSlideChange}
        />
        
        {/* Project Summary */}
        <ProjectSummary project={project} />
      </div>
    </section>
  );
};

export default ProjectGallery;
