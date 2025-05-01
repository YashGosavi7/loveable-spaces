
import { Link } from "react-router-dom";
import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectCardImage from "./ProjectCardImage";
import ProjectCardOverlay from "./ProjectCardOverlay";
import ProjectCardInfo from "./ProjectCardInfo";
import ProjectThumbnails from "./ProjectThumbnails";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  designer?: string;
  tagline?: string;
  index?: number;
  allImages?: string[];
}

const ProjectCard = memo(({ 
  id, 
  title, 
  category, 
  location, 
  image,
  designer, 
  tagline, 
  index = 0,
  allImages = []
}: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Use the provided image or the first image from allImages
  const displayImage = allImages.length > 0 ? allImages[selectedImageIndex] : image;
  
  // Only show thumbnails when user interacts with the card
  const handleMouseEnter = () => {
    if (allImages.length > 1) {
      setShowThumbnails(true);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
      onMouseEnter={handleMouseEnter}
    >
      <Link to={`/portfolio/${id}`} className="group block relative">
        <ProjectCardImage 
          displayImage={displayImage}
          title={title}
          location={location}
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
          index={index}
          allImages={allImages}
        />
        
        <ProjectCardOverlay
          title={title}
          category={category}
          location={location}
          designer={designer}
          tagline={tagline}
        />
        
        <ProjectCardInfo
          title={title}
          category={category}
          location={location}
          designer={designer}
          tagline={tagline}
        />
      </Link>
      
      <ProjectThumbnails
        allImages={allImages}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        title={title}
        id={id}
        showThumbnails={showThumbnails}
      />
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
