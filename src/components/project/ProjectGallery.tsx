import { Project } from "@/data/projectsData";
import { useState, useCallback, useEffect, useRef } from "react";
import ProjectCarousel from "./gallery/ProjectCarousel";
import ProjectThumbnailGrid from "./gallery/ProjectThumbnailGrid";
import ProjectSummary from "./gallery/ProjectSummary";
import ImagePreloader from "./gallery/ImagePreloader";
import ImageLightbox from "./gallery/ImageLightbox";
import ProjectThumbnails from "../project/ProjectThumbnails";
import { Separator } from "@/components/ui/separator";

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Increase initial preloaded slides to improve loading performance
  const [preloadedSlides, setPreloadedSlides] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  // More aggressive image preloading strategy for ALL thumbnails
  useEffect(() => {
    const connectionSpeed = detectConnectionSpeed();
    
    // Add preload hints for optimal image loading
    const addImagePreloadHints = () => {
      if (project.images.length === 0) return;
      
      // Always preload the hero image with high priority
      const heroImage = project.images[0];
      
      // Add preload for the hero image
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = heroImage;
      preloadLink.type = 'image/webp'; 
      preloadLink.setAttribute('fetchpriority', 'high');
      preloadLink.setAttribute('crossorigin', 'anonymous');
      document.head.appendChild(preloadLink);
      
      // Determine how many thumbnails to preload based on connection speed
      const thumbnailsToPreload = connectionSpeed === 'slow' ? 6 : 
                                   connectionSpeed === 'medium' ? 9 : 12;
      
      // Preload first N thumbnails for gallery with appropriate responsive sizes
      const preloadLinks = [];
      for (let i = 0; i < Math.min(thumbnailsToPreload, project.images.length); i++) {
        if (i === 0) continue; // Skip the first image as it's already preloaded as hero
        
        const thumbnailLink = document.createElement('link');
        thumbnailLink.rel = connectionSpeed === 'slow' ? 'prefetch' : 'preload';
        thumbnailLink.as = 'image';
        thumbnailLink.href = project.images[i];
        thumbnailLink.type = 'image/webp';
        thumbnailLink.setAttribute('fetchpriority', i < 6 ? 'high' : 'auto');
        thumbnailLink.setAttribute('crossorigin', 'anonymous');
        
        // Add responsive loading with media queries
        if (i < 3) {
          // First row of thumbnails - load on all devices
          thumbnailLink.setAttribute('media', '(min-width: 1px)');
        } else if (i < 6) {
          // Second row - load on tablets and desktops
          thumbnailLink.setAttribute('media', '(min-width: 640px)');
        } else {
          // Further rows - load primarily on desktops
          thumbnailLink.setAttribute('media', '(min-width: 1024px)');
        }
        
        // Add cache control hints
        thumbnailLink.setAttribute('data-cache-control', 'public, max-age=31536000, immutable');
        
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
    };
    
    // Run the preload function
    const cleanup = addImagePreloadHints();
    
    // Return cleanup function
    return cleanup;
  }, [project.images, detectConnectionSpeed]);
  
  // More aggressive slide preloading strategy
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    
    // Preload ALL slides when slide changes, with priority to adjacent ones
    const nextSlidesToPreload = [];
    const totalSlides = project.images.length;
    
    // First prioritize immediate next/previous slides
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue; // Skip current slide
      const nextIndex = (index + i + totalSlides) % totalSlides;
      if (!preloadedSlides.includes(nextIndex)) {
        nextSlidesToPreload.push(nextIndex);
      }
    }
    
    // Then add all other slides
    for (let i = 0; i < totalSlides; i++) {
      if (i !== index && !preloadedSlides.includes(i) && !nextSlidesToPreload.includes(i)) {
        nextSlidesToPreload.push(i);
      }
    }
    
    if (nextSlidesToPreload.length > 0) {
      setPreloadedSlides(prev => [...prev, ...nextSlidesToPreload]);
    }
  }, [project.images.length, preloadedSlides]);

  // Enhanced lightbox open functionality
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    
    // Preload ALL images for smoother lightbox experience
    const allIndices = Array.from({ length: project.images.length }, (_, i) => i);
    const notYetPreloaded = allIndices.filter(idx => !preloadedSlides.includes(idx));
    
    if (notYetPreloaded.length > 0) {
      // Prioritize adjacent images first
      notYetPreloaded.sort((a, b) => {
        const distA = Math.min(
          Math.abs(a - index),
          Math.abs(a - index + project.images.length),
          Math.abs(a - index - project.images.length)
        );
        const distB = Math.min(
          Math.abs(b - index),
          Math.abs(b - index + project.images.length),
          Math.abs(b - index - project.images.length)
        );
        return distA - distB;
      });
      
      setPreloadedSlides(prev => [...prev, ...notYetPreloaded]);
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
        
        {/* Main Carousel - now clickable to open lightbox */}
        <ProjectCarousel 
          project={project}
          onSlideChange={handleSlideChange}
          currentSlide={currentSlide}
          navButtonClass={navButtonClass}
          onImageClick={(index) => openLightbox(index)}
        />
        
        {/* Dark gray horizontal thumbnails bar - directly below carousel */}
        <div className="mt-2 w-full bg-darkGray rounded-md overflow-hidden">
          <ProjectThumbnails
            project={project}
            activeImageIndex={currentSlide}
            setActiveImageIndex={index => {
              setCurrentSlide(index);
              handleSlideChange(index);
            }}
            scrollContainerRef={scrollContainerRef}
            orientation="horizontal"
          />
        </div>
        
        {/* Hidden preloads for even smoother carousel navigation */}
        <ImagePreloader 
          imagePaths={project.images}
          preloadedIndices={preloadedSlides}
        />
        
        {/* Separator to create visual distinction */}
        <Separator className="my-16 bg-darkGray/10" />
        
        {/* Optimized Thumbnail Grid with improved loading and lightbox support */}
        <ProjectThumbnailGrid 
          project={project}
          onThumbnailClick={(index) => openLightbox(index)}
          preloadedSlides={preloadedSlides}
        />
        
        {/* Project Summary */}
        <ProjectSummary project={project} />

        {/* Image Lightbox with enhanced performance */}
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
