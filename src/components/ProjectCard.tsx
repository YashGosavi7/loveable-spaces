
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
      <div className="overflow-hidden rounded-md shadow-md">
        <AspectRatio ratio={4/3} className="bg-lightGray/20">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AspectRatio>
      </div>

      <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
        <h3 className="font-playfair text-white text-2xl md:text-3xl mb-3">{title}</h3>
        <p className="text-white/90 mb-4 text-lg">{category} | {location}</p>
        <span className="inline-flex items-center gap-2 text-roseGold/90 border border-roseGold/90 px-5 py-2 rounded">
          Our Projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      
      <div className="mt-5 px-1">
        <h3 className="font-playfair text-xl md:text-2xl">{title}</h3>
        <p className="text-darkGray/80 text-lg">{category} | {location}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
