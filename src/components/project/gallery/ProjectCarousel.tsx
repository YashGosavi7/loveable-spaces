
import { useState, useCallback } from "react";
import { Project } from "@/data/projectsData";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "../../OptimizedImage";

interface ProjectCarouselProps {
  project: Project;
  onSlideChange: (index: number) => void;
  currentSlide: number;
  navButtonClass: string;
}

const ProjectCarousel = ({ 
  project, 
  onSlideChange, 
  currentSlide,
  navButtonClass 
}: ProjectCarouselProps) => {
  // Get optimal dimensions for gallery images
  const getGalleryImageDimensions = () => {
    // Default dimensions (optimal for gallery view)
    return { width: 600, height: 450 };
  };
  
  const { width, height } = getGalleryImageDimensions();

  return (
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
              currentSlide === index ? `bg-roseGold w-4` : "bg-lightGray"
            }`}
            onClick={() => onSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
