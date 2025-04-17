
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
import { useState, useCallback } from "react";

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);
  
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
                      alt={`${project.title} view ${index + 1} - Fast loading interior design by Loveable for ${project.location}`}
                      className="w-full h-full object-cover rounded-md"
                      width={600}
                      height={450}
                      // Only prioritize the first few images
                      priority={index < 2}
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 md:-left-12 lg:-left-12 bg-roseGold/90 hover:bg-roseGold text-white border-none focus:outline-none focus:ring-2 focus:ring-roseGold/50" />
            <CarouselNext className="absolute -right-4 md:-right-12 lg:-right-12 bg-roseGold/90 hover:bg-roseGold text-white border-none focus:outline-none focus:ring-2 focus:ring-roseGold/50" />
          </Carousel>
          
          {/* Carousel dots for navigation */}
          <div className="flex justify-center space-x-2 mt-4">
            {project.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-roseGold w-4" : "bg-lightGray"
                }`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
