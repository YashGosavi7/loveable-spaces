
import { memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { getOptimizedImageUrl } from "@/utils/imageUtils";
import { ImageLoader } from "./image/ImageLoader";

// Ultra-aggressive quality mapping for mobile speed
const mapQualityToNumericVal = (quality: "low" | "medium" | "high" | number | undefined, isMobile: boolean): number => {
  if (typeof quality === 'number') {
    const mobileAdjustment = isMobile ? -25 : 0; // Reduce quality by 25 points for mobile
    return Math.max(5, Math.min(quality + mobileAdjustment, 50)); // Cap at 50 for mobile
  }
  
  if (isMobile) {
    switch (quality) {
      case "low": return 5; // Extremely aggressive for mobile thumbnails
      case "medium": return 15; // Very aggressive for mobile main images
      case "high": return 25; // Still aggressive for mobile priority images
      default: return 10;
    }
  }
  
  switch (quality) {
    case "low": return 15;
    case "medium": return 35;
    case "high": return 55;
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
  const [isMobile, setIsMobile] = useState(false);
  
  // Safe mobile detection with useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Ultra-aggressive intersection observer for mobile
  const { isInView, elementRef } = useImageIntersection({ 
    priority, 
    skipLazyLoading,
    rootMargin: isMobile ? "20px" : "50px" // Much smaller margin for mobile
  });
  
  const fixedPlaceholderColor = "#E0E0E0";
  const numericQuality = mapQualityToNumericVal(quality, isMobile);
  
  // Mobile-specific optimizations
  const mobileWidth = isMobile ? Math.floor(width * 0.6) : width; // 40% smaller on mobile
  const mobileHeight = isMobile ? Math.floor(height * 0.6) : height;
  
  const optimizedSrc = getOptimizedImageUrl(src, mobileWidth, numericQuality, format === "auto" ? "webp" : format);
  const isHeroImage = priority || width >= 1000 || src.includes('hero') || src.includes('main');
  const preloadQuality: "low" | "medium" | "high" = typeof quality === 'string' ? quality : "medium";
  
  useImagePreload(src, {
    priority: priority || isHeroImage, 
    preload: preload || isHeroImage, 
    width: mobileWidth, 
    quality: preloadQuality,
    format: format === "auto" ? "webp" : format
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  // Ultra-aggressive srcSet with tiny sizes for mobile
  const getSrcSet = () => {
    const baseSizes = isMobile ? [120, 240, 360] : [240, 480, 720, 960]; // Much smaller for mobile
    const qualityForSrcSet = numericQuality;
    
    return baseSizes
      .map(w => `${getOptimizedImageUrl(src, w, qualityForSrcSet, format === "auto" ? "webp" : format)} ${w}w`)
      .join(', ');
  };
  
  const getSizesAttribute = () => {
    if (sizes) return sizes;
    // Mobile-first sizes
    return isMobile ? 
      "(max-width: 640px) 100vw" : 
      "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw";
  };
  
  useEffect(() => {
    if ((priority || preload || isHeroImage) && typeof window !== 'undefined') {
      try {
        const domain = new URL(src, window.location.origin).hostname;
        
        // Skip DNS optimizations on mobile to save time
        if (!isMobile) {
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
        }
        
        // Critical image preload with mobile optimization
        if ((isHeroImage || priority) && !document.querySelector(`link[rel="preload"][as="image"][href="${optimizedSrc}"]`)) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = optimizedSrc;
          preloadLink.type = 'image/webp';
          preloadLink.fetchPriority = 'high';
          if (isMobile) {
            preloadLink.setAttribute('importance', 'high'); // Mobile priority
          }
          document.head.appendChild(preloadLink);
        }
      } catch (e) { /* Fail silently */ }
    }
  }, [src, optimizedSrc, priority, preload, isHeroImage, format, isMobile]);

  // Ultra-fast content visibility for mobile
  const contentVisibility = (isInView || priority || skipLazyLoading || isHeroImage) ? 'auto' : 'hidden';
  
  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        contentVisibility,
        aspectRatio: `${mobileWidth}/${mobileHeight}`,
        filter: blur && !isLoaded ? (isMobile ? 'blur(5px)' : 'blur(10px)') : 'none', // Less blur on mobile
        transition: isMobile ? 'filter 0.1s ease-out' : 'filter 0.2s ease-out' // Faster transition on mobile
      }}
      data-cache-control="public, max-age=31536000"
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton 
            className="w-full h-full" 
            style={{ 
              backgroundColor: customPlaceholderColor || fixedPlaceholderColor,
              opacity: isMobile ? 0.3 : 1 // Lower opacity on mobile for faster perceived loading
            }} 
          />
          {/* Skip spinner on mobile for faster loading */}
          {!isMobile && (
            <ImageLoader 
              color={customPlaceholderColor || fixedPlaceholderColor} 
              showSpinner={priority || isHeroImage} 
              size={isHeroImage ? "large" : "medium"}
            />
          )}
        </div>
      )}
      
      {(isInView || priority || skipLazyLoading || isHeroImage) && (
        <PictureElement
          src={optimizedSrc}
          alt={alt}
          width={mobileWidth}
          height={mobileHeight}
          priority={priority || isHeroImage}
          quality={typeof quality === 'number' ? quality : quality}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity ${isMobile ? 'duration-100' : 'duration-200'} w-full h-full object-cover`} // Faster transition on mobile
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
