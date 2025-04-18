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
  index?: number;
}

const OptimizedCardImage = memo(({ 
  src, 
  alt, 
  onLoad, 
  isVisible,
  priority 
}: { 
  src: string; 
  alt: string; 
  onLoad: () => void; 
  isVisible: boolean;
  priority?: boolean;
}): JSX.Element => {
  if (!isVisible) {
    return <></>;
  }
  
  // Generate a placeholder color based on the image path
  const generatePlaceholderColor = () => {
    // Naikwadi project placeholders
    if (src.includes('7a9b0e2f')) return '#f5f1ea'; // Living room
    if (src.includes('59d47f06')) return '#f4efe8'; // Bedroom with mandalas
    if (src.includes('94247c8f')) return '#f5f0e9'; // Bedroom alternative angle
    if (src.includes('33bf1683')) return '#f3ede6'; // Bedroom storage
    if (src.includes('5d5e5726')) return '#f4efe7'; // Bedroom side view
    if (src.includes('8ebf3bc3')) return '#f5f0e8'; // Entrance
    if (src.includes('3914b6c6')) return '#f2ede5'; // TV Unit
    if (src.includes('88614b3e')) return '#f5f1ea'; // Dining area
    if (src.includes('cc7886ad')) return '#f4efe7'; // Living space

    // Wedding hall placeholders
    if (src.includes('eea53347')) return '#f5f0e9'; // Wedding hall main
    if (src.includes('18ae3aa6')) return '#f3ede6'; // Wedding hall seating
    if (src.includes('76be1317')) return '#f4efe8'; // Wedding hall walkway
    if (src.includes('ca4507e9')) return '#f2ede5'; // Wedding hall mandap
    if (src.includes('40a33995')) return '#f5f1ea'; // Wedding hall chandelier
    if (src.includes('c9e93dc4')) return '#f4efe7'; // Wedding hall entrance
    if (src.includes('de461583')) return '#f3eee7'; // Wedding hall stage
    if (src.includes('ac8a7286')) return '#f5f0e8'; // Wedding hall reception
    if (src.includes('e6e7be2a')) return '#f4efe7'; // Wedding hall overview
    
    // Original placeholders
    if (src.includes('f5ee7e6c')) return '#f5f0e6';
    if (src.includes('09506ceb')) return '#f0e9e4';
    if (src.includes('cee99868')) return '#f5f5f0';
    if (src.includes('b52db17b')) return '#f0f0e8';
    if (src.includes('0ca6700f')) return '#f8f6f2';
    if (src.includes('5bc6dc7e')) return '#f5f2ed';
    if (src.includes('46f2b2ae')) return '#f2f0eb';
    if (src.includes('6f4bb809')) return '#f0e9e4'; 
    if (src.includes('e4e76a6f')) return '#f5f5f5';
    
    // Default
    return '#efefef';
  };
  
  const placeholderColor = generatePlaceholderColor();
                          
  return (
    <picture>
      {/* WebP for modern browsers */}
      <source 
        type="image/webp" 
        srcSet={`${src} 250w, ${src} 500w`} 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* AVIF for browsers with best compression support */}
      <source 
        type="image/avif" 
        srcSet={`${src} 250w, ${src} 500w`} 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* Responsive source for different screen sizes */}
      <source 
        media="(max-width: 640px)" 
        srcSet={src}
      />
      <source 
        media="(max-width: 1024px)" 
        srcSet={src}
      />
      
      {/* Fallback for older browsers */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading={priority ? "eager" : "lazy"}
        onLoad={onLoad}
        width={250}
        height={188}
        style={{ 
          backgroundColor: placeholderColor,
          aspectRatio: "4/3" 
        }}
        // Corrected to camelCase fetchPriority
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
});

const ProjectCard = ({ id, title, category, location, image, designer, tagline, index = 0 }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if element is in viewport using IntersectionObserver with larger margin
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01, rootMargin: "600px 0px" } // Preload as user approaches (increased margin)
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

  // Determine if this is a priority image (first 3 in the list)
  const isPriority = index < 3;

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
              alt={`Fast-loading ${title} interior by Loveable in ${location}`}
              onLoad={handleImageLoad}
              isVisible={isInView || isPriority}
              priority={isPriority}
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
          {tagline && (
            <p className="text-roseGold/90 text-sm mt-1 italic">
              {tagline}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
