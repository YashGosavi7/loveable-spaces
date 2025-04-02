
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

const ProjectCard = ({ id, title, category, location, image }: ProjectCardProps) => {
  return (
    <Link to={`/portfolio/${id}`} className="group block relative overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-darkGray/80 via-darkGray/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
        <div className="p-8 w-full text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-playfair text-2xl md:text-3xl text-white mb-2">{title}</h3>
          <p className="text-white/80 mb-6 text-lg">{category} | {location}</p>
          <span className="inline-block bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
            View Project
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
