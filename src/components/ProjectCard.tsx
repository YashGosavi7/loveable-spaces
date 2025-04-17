
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  designer?: string;
  tagline?: string;
}

const OptimizedCardImage = memo(({ 
  src, 
  alt, 
  onLoad, 
  isVisible 
}: { 
  src: string; 
  alt: string; 
  onLoad: () => void; 
  isVisible: boolean;
}): JSX.Element => {
  if (!isVisible) {
    return <></>;
  }
  
  // Generate a placeholder color based on the image path
  const placeholderColor = src.includes('f5ee7e6c') ? '#f5f0e6' : 
                           src.includes('09506ceb') ? '#f0e9e4' : 
                           src.includes('cee99868') ? '#f5f5f0' :
                           src.includes('b52db17b') ? '#f0f0e8' :
                           src.includes('0ca6700f') ? '#f8f6f2' :
                           src.includes('5bc6dc7e') ? '#f5f2ed' :
                           src.includes('46f2b2ae') ? '#f2f0eb' :
                           src.includes('6f4bb809') ? '#f0e9e4' : 
                           src.includes('e4e76a6f') ? '#f5f5f5' : '#efefef';
                          
  return (
    <picture>
      {/* WebP for modern browsers - in production, these would be actual WebP versions */}
      <source 
        type="image/webp" 
        srcSet={`${src} 300w, ${src} 600w, ${src} 1200w`} 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* Fallback for older browsers */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onLoad={onLoad}
        width={300}
        height={225}
        style={{ backgroundColor: placeholderColor }}
      />
    </picture>
  );
});

const ProjectCard = ({ id, title, category, location, image, designer, tagline }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if element is in viewport using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "300px 0px" } // Preload as user approaches (increased margin)
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Function to handle successful image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/portfolio/${id}`} className="group block relative">
        <div className="overflow-hidden rounded-md shadow-md">
          <AspectRatio ratio={4/3} className="bg-lightGray/20">
            {!imageLoaded && <Skeleton className="w-full h-full absolute inset-0" />}
            <OptimizedCardImage
              src={image}
              alt={title}
              onLoad={handleImageLoad}
              isVisible={isInView}
            />
          </AspectRatio>
        </div>

        <div className="absolute inset-0 bg-darkGray/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 md:p-6">
          <h3 className="font-playfair text-white text-xl md:text-2xl mb-2 md:mb-3">{title}</h3>
          <p className="text-white/90 mb-3 md:mb-4 text-sm md:text-base">
            {category} | {location}
            {designer && ` | Designed by ${designer}`}
          </p>
          {tagline && (
            <p className="text-roseGold mb-4 italic">{tagline}</p>
          )}
          <span className="inline-flex items-center gap-2 text-roseGold/90 border border-roseGold/90 px-4 py-2 rounded text-sm md:text-base">
            View Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        
        <div className="mt-4 px-1">
          <h3 className="font-playfair text-lg md:text-xl">{title}</h3>
          <p className="text-darkGray/80 text-base">
            {category} | {location}
            {designer && ` | Designed by ${designer}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
