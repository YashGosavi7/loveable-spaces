
import { Project } from "@/data/projectsData";
import { useState, useCallback, useEffect, useRef } from "react";
import ProjectCarousel from "./gallery/ProjectCarousel";
import ProjectThumbnailGrid from "./gallery/ProjectThumbnailGrid";
import ProjectSummary from "./gallery/ProjectSummary";
import ImagePreloader from "./gallery/ImagePreloader";
import ImageLightbox from "./gallery/ImageLightbox";

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preloadedSlides, setPreloadedSlides] = useState<number[]>([0, 1]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
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
  
  // Preload critical project images on initial load with more aggressive strategy
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
        
        // Preload more thumbnails based on connection speed
        const thumbnailsToPreload = connectionSpeed === 'slow' ? 3 : 
                                     connectionSpeed === 'medium' ? 6 : 9;
        
        // Preload first N thumbnails for gallery
        const preloadLinks = [];
        for (let i = 0; i < Math.min(thumbnailsToPreload, project.images.length); i++) {
          if (i === 0) continue; // Skip the first image as it's already preloaded as hero
          
          const thumbnailLink = document.createElement('link');
          thumbnailLink.rel = connectionSpeed === 'slow' ? 'prefetch' : 'preload';
          thumbnailLink.as = 'image';
          thumbnailLink.href = project.images[i];
          thumbnailLink.type = 'image/webp';
          thumbnailLink.setAttribute('fetchpriority', i < 3 ? 'high' : 'auto');
          
          // Add media attribute for responsive preloading
          thumbnailLink.setAttribute('media', '(max-width: 768px)');
          
          document.head.appendChild(thumbnailLink);
          preloadLinks.push(thumbnailLink);
        }
        
        // Clean up on unmount
        return () => {
          document.head.removeChild(preloadLink);
          preloadLinks.forEach(link => {
            try {
              document.head.removeChild(link);
            } catch (e) {
              // Ignore errors if element is already removed
            }
          });
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
    const preloadCount = connectionSpeed === 'slow' ? 2 : 
                         connectionSpeed === 'medium' ? 4 : 6;
    
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

  // Handle lightbox open
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    
    // Preload adjacent images for smoother lightbox experience
    const adjacentIndices = [];
    for (let i = -2; i <= 2; i++) {
      const idx = index + i;
      if (idx >= 0 && idx < project.images.length && !preloadedSlides.includes(idx)) {
        adjacentIndices.push(idx);
      }
    }
    
    if (adjacentIndices.length > 0) {
      setPreloadedSlides(prev => [...prev, ...adjacentIndices]);
    }
  }, [project.images.length, preloadedSlides]);

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
        
        {/* Thumbnail Grid with improved loading and lightbox support */}
        <ProjectThumbnailGrid 
          project={project}
          onThumbnailClick={(index) => openLightbox(index)}
          preloadedSlides={preloadedSlides}
        />
        
        {/* Project Summary */}
        <ProjectSummary project={project} />

        {/* Image Lightbox */}
        {lightboxOpen && (
          <ImageLightbox
            images={project.images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onIndexChange={(index) => {
              setLightboxIndex(index);
              // Preload adjacent images
              handleSlideChange(index);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
