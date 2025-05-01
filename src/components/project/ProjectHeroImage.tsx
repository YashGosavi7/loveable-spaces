
import { useOptimizedImage } from "@/hooks/useOptimizedImage";
import OptimizedImage from "../OptimizedImage";
import { ImageLoader } from "../image/ImageLoader";

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
    <div className="absolute inset-0 w-full h-full">
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          backgroundColor: placeholderColor,
          opacity: isLoaded ? 0 : 1 
        }}
        aria-hidden="true"
      />
      
      {/* Use ImageLoader component to show loading state */}
      {!isLoaded && (
        <ImageLoader color={placeholderColor} />
      )}
      
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover" 
        priority={true}
        width={width}
        height={height}
        preload={true}
        onLoad={handleImageLoad}
        format="auto" // Auto-selects optimal format (WebP/AVIF with JPEG fallback)
        sizes="100vw" // Hero image takes full viewport width
        quality="high" // Use high quality for hero images
      />
    </div>
  );
};

export default ProjectHeroImage;
