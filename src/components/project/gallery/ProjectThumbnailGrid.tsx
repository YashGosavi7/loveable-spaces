
import { Project } from "@/data/projectsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "../../OptimizedImage";

interface ProjectThumbnailGridProps {
  project: Project;
  onThumbnailClick: (index: number) => void;
}

const ProjectThumbnailGrid = ({ project, onThumbnailClick }: ProjectThumbnailGridProps) => {
  return (
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
              onClick={() => onThumbnailClick(index)}
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
    </div>
  );
};

export default ProjectThumbnailGrid;
