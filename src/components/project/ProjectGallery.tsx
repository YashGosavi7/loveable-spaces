
import { Project } from "@/data/projectsData";
import { useState, useCallback } from "react";
import ProjectCarousel from "./gallery/ProjectCarousel";
import ProjectThumbnailGrid from "./gallery/ProjectThumbnailGrid";
import ProjectSummary from "./gallery/ProjectSummary";
import ImagePreloader from "./gallery/ImagePreloader";

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
        
        {/* Thumbnail Grid below gallery */}
        <ProjectThumbnailGrid 
          project={project}
          onThumbnailClick={handleSlideChange}
        />
        
        {/* Project Summary */}
        <ProjectSummary project={project} />
      </div>
    </section>
  );
};

export default ProjectGallery;
