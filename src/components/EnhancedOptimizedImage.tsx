
import { memo, useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import EnhancedPicture from "./image/EnhancedPicture";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { generatePlaceholderColor } from "@/utils/imageUtils";
import { calculateAspectRatioStyles, isLowBandwidth } from "@/utils/imageOptimization";
import { ImageLoader } from "./image/ImageLoader";

const EnhancedOptimizedImage = memo(({ 
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
  loading,
  decoding = "async",
  blur = false,
  onLoad
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInView, elementRef } = useImageIntersection({ 
    priority, 
    skipLazyLoading,
    rootMargin: "1600px 0px" // Significantly increased threshold for much earlier loading
  });
  
  // Track if component is mounted
  const isMounted = useRef(true);
  
  // On unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Determine if this is a hero image based on dimensions or filename
  const isHeroImage = width >= 1000 || src.includes('hero') || src.includes('main');
  
  // Optimize quality based on network conditions
  const optimizeQuality = () => {
    // Don't reduce quality for priority images
    if (priority || isHeroImage) return quality;
    
    // Check for slow connection
    if (isLowBandwidth()) {
      return quality === "high" ? "medium" : "low";
    }
    
    return quality;
  };
  
  // Preload image if needed
  useImagePreload(src, { 
    priority, 
    preload: preload || isHeroImage, 
    width, 
    quality: optimizeQuality(),
    format: format || "webp"
  });

  const handleImageLoad = () => {
    if (isMounted.current) {
      setIsLoaded(true);
      if (onLoad) {
        onLoad();
      }
    }
  };

  const handleImageError = () => {
    if (isMounted.current) {
      setImageError(true);
      console.warn(`Failed to load image: ${src}`);
    }
  };

  // Calculate content-visibility based on image position for better rendering performance
  const contentVisibility = isInView ? 'auto' : 'hidden';
  
  // Get optimal aspect ratio styling to prevent layout shifts
  const aspectRatioStyle = calculateAspectRatioStyles(width, height);

  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        contentVisibility,
        ...aspectRatioStyle
      }}
    >
      {!isLoaded && !imageError && (
        <div className="absolute inset-0">
          <Skeleton 
            className="w-full h-full" 
            style={{ 
              backgroundColor: derivedPlaceholderColor,
              opacity: 0.5
            }} 
          />
          <ImageLoader 
            color={derivedPlaceholderColor} 
            showSpinner={priority || isHeroImage} 
            size={isHeroImage ? "large" : "medium"}
          />
        </div>
      )}
      
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Image failed to load</span>
        </div>
      )}
      
      {(isInView || priority || skipLazyLoading || isHeroImage) && !imageError && (
        <EnhancedPicture
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority || isHeroImage}
          quality={optimizeQuality()}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
          onLoad={handleImageLoad}
          srcSet={undefined} // Let EnhancedPicture generate optimal srcSet
          sizes={sizes || undefined}
          fetchPriority={priority || isHeroImage ? "high" : "auto"}
          format={format}
          placeholderColor={derivedPlaceholderColor}
          loading={loading || (isHeroImage || priority ? "eager" : "lazy")}
          decoding={decoding || (isHeroImage ? "sync" : "async")}
        />
      )}
    </div>
  );
});

EnhancedOptimizedImage.displayName = "EnhancedOptimizedImage";

export default EnhancedOptimizedImage;
