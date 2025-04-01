
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
    <Link to={`/portfolio/${id}`} className="hover-project group">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="hover-project-info group-hover:opacity-100">
        <div className="text-center p-6 animate-fade-in">
          <h3 className="font-playfair text-2xl text-white mb-4">{title}</h3>
          <p className="text-white/80 mb-5 text-lg">{category} | {location}</p>
          <button className="bg-roseGold text-white px-6 py-3 rounded-lg font-medium hover:bg-roseGold/90 transition-colors">
            Our Projects
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
