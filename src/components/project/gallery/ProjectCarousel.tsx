
import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Project } from "@/data/projectsData";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { getOptimalImageDimensions } from "@/utils/imageUtils";

interface ProjectCarouselProps {
  project: Project;
  onSlideChange?: (index: number) => void;
  currentSlide?: number;
  navButtonClass?: string;
  showDots?: boolean;
}

const ProjectCarousel = ({ 
  project, 
  onSlideChange,
  currentSlide = 0,
  navButtonClass = "bg-black/50 hover:bg-black/70 text-white",
  showDots = false 
}: ProjectCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  // Fix for error #1: Pass an empty object to getOptimalImageDimensions()
  const { width, height } = getOptimalImageDimensions({});
  
  // Sync with external current slide state
  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentSlide);
  }, [api, currentSlide]);
  
  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return;
    
    const onChange = () => {
      setCurrent(api.selectedScrollSnap());
      onSlideChange?.(api.selectedScrollSnap());
    };
    
    api.on("select", onChange);
    return () => {
      api.off("select", onChange);
    };
  }, [api, onSlideChange]);
  
  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className="w-full max-w-5xl mx-auto relative"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {project.images.map((image, index) => (
            <CarouselItem key={index} className="overflow-hidden">
              <div className="relative aspect-video md:aspect-[16/9] w-full h-full overflow-hidden rounded-lg">
                <OptimizedImage
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={width}
                  height={height}
                  priority={index === 0 || Math.abs(index - current) <= 1}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Fix for errors #2 and #3: Remove 'variant="custom"' and use className for styling */}
        <CarouselPrevious 
          className={`${navButtonClass} left-4`}
        />
        <CarouselNext 
          className={`${navButtonClass} right-4`}
        />
      </Carousel>

      {/* Only show dots if specifically requested */}
      {showDots && (
        <div className="flex justify-center mt-4 gap-2">
          {project.images.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === current ? "w-6 bg-roseGold" : "w-2 bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
