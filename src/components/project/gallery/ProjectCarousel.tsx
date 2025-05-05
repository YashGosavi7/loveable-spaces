
import { useState, useEffect } from "react";
import { Project } from "@/data/projectsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";

interface ProjectCarouselProps {
  project: Project;
  onSlideChange: (index: number) => void;
  currentSlide: number;
  navButtonClass?: string;
}

const ProjectCarousel = ({ 
  project, 
  onSlideChange, 
  currentSlide,
  navButtonClass = "bg-roseGold/90 hover:bg-roseGold text-white"
}: ProjectCarouselProps) => {
  // Auto-advance slides with a pause when user interacts
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  useEffect(() => {
    if (!autoAdvance) return;
    
    const timer = setTimeout(() => {
      const nextSlide = (currentSlide + 1) % project.images.length;
      onSlideChange(nextSlide);
    }, 6000); // Change slide every 6 seconds
    
    return () => clearTimeout(timer);
  }, [currentSlide, project.images.length, onSlideChange, autoAdvance]);
  
  // Pause auto-advance when user interacts with carousel
  const handleManualNavigation = (index: number) => {
    setAutoAdvance(false);
    onSlideChange(index);
    
    // Resume auto-advance after 30 seconds of inactivity
    setTimeout(() => setAutoAdvance(true), 30000);
  };
  
  return (
    <div className="relative">
      {/* Full-width hero image carousel */}
      <Carousel
        className="w-full"
        setApi={(api) => {
          if (api) {
            api.on("select", () => {
              const selectedIndex = api.selectedScrollSnap();
              if (selectedIndex !== currentSlide) {
                handleManualNavigation(selectedIndex);
              }
            });
          }
        }}
        opts={{
          loop: true,
          align: "start",
          startIndex: currentSlide,
        }}
      >
        <CarouselContent>
          {project.images.map((image, index) => (
            <CarouselItem key={`slide-${index}`} className="relative">
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 9} className="bg-gray-100">
                  <OptimizedImage
                    src={image}
                    alt={`${project.title} - ${project.category} project in ${project.location} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    priority={index === currentSlide}
                    quality={index === currentSlide ? "high" : "medium"}
                  />
                </AspectRatio>
                
                {/* Text overlay with gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 font-sans">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-base md:text-lg font-light">
                    {project.category} | {project.location}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className={`${navButtonClass} left-4 lg:left-8`} />
        <CarouselNext className={`${navButtonClass} right-4 lg:right-8`} />
      </Carousel>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-4">
        {project.images.map((_, index) => (
          <button
            key={`dot-${index}`}
            className={`mx-1 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-6 bg-roseGold" : "w-2 bg-roseGold/30"
            }`}
            onClick={() => handleManualNavigation(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
