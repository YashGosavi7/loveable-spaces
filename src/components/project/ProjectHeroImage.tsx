
import { useState, useEffect } from "react";
import OptimizedImage from "../OptimizedImage";

interface ProjectHeroImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ProjectHeroImage = ({ src, alt, width, height }: ProjectHeroImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  // Reset the loaded state when image changes
  useEffect(() => {
    setIsLoaded(false);
    setTransitionClass('opacity-0');
    
    // Slight delay before starting the fade-in transition
    const timer = setTimeout(() => {
      setTransitionClass('opacity-100');
    }, 50);
    
    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div 
      className="absolute inset-0 h-full w-full bg-darkGray/30 overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover ${transitionClass} transition-opacity duration-500`}
        priority={true}
        preload={true}
        quality="high"
        onLoad={() => setIsLoaded(true)}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-darkGray/70 to-darkGray/5 pointer-events-none" />
    </div>
  );
};

export default ProjectHeroImage;
