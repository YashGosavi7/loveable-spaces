
import { memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { generatePlaceholderColor } from "@/utils/imageUtils";

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
    rootMargin: "800px 0px" // Increased threshold for earlier loading
  });
  
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Calculate optimal srcSet based on image dimensions
  const getSrcSet = () => {
    // In production, this would use a real image API
    return `${src} ${width/2}w, ${src} ${width}w`;
  };
  
  // Define optimal sizes attribute based on image context
  const getSizes = () => {
    return sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  };
  
  useEffect(() => {
    // Add DNS prefetch for image domains to improve lookup times
    if (priority && typeof window !== 'undefined') {
      const domain = new URL(src, window.location.origin).hostname;
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
        const dnsLink = document.createElement('link');
        dnsLink.rel = 'dns-prefetch';
        dnsLink.href = `//${domain}`;
        document.head.appendChild(dnsLink);
        
        const preconnectLink = document.createElement('link');
        preconnectLink.rel = 'preconnect';
        preconnectLink.href = `//${domain}`;
        preconnectLink.crossOrigin = 'anonymous';
        document.head.appendChild(preconnectLink);
      }
    }
  }, [src, priority]);
  
  useImagePreload(src, { 
    priority, 
    preload, 
    width, 
    quality 
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Calculate content-visibility based on image position
  const contentVisibility = isInView ? 'auto' : 'hidden';

  return (
    <div ref={elementRef} className="relative" style={{ contentVisibility }}>
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton 
            className="w-full h-full" 
            style={{ 
              backgroundColor: derivedPlaceholderColor,
              opacity: 0.5
            }} 
          />
        </div>
      )}
      
      {isInView && (
        <PictureElement
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
          srcSet={getSrcSet()}
          sizes={getSizes()}
          fetchPriority={priority ? "high" : "auto"}
          format={format}
          placeholderColor={derivedPlaceholderColor}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
