import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "../OptimizedImage";
import { Project } from "@/data/projectsData";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useState, useCallback, useEffect } from "react";

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preloadedSlides, setPreloadedSlides] = useState<number[]>([0, 1]);
  
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    
    // Preload next few slides when slide changes
    const nextSlidesToPreload = [];
    const totalSlides = project.images.length;
    
    // Preload next 2 slides
    for (let i = 1; i <= 2; i++) {
      const nextIndex = (index + i) % totalSlides;
      if (!preloadedSlides.includes(nextIndex)) {
        nextSlidesToPreload.push(nextIndex);
      }
    }
    
    if (nextSlidesToPreload.length > 0) {
      setPreloadedSlides(prev => [...prev, ...nextSlidesToPreload]);
    }
  }, [project.images.length, preloadedSlides]);
  
  // Get optimal dimensions for gallery images
  const getGalleryImageDimensions = () => {
    // Default dimensions (optimal for gallery view)
    return { width: 600, height: 450 };
  };
  
  const { width, height } = getGalleryImageDimensions();

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
  
  const { navButtonClass, dotClass } = getProjectSpecificStyles();
  
  return (
    <section className="bg-warmWhite py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl mb-10 text-center">Project Gallery</h2>
        <div className="relative max-w-4xl mx-auto">
          <Carousel 
            className="w-full"
            opts={{
              loop: true,
              align: "center"
            }}
          >
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={4/3} className="bg-lightGray/10 relative">
                    <OptimizedImage
                      src={image}
                      alt={`${project.title} view ${index + 1} - Fast loading uncropped interior design by Loveable for ${project.location}`}
                      className="w-full h-full object-contain rounded-md"
                      width={width}
                      height={height}
                      priority={index < 1} // Prioritize only the first image
                      preload={index < 3} // Preload first few images
                      quality={index < 3 ? "high" : "medium"} // Higher quality for first few images
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`absolute -left-4 md:-left-12 lg:-left-12 ${navButtonClass} border-none focus:outline-none focus:ring-2 focus:ring-roseGold/50`} />
            <CarouselNext className={`absolute -right-4 md:-right-12 lg:-right-12 ${navButtonClass} border-none focus:outline-none focus:ring-2 focus:ring-roseGold/50`} />
          </Carousel>
          
          {/* Carousel dots for navigation */}
          <div className="flex justify-center space-x-2 mt-4">
            {project.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? dotClass : "bg-lightGray"
                }`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Hidden preloads to ensure smooth carousel navigation */}
          <div className="hidden" aria-hidden="true">
            {preloadedSlides.map(index => (
              project.images[index] && (
                <link 
                  key={`preload-gallery-${index}`}
                  rel="prefetch" 
                  href={project.images[index]} 
                  as="image"
                />
              )
            ))}
          </div>
        </div>
        
        {/* New Section: Thumbnail Grid below gallery */}
        <div className="mt-16">
          <h3 className="font-playfair text-2xl mb-6 text-center">Project Overview</h3>
          <p className="text-center text-darkGray/80 mb-8 max-w-2xl mx-auto">
            Explore all angles of this beautiful {project.category.toLowerCase()} design project located in {project.location}.
          </p>
          
          {/* Responsive Grid Layout for Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {project.images.map((image, index) => (
              <div key={`thumb-${index}`} className="overflow-hidden border border-roseGold/10 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                <button 
                  onClick={() => handleSlideChange(index)}
                  className="w-full h-full"
                  aria-label={`View image ${index + 1} in main gallery`}
                >
                  <AspectRatio ratio={1} className="bg-lightGray/10">
                    <picture>
                      {/* WebP version with fallback */}
                      <source 
                        srcSet={`${image} 600w, ${image} 1200w`} 
                        type="image/webp" 
                        sizes="(max-width: 768px) 600px, 1200px"
                      />
                      {/* Regular image fallback */}
                      <OptimizedImage
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        width={300}
                        height={300}
                        loading="lazy"
                        priority={false}
                        quality="medium"
                      />
                    </picture>
                  </AspectRatio>
                </button>
              </div>
            ))}
          </div>
          
          {/* Project Summary */}
          <div className="mt-12 p-6 bg-lightGray/5 border border-roseGold/5 rounded-md">
            <h4 className="font-playfair text-xl mb-3">{project.title} - Project Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-darkGray/80">
                  <span className="font-medium text-darkGray">Location:</span> {project.location}
                </p>
                <p className="text-darkGray/80">
                  <span className="font-medium text-darkGray">Category:</span> {project.category}
                </p>
                {project.designer && (
                  <p className="text-darkGray/80">
                    <span className="font-medium text-darkGray">Designer:</span> {project.designer}
                  </p>
                )}
                {project.area && (
                  <p className="text-darkGray/80">
                    <span className="font-medium text-darkGray">Area:</span> {project.area}
                  </p>
                )}
              </div>
              <div>
                {project.completionDate && (
                  <p className="text-darkGray/80">
                    <span className="font-medium text-darkGray">Completed:</span> {project.completionDate}
                  </p>
                )}
                {project.budget && (
                  <p className="text-darkGray/80">
                    <span className="font-medium text-darkGray">Budget:</span> {project.budget}
                  </p>
                )}
                {project.client && (
                  <p className="text-darkGray/80">
                    <span className="font-medium text-darkGray">Client:</span> {project.client}
                  </p>
                )}
              </div>
            </div>
            {project.tagline && (
              <p className="text-roseGold italic mt-4">{project.tagline}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
