
import { memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { getOptimizedImageUrl } from "@/utils/imageUtils";
import { ImageLoader } from "./image/ImageLoader";

// More aggressive quality mapping for faster loading
const mapQualityToNumericVal = (quality: "low" | "medium" | "high" | number | undefined): number => {
  if (typeof quality === 'number') return Math.max(10, Math.min(quality, 70)); // Capped at 70
  switch (quality) {
    case "low": return 15; // Very aggressive for thumbnails
    case "medium": return 35; // Aggressive for main images
    case "high": return 55; // Reduced from 70
    default: return 30;
  }
};

const OptimizedImage = memo(({ 
  src, 
  alt = "Balaji Design Studio project gallery image",
  priority = false,
  className = "",
  width = 800,
  height = 600,
  sizes,
  preload = false,
  quality = "medium",
  skipLazyLoading = false,
  placeholderColor: customPlaceholderColor,
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
    rootMargin: "50px" // Increased for earlier loading
  });
  
  const fixedPlaceholderColor = "#E0E0E0";
  const numericQuality = mapQualityToNumericVal(quality);
  const optimizedSrc = getOptimizedImageUrl(src, width, numericQuality, format === "auto" ? "webp" : format);
  const isHeroImage = priority || width >= 1000 || src.includes('hero') || src.includes('main');
  const preloadQuality: "low" | "medium" | "high" = typeof quality === 'string' ? quality : "medium";
  
  useImagePreload(src, {
    priority: priority || isHeroImage, 
    preload: preload || isHeroImage, 
    width, 
    quality: preloadQuality,
    format: format === "auto" ? "webp" : format
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  // Ultra-aggressive srcSet with smaller sizes
  const getSrcSet = () => {
    const widths = [240, 480, 720, 960]; // Reduced sizes for faster loading
    const qualityForSrcSet = numericQuality;
    
    return widths
      .map(w => `${getOptimizedImageUrl(src, w, qualityForSrcSet, format === "auto" ? "webp" : format)} ${w}w`)
      .join(', ');
  };
  
  const getSizesAttribute = () => {
    if (sizes) return sizes;
    return "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"; // Updated breakpoints
  };
  
  useEffect(() => {
    if ((priority || preload || isHeroImage) && typeof window !== 'undefined') {
      try {
        const domain = new URL(src, window.location.origin).hostname;
        
        // DNS prefetch
        if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = `//${domain}`;
          document.head.appendChild(dnsLink);
        }
        
        // Preconnect
        if (!document.querySelector(`link[rel="preconnect"][href="//${domain}"]`)) {
           const preconnectLink = document.createElement('link');
           preconnectLink.rel = 'preconnect';
           preconnectLink.href = `//${domain}`;
           preconnectLink.crossOrigin = 'anonymous';
           document.head.appendChild(preconnectLink);
        }
        
        // Critical image preload
        if ((isHeroImage || priority) && !document.querySelector(`link[rel="preload"][as="image"][href="${optimizedSrc}"]`)) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = optimizedSrc;
          preloadLink.type = 'image/webp';
          preloadLink.fetchPriority = 'high';
          document.head.appendChild(preloadLink);
        }
      } catch (e) { /* Fail silently */ }
    }
  }, [src, optimizedSrc, priority, preload, isHeroImage, format]);

  const contentVisibility = isInView || priority || skipLazyLoading || isHeroImage ? 'auto' : 'hidden';
  
  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        contentVisibility,
        aspectRatio: `${width}/${height}`,
        filter: blur && !isLoaded ? 'blur(10px)' : 'none', // Reduced blur
        transition: 'filter 0.2s ease-out' // Faster transition
      }}
      data-cache-control="public, max-age=31536000"
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton 
            className="w-full h-full" 
            style={{ 
              backgroundColor: customPlaceholderColor || fixedPlaceholderColor,
              opacity: 1
            }} 
          />
          <ImageLoader 
            color={customPlaceholderColor || fixedPlaceholderColor} 
            showSpinner={priority || isHeroImage} 
            size={isHeroImage ? "large" : "medium"}
          />
        </div>
      )}
      
      {(isInView || priority || skipLazyLoading || isHeroImage) && (
        <PictureElement
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority || isHeroImage}
          quality={typeof quality === 'number' ? quality : quality}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 w-full h-full object-cover`} // Faster transition
          onLoad={handleImageLoad}
          srcSet={getSrcSet()}
          sizes={getSizesAttribute()}
          fetchPriority={priority || isHeroImage ? "high" : "auto"}
          format={format}
          placeholderColor={customPlaceholderColor || fixedPlaceholderColor}
          loading={loading || (isHeroImage || priority || skipLazyLoading ? "eager" : "lazy")}
          decoding={decoding || (isHeroImage || priority ? "sync" : "async")}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
