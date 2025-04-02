
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

const ProjectCard = ({ id, title, category, location, image }: ProjectCardProps) => {
  return (
    <Link to={`/portfolio/${id}`} className="group block relative">
      <div className="overflow-hidden">
        <AspectRatio ratio={4/3} className="bg-lightGray/20">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AspectRatio>
      </div>

      <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
        <h3 className="font-playfair text-white text-2xl mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{category} | {location}</p>
        <span className="inline-flex items-center gap-2 text-roseGold border border-roseGold px-4 py-2">
          View Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      
      <div className="mt-4">
        <h3 className="font-playfair text-xl">{title}</h3>
        <p className="text-darkGray/70">{category} | {location}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
