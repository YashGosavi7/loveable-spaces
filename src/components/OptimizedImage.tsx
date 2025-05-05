
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
  decoding = "async",
  blur = false,
  onLoad
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isInView, elementRef } = useImageIntersection({ 
    priority, 
    skipLazyLoading,
    rootMargin: "1600px 0px" // Significantly increased threshold for much earlier loading
  });
  
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Determine if this is a hero image based on dimensions or filename
  const isHeroImage = width >= 1000 || src.includes('hero') || src.includes('main');
  
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
    
    if (isHeroImage) return quality; // Never reduce hero image quality
    
    if (speed === 'slow') return 'low';
    if (speed === 'medium' && quality === 'high') return 'medium';
    
    return quality;
  };
  
  // Calculate optimal srcSet based on whether it's a hero or thumbnail
  const getSrcSet = () => {
    const speed = getConnectionSpeed();
    
    if (isHeroImage) {
      return speed === 'slow' 
        ? `${src} 600w, ${src} 1200w` 
        : `${src} 600w, ${src} 1200w, ${src} 1800w`;
    }
    
    // For thumbnails
    if (speed === 'slow' && !priority) {
      return `${src} 300w, ${src} 600w`;
    }
    
    return `${src} 300w, ${src} 600w, ${src} 900w`;
  };
  
  // Define optimal sizes attribute for responsive images
  const getSizes = () => {
    if (sizes) return sizes;
    
    if (isHeroImage) {
      return "(max-width: 768px) 600px, 1200px";
    }
    
    return "(max-width: 768px) 300px, 600px";
  };
  
  useEffect(() => {
    // Add DNS prefetch for image domains to improve lookup times
    if ((priority || preload || isHeroImage) && typeof window !== 'undefined') {
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
        
        // Add preload link for hero images
        if (isHeroImage && priority) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = src;
          preloadLink.type = 'image/webp'; // Assume WebP is supported for modern browsers
          document.head.appendChild(preloadLink);
        }
      } catch (e) {
        // Fail silently if URL parsing fails
      }
    }
  }, [src, priority, preload, isHeroImage]);
  
  useImagePreload(src, { 
    priority, 
    preload: preload || isHeroImage, 
    width, 
    quality: getOptimalQuality(),
    format: format || "webp"
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Calculate content-visibility based on image position for better rendering performance
  const contentVisibility = isInView ? 'auto' : 'hidden';
  
  // Add aggressive caching hints via data attributes (picked up by service workers)
  const cachingAttrs = {
    'data-cache-control': isHeroImage ? 'public, max-age=31536000' : 'public, max-age=31536000, immutable',
  };

  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        contentVisibility,
        // Add aspect ratio to prevent layout shifts
        aspectRatio: `${width}/${height}`,
        // Apply blur effect if requested and not loaded
        filter: blur && !isLoaded ? 'blur(20px)' : 'none',
        transition: 'filter 0.3s ease-out'
      }}
      {...cachingAttrs}
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
            showSpinner={priority || isHeroImage} 
            size={isHeroImage ? "large" : "medium"}
          />
        </div>
      )}
      
      {(isInView || priority || skipLazyLoading || isHeroImage) && (
        <PictureElement
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority || isHeroImage}
          quality={getOptimalQuality()}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
          onLoad={handleImageLoad}
          srcSet={getSrcSet()}
          sizes={getSizes()}
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

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
