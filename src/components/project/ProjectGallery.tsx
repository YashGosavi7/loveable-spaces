
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
import ProjectImageThumbnails from "./ProjectImageThumbnails";

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
          
          {/* Project Image Thumbnails */}
          <ProjectImageThumbnails 
            images={project.images}
            activeImageIndex={currentSlide}
            onSelectImage={handleSlideChange}
          />
          
          {/* Carousel dots for navigation (smaller now that we have thumbnails) */}
          <div className="flex justify-center space-x-1 mt-1">
            {project.images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
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
      </div>
    </section>
  );
};

export default ProjectGallery;
