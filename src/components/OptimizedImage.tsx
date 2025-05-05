
import { memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { generatePlaceholderColor } from "@/utils/imageUtils";
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
  loading,
  onLoad
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isInView, elementRef } = useImageIntersection({ 
    priority, 
    skipLazyLoading,
    rootMargin: "1200px 0px" // Increased threshold for much earlier loading
  });
  
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Optimize image loading based on connection speed
  const getConnectionSpeed = () => {
    if (typeof navigator === 'undefined') return 'unknown';
    
    // Check if the browser supports the Connection API
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      
      if (conn) {
        if (conn.saveData) return 'slow';
        if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'slow';
        if (conn.effectiveType === '3g') return 'medium';
        if (conn.downlink < 1) return 'slow';
        if (conn.downlink >= 5) return 'fast';
      }
    }
    
    return 'unknown';
  };
  
  // Adjust quality based on connection speed
  const getOptimalQuality = () => {
    const speed = getConnectionSpeed();
    
    if (priority) return quality; // Never reduce priority images
    
    if (speed === 'slow') return 'low';
    if (speed === 'medium' && quality === 'high') return 'medium';
    
    return quality;
  };
  
  // Calculate optimal srcSet based on image dimensions and connection
  const getSrcSet = () => {
    const speed = getConnectionSpeed();
    
    // For slow connections, provide smaller images
    if (speed === 'slow' && !priority) {
      return `${src} 150w, ${src} 300w`;
    }
    
    // In production, this would use a real image API with proper width parameters
    return `${src} 300w, ${src} 600w, ${src} 900w`;
  };
  
  // Define optimal sizes attribute based on image context and viewport
  const getSizes = () => {
    return sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  };
  
  useEffect(() => {
    // Add DNS prefetch for image domains to improve lookup times
    if ((priority || preload) && typeof window !== 'undefined') {
      try {
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
      } catch (e) {
        // Fail silently if URL parsing fails
      }
    }
  }, [src, priority, preload]);
  
  useImagePreload(src, { 
    priority, 
    preload, 
    width, 
    quality: getOptimalQuality() 
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Calculate content-visibility based on image position for better rendering performance
  const contentVisibility = isInView ? 'auto' : 'hidden';

  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        contentVisibility,
        // Add aspect ratio to prevent layout shifts
        aspectRatio: `${width}/${height}`
      }}
    >
      {!isLoaded && (
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
            showSpinner={priority} 
            size="medium"
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
          srcSet={getSrcSet()}
          sizes={getSizes()}
          fetchPriority={priority ? "high" : "auto"}
          format={format}
          placeholderColor={derivedPlaceholderColor}
          loading={loading}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
