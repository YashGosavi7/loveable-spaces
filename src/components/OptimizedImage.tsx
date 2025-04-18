
import { memo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";

const OptimizedImage = memo(({ 
  src, 
  alt, 
  priority = false,
  className = "",
  width = 800,
  height = 600,
  preload = false,
  skipLazyLoading = false
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isInView, elementRef } = useImageIntersection({ priority, skipLazyLoading });
  
  useImagePreload(src, { priority, preload, width });

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={elementRef} className="relative">
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full opacity-30" />
        </div>
      )}
      
      {isInView && (
        <PictureElement
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
