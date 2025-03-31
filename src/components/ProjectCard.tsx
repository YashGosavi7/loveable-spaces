
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
        <div className="text-center p-4 animate-fade-in">
          <h3 className="font-playfair text-xl text-white">{title}</h3>
          <p className="text-white/80 mt-2">{category} | {location}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
