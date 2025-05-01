
import { memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { generatePlaceholderColor, getImageLoadingStrategy } from "@/utils/imageUtils";
import { ImageLoader } from "./image/ImageLoader";

const OptimizedImage = memo(({ 
  src, 
  alt, 
  priority = false,
  className = "",
  width = 800,
  height = 600,
  sizes,
  preload = false,
  quality = "medium",
  skipLazyLoading = false,
  placeholderColor,
  format = "auto",
  onLoad
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isInView, elementRef } = useImageIntersection({ 
    priority, 
    skipLazyLoading,
    rootMargin: "300px 0px"
  });
  
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Get loading strategy based on user's connection and device
  const loadingStrategy = getImageLoadingStrategy();
  
  // Adjust quality based on connection and priority
  const getOptimalQuality = () => {
    if (priority) return quality;
    
    if (loadingStrategy.isSlowConnection) {
      return "low";
    }
    
    return quality;
  };

  // Use more aggressive preloading for priority images
  useImagePreload(src, { 
    priority, 
    preload: preload || priority, 
    width, 
    quality: getOptimalQuality(),
    format: loadingStrategy.preferredFormat as "auto" | "webp" | "avif" | undefined
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Calculate aspect ratio to prevent layout shifts
  const aspectRatio = `${width}/${height}`;

  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        aspectRatio,
        contentVisibility: isInView ? 'auto' : 'hidden'
      }}
      aria-busy={!isLoaded}
    >
      {!isLoaded && (
        <div className="absolute inset-0" aria-hidden="true">
          <Skeleton 
            className="w-full h-full" 
            style={{ 
              backgroundColor: derivedPlaceholderColor,
              opacity: 0.5
            }} 
          />
          <ImageLoader 
            color={derivedPlaceholderColor} 
            showSpinner={priority} 
            size={width < 200 ? "small" : "medium"}
            blurEffect={width > 100}
          />
        </div>
      )}
      
      {(isInView || priority || skipLazyLoading) && (
        <PictureElement
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={getOptimalQuality()}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
          onLoad={handleImageLoad}
          srcSet={undefined}
          sizes={sizes}
          fetchPriority={priority ? "high" : "auto"}
          format={loadingStrategy.preferredFormat as "auto" | "webp" | "avif"}
          placeholderColor={derivedPlaceholderColor}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
