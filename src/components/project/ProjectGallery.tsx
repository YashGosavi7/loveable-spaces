
import { Project } from "@/data/projectsData";
import { useState, useCallback, useEffect, useRef } from "react";
import ProjectCarousel from "./gallery/ProjectCarousel";
import ProjectSummary from "./gallery/ProjectSummary";
import UltraFastPicture from "@/components/image/UltraFastPicture";
import UltraFastLightbox from "./gallery/UltraFastLightbox";
import ProjectThumbnails from "../project/ProjectThumbnails";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronDown } from "lucide-react";
import { ultraFastPreload, getConnectionSpeed } from "@/utils/ultraFastImageOptimization";

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAllThumbnails, setShowAllThumbnails] = useState(project.images.length <= 9);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Ultra-aggressive preloading on component mount
  useEffect(() => {
    if (project.images.length === 0) return;
    
    const connectionSpeed = getConnectionSpeed();
    
    // Immediately preload hero image and first row of thumbnails
    const criticalImages = project.images.slice(0, 4); // Hero + first 3 thumbnails
    ultraFastPreload([project.images[0]], 'hero', 'critical');
    ultraFastPreload(criticalImages.slice(1), 'thumbnail', 'critical');
    
    // Preload more images based on connection speed
    const preloadCount = connectionSpeed === 'fast' ? 12 : connectionSpeed === 'medium' ? 9 : 6;
    const additionalImages = project.images.slice(4, preloadCount);
    
    if (additionalImages.length > 0) {
      setTimeout(() => {
        ultraFastPreload(additionalImages, 'thumbnail', 'high');
      }, 50);
    }
    
    // Preload all remaining images in background
    if (connectionSpeed !== 'slow' && project.images.length > preloadCount) {
      setTimeout(() => {
        const remainingImages = project.images.slice(preloadCount);
        ultraFastPreload(remainingImages, 'thumbnail', 'medium');
      }, 200);
    }
  }, [project.images]);
  
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    
    // Preload adjacent images for smooth navigation
    const adjacentIndices = [index - 1, index + 1].filter(i => i >= 0 && i < project.images.length);
    const adjacentImages = adjacentIndices.map(i => project.images[i]);
    ultraFastPreload(adjacentImages, 'hero', 'high');
  }, [project.images]);
  
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);
  
  const visibleThumbnailsCount = 9;
  const hasMoreThumbnails = project.images.length > visibleThumbnailsCount;
  
  const getVisibleImages = () => {
    return showAllThumbnails ? project.images : project.images.slice(0, visibleThumbnailsCount);
  };
  
  return (
    <section className="bg-warmWhite py-16">
      <div className="container mx-auto px-4">
        {/* Hero Image - Ultra-fast loading */}
        <div className="mb-8">
          <AspectRatio ratio={16/9} className="bg-lightGray/10 rounded-lg overflow-hidden">
            <UltraFastPicture
              src={project.images[currentSlide]}
              alt={`${project.title} - Main view`}
              type="hero"
              className="w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300"
              width={1200}
              height={675}
              priority
              loading="eager"
              onClick={() => openLightbox(currentSlide)}
            />
          </AspectRatio>
        </div>
        
        {/* Horizontal thumbnails bar */}
        <div className="mt-2 mb-8 w-full bg-darkGray rounded-md overflow-hidden">
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
        
        <Separator className="my-16 bg-darkGray/10" />
        
        {/* Ultra-fast thumbnail grid */}
        <div className="mt-16 scroll-mt-16" id="project-thumbnails">
          <p className="text-center text-darkGray/80 mb-8 max-w-2xl mx-auto">
            Click on any image to view in full size
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {getVisibleImages().map((image, index) => (
              <div 
                key={`thumb-${index}`} 
                className="overflow-hidden border border-roseGold/10 rounded-md shadow-sm hover:shadow-xl transition-all duration-200"
              >
                <button 
                  onClick={() => openLightbox(index)}
                  className="w-full h-full relative group"
                  aria-label={`View image ${index + 1} in lightbox gallery`}
                >
                  <AspectRatio ratio={4/3} className="bg-lightGray/10">
                    <UltraFastPicture
                      src={image}
                      alt={`Interior design thumbnail ${index + 1}`}
                      type="thumbnail"
                      className="w-full h-full group-hover:scale-110 transition-transform duration-300 ease-out"
                      width={350}
                      height={263}
                      priority={index < 6}
                      loading={index < 9 ? "eager" : "lazy"}
                    />
                  </AspectRatio>
                  
                  {/* Hover overlay */}
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
          
          {/* View More Button */}
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
        
        {/* Project Summary */}
        <ProjectSummary project={project} />

        {/* Ultra-fast Lightbox */}
        <UltraFastLightbox
          images={project.images}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(index) => {
            setLightboxIndex(index);
            handleSlideChange(index);
          }}
        />
      </div>
    </section>
  );
};

export default ProjectGallery;
