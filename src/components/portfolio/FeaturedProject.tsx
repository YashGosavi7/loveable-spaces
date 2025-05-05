
import { Project } from "@/data/projectsData";
import OptimizedImage from "@/components/OptimizedImage";
import { useOptimizedImage } from "@/hooks/useOptimizedImage";

interface FeaturedProjectProps {
  project: Project;
  isLoaded: boolean;
  onLoad: () => void;
}

const FeaturedProject = ({ project, isLoaded, onLoad }: FeaturedProjectProps) => {
  const { placeholderColor } = useOptimizedImage({
    src: project.images[0],
    priority: true,
    preload: true
  });

  return (
    <div className="mb-16">
      <h2 className="font-playfair text-2xl md:text-3xl mb-6">Featured Project</h2>
      <div className="relative overflow-hidden rounded-lg shadow-lg group">
        <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
          <div 
            className="absolute inset-0 transition-opacity duration-300" 
            style={{ 
              backgroundColor: placeholderColor,
              opacity: isLoaded ? 0 : 1 
            }}
          ></div>
          <picture>
            <source 
              type="image/webp" 
              srcSet={`${project.images[0]} 500w, ${project.images[0]} 1000w`} 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1000px"
            />
            <source 
              type="image/avif" 
              srcSet={`${project.images[0]} 500w, ${project.images[0]} 1000w`} 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1000px"
            />
            <img 
              src={project.images[0]} 
              alt={`${project.title} full-width interior by Loveable in ${project.location}`}
              className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager" 
              width={1200}
              height={675}
              fetchPriority="high"
              decoding="sync"
              style={{
                aspectRatio: "16/9",
                objectFit: "cover",
                objectPosition: "center"
              }}
              onLoad={onLoad}
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
          {/* Project Title - Displayed prominently on hover */}
          <h3 className="font-playfair text-white text-2xl md:text-3xl mb-3">{project.title}</h3>
          <p className="text-white/90 mb-4">
            {project.category} | {project.location}
            {project.designer && ` | Designed by ${project.designer}`}
          </p>
          {project.tagline && (
            <p className="text-roseGold mb-4 italic">{project.tagline}</p>
          )}
          <span className="inline-flex items-center gap-2 text-roseGold border border-roseGold px-6 py-3 rounded">
            View Project
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
