
import { Project } from "@/data/projectsData";
import { useState, useCallback, useEffect, useRef } from "react";
import ProjectCarousel from "./ProjectCarousel";
import ProjectThumbnailGrid from "./ProjectThumbnailGrid";
import ProjectSummary from "./ProjectSummary";
import ImagePreloader from "./ImagePreloader";
import ImageLightbox from "./ImageLightbox";
import ProjectThumbnails from "@/components/project/ProjectThumbnails";
import { getOptimizedImageUrl } from "@/utils/imageUtils"; // Added import

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Preload first few slides for carousel; adjust based on typical number of images
  const [preloadedSlides, setPreloadedSlides] = useState<number[]>(
    Array.from({ length: Math.min(project.images.length, 3) }, (_, i) => i)
  );
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
  
  // Image preloading strategy
  useEffect(() => {
    const connectionSpeed = detectConnectionSpeed();
    
    const addImagePreloadHints = () => {
      if (!project.images || project.images.length === 0) return;
      
      const linksToCleanup: HTMLLinkElement[] = [];

      // Preload the first main gallery image (carousel's first image)
      if (project.images[0]) {
        const mainImageLink = document.createElement('link');
        mainImageLink.rel = 'preload';
        mainImageLink.as = 'image';
        mainImageLink.href = getOptimizedImageUrl(project.images[0], 1200, 50, "webp"); // Example main image size/quality
        mainImageLink.type = 'image/webp'; 
        mainImageLink.setAttribute('fetchpriority', 'high');
        mainImageLink.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(mainImageLink);
        linksToCleanup.push(mainImageLink);
      }
      
      // Preload the first 3 thumbnails
      const thumbnailsToPreloadCount = 3;
      for (let i = 0; i < Math.min(thumbnailsToPreloadCount, project.images.length); i++) {
        const thumbLink = document.createElement('link');
        thumbLink.rel = connectionSpeed === 'slow' ? 'prefetch' : 'preload';
        thumbLink.as = 'image';
        thumbLink.href = getOptimizedImageUrl(project.images[i], 100, 25, "webp"); // Thumbnail size/quality
        thumbLink.type = 'image/webp';
        // Fetch priority high for first few, auto for others if preloading more
        thumbLink.setAttribute('fetchpriority', i < 2 ? 'high' : 'auto');
        thumbLink.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(thumbLink);
        linksToCleanup.push(thumbLink);
      }
      
      return () => {
        linksToCleanup.forEach(link => {
          try {
            document.head.removeChild(link);
          } catch (e) { /* Ignore */ }
        });
      };
    };
    
    const cleanup = addImagePreloadHints();
    return cleanup;
  }, [project.images, detectConnectionSpeed]);
  
  // More aggressive slide preloading strategy
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    
    // Preload ALL slides when slide changes, with priority to adjacent ones
    const nextSlidesToPreload = [];
    const totalSlides = project.images.length;
    
    // Prioritize immediate next/previous slides for carousel
    for (let i = -1; i <= 1; i++) { // Reduced from -2 to 2 for less aggressive preloading
      if (i === 0) continue;
      const nextIndex = (index + i + totalSlides) % totalSlides;
      if (!preloadedSlides.includes(nextIndex)) {
        nextSlidesToPreload.push(nextIndex);
      }
    }
        
    if (nextSlidesToPreload.length > 0) {
      setPreloadedSlides(prev => {
        const newPreloaded = new Set([...prev, ...nextSlidesToPreload]);
        return Array.from(newPreloaded);
      });
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
        
        {/* Main Carousel - optimized for fast loading */}
        <ProjectCarousel 
          project={project}
          onSlideChange={handleSlideChange}
          currentSlide={currentSlide}
          navButtonClass={navButtonClass}
        />
        
        {/* Dark gray horizontal thumbnails bar - added below the carousel */}
        <div className="mt-2 w-full">
          <ProjectThumbnails
            project={project}
            activeImageIndex={currentSlide}
            setActiveImageIndex={setCurrentSlide} // This should also trigger handleSlideChange for carousel preloading
            scrollContainerRef={scrollContainerRef}
            orientation="horizontal"
          />
        </div>
        
        {/* Hidden preloads for even smoother carousel navigation */}
        <ImagePreloader 
          imagePaths={project.images}
          preloadedIndices={preloadedSlides}
        />
        
        {/* Optimized Thumbnail Grid with improved loading and lightbox support */}
        <ProjectThumbnailGrid 
          project={project}
          onThumbnailClick={(index) => openLightbox(index)}
          preloadedSlides={preloadedSlides} // Pass preloaded slides for grid optimization
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
              handleSlideChange(index); // Preload adjacent images for lightbox
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
