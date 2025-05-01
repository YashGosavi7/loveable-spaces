
import { ArrowRight } from "lucide-react";

interface ProjectCardOverlayProps {
  title: string;
  category: string;
  location: string;
  designer?: string;
  tagline?: string;
}

const ProjectCardOverlay = ({
  title,
  category,
  location,
  designer,
  tagline
}: ProjectCardOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 flex flex-col items-center 
                  justify-center text-center p-4 md:p-6">
      <h3 className="font-playfair text-white text-xl md:text-2xl mb-2 md:mb-3">
        {title}
      </h3>
      <p className="text-white/90 mb-3 md:mb-4 text-sm md:text-base">
        {category} | {location}
        {designer && ` | Designed by ${designer}`}
      </p>
      {tagline && (
        <p className="text-roseGold mb-4 italic text-sm">{tagline}</p>
      )}
      <span className="inline-flex items-center gap-2 text-roseGold/90 border 
                     border-roseGold/90 px-4 py-2 rounded text-sm md:text-base">
        View Project 
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  );
};

export default ProjectCardOverlay;
