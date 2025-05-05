
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useRef, useState, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedImage from "./OptimizedImage";
import { Project } from "@/data/projectsData";
import { getBestProjectImage } from "@/utils/imageSelection";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  designer?: string;
  tagline?: string;
  index?: number;
}

const ProjectCard = memo(({ 
  id, 
  title, 
  category, 
  location, 
  image,
  designer, 
  tagline, 
  index = 0 
}: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <Link to={`/portfolio/${id}`} className="group block relative">
        <div className="overflow-hidden rounded-md shadow-md border border-roseGold/10">
          <AspectRatio ratio={4/3} className="bg-lightGray/20 w-full">
            {!imageLoaded && (
              <Skeleton className="w-full h-full absolute inset-0" />
            )}
            <OptimizedImage
              src={image}
              alt={`Interior design in ${location}`}
              className="w-full h-full"
              width={350}
              height={263}
              priority={index < 3}
              preload={index < 6}
              quality={index < 3 ? "high" : "medium"}
              onLoad={() => setImageLoaded(true)}
            />
          </AspectRatio>
        </div>

        <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 flex flex-col items-center 
                      justify-center text-center p-4 md:p-6">
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
        
        <div className="mt-4 px-1">
          <p className="text-darkGray/80 text-sm md:text-base">
            {category} | {location}
            {designer && ` | Designed by ${designer}`}
          </p>
          {tagline && (
            <p className="text-roseGold/90 text-xs md:text-sm mt-1 italic">
              {tagline}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
