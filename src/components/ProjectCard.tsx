
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
  const [visibleThumbnails, setVisibleThumbnails] = useState<number[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Use the provided image or the first image from allImages
  const displayImage = allImages.length > 0 ? allImages[selectedImageIndex] : image;
  
  // Generate placeholder colors for thumbnails
  const getPlaceholderColor = (idx: number): string => {
    const colors = ['#e0e0e0', '#d8d8d8', '#e5e5e5', '#dedede'];
    return colors[idx % colors.length];
  };
  
  // Track which thumbnails are visible using Intersection Observer
  useEffect(() => {
    if (!allImages.length || !thumbnailsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          
          if (entry.isIntersecting) {
            setVisibleThumbnails(prev => 
              prev.includes(index) ? prev : [...prev, index]
            );
          } else {
            setVisibleThumbnails(prev => 
              prev.filter(i => i !== index)
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );
    
    // Observe all thumbnails
    const thumbnails = thumbnailsRef.current.querySelectorAll('.project-thumbnail');
    thumbnails.forEach(thumbnail => {
      observer.observe(thumbnail);
    });
    
    return () => observer.disconnect();
  }, [allImages]);
  
  // Add debugging for individual card
  useEffect(() => {
    console.log(`Rendering card for ${id}: ${title} with image: ${displayImage}`);
  }, [id, title, displayImage]);

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
              src={displayImage}
              alt={`${title} interior by Loveable in ${location}`}
              className="w-full h-full object-cover"
              width={300}
              height={225}
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
      
      {/* Project Glimpse Thumbnails - Only shown when we have multiple images */}
      {allImages.length > 1 && (
        <div className="mt-3">
          <p className="text-sm text-darkGray mb-2 font-lato relative inline-block">
            Explore More Images
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold/80"></span>
          </p>
          
          <div 
            ref={thumbnailsRef}
            className="flex gap-2 overflow-x-auto py-2 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allImages.map((thumbImg, idx) => (
              <button
                key={idx}
                data-index={idx}
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  setSelectedImageIndex(idx);
                  setImageLoaded(false);
                }}
                className={`project-thumbnail flex-shrink-0 w-[100px] h-[75px] rounded-md overflow-hidden transition-all duration-300 
                  ${idx === selectedImageIndex ? 'ring-2 ring-roseGold' : 'ring-1 ring-lightGray/30 hover:ring-roseGold/50'}`}
              >
                {visibleThumbnails.includes(idx) ? (
                  <OptimizedImage
                    src={thumbImg}
                    alt={`Thumbnail of ${title} interior by Loveable`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={75}
                    priority={false}
                    preload={idx < 2}
                    quality="low"
                    placeholderColor={getPlaceholderColor(idx)}
                  />
                ) : (
                  // Placeholder for off-screen thumbnails
                  <div 
                    className="w-full h-full bg-darkGray/30"
                    style={{ backgroundColor: getPlaceholderColor(idx) }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
