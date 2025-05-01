
import { Link } from "react-router-dom";
import { ArrowRight, GalleryThumbnails } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useRef, useState, memo, useEffect } from "react";
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
  allImages?: string[]; // Added to support multiple images
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
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Use the provided image or the first image from allImages
  const displayImage = allImages.length > 0 ? allImages[selectedImageIndex] : image;
  
  // Generate optimized placeholder colors
  const getPlaceholderColor = (idx: number): string => {
    const colors = ['#f5f5f5', '#f0f0f0', '#ebebeb', '#e8e8e8'];
    return colors[idx % colors.length];
  };
  
  // Lazy loading strategy based on priority
  const shouldUseEagerLoading = index < 3;
  
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
        <div className="overflow-hidden rounded-md shadow-md border border-roseGold/10">
          <AspectRatio ratio={4/3} className="bg-lightGray/20 w-full">
            {!imageLoaded && (
              <Skeleton className="w-full h-full absolute inset-0" />
            )}
            <OptimizedImage
              src={displayImage}
              alt={`${title} interior by Loveable in ${location}`}
              className="w-full h-full object-cover"
              width={400}
              height={300}
              priority={index < 3}
              preload={index < 6}
              quality={index < 3 ? "high" : "medium"}
              onLoad={() => setImageLoaded(true)}
              placeholderColor={getPlaceholderColor(index)}
            />
          </AspectRatio>
          
          {/* Show image count indicator if there are multiple images */}
          {allImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <GalleryThumbnails size={12} />
              <span>{allImages.length}</span>
            </div>
          )}
        </div>

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
        
        <div className="mt-4 px-1">
          <h3 className="font-playfair text-lg md:text-xl text-darkGray">
            {title}
          </h3>
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
      
      {/* Project Glimpse Thumbnails - Only shown when we have multiple images and user interacts */}
      {allImages.length > 1 && showThumbnails && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          <p className="text-sm text-darkGray mb-2 font-lato relative inline-block">
            Quick Preview
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold/80"></span>
          </p>
          
          <div 
            ref={thumbnailsRef}
            className="flex gap-2 overflow-x-auto py-2 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allImages.slice(0, 4).map((thumbImg, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  setSelectedImageIndex(idx);
                  setImageLoaded(false);
                }}
                className={`flex-shrink-0 w-[80px] h-[60px] rounded-md overflow-hidden transition-all duration-300 
                  ${idx === selectedImageIndex ? 'ring-2 ring-roseGold' : 'ring-1 ring-lightGray/30 hover:ring-roseGold/50'}`}
              >
                <OptimizedImage
                  src={thumbImg}
                  alt={`Thumbnail of ${title}`}
                  className="w-full h-full object-cover"
                  width={80}
                  height={60}
                  priority={false}
                  preload={idx === 0}
                  quality="low"
                  placeholderColor={getPlaceholderColor(idx)}
                  skipLazyLoading={idx < 2}
                />
              </button>
            ))}
            
            {allImages.length > 4 && (
              <Link 
                to={`/portfolio/${id}`}
                className="flex-shrink-0 w-[80px] h-[60px] rounded-md overflow-hidden bg-darkGray/10 flex items-center justify-center text-darkGray/70 hover:bg-darkGray/20 transition-colors"
              >
                +{allImages.length - 4}
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
