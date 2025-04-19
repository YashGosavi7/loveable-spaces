
import { useOptimizedImage } from "@/hooks/useOptimizedImage";
import OptimizedImage from "../OptimizedImage";

interface ProjectHeroImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ProjectHeroImage = ({ src, alt, width, height }: ProjectHeroImageProps) => {
  const { isLoaded, handleImageLoad, placeholderColor } = useOptimizedImage({
    src,
    priority: true,
    preload: true
  });

  return (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          backgroundColor: placeholderColor,
          opacity: isLoaded ? 0 : 1 
        }}
      />
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-contain" 
        priority={true}
        width={width}
        height={height}
        preload={true}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ProjectHeroImage;
