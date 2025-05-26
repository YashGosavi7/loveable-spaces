
import { memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types"; // Assuming ImageProps defines quality as string or number
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
// import { generatePlaceholderColor } from "@/utils/imageUtils"; // We might not use this directly for fixed color
import { getOptimizedImageUrl } from "@/utils/imageUtils"; // For srcSet generation
import { ImageLoader } from "./image/ImageLoader";

// Helper to map quality prop to a numeric value for getOptimizedImageUrl
const mapQualityToNumericVal = (quality: "low" | "medium" | "high" | number | undefined): number => {
  if (typeof quality === 'number') return Math.max(10, Math.min(quality, 90));
  switch (quality) {
    case "low": return 25; // More aggressive for low (aiming for ~10KB thumbnails)
    case "medium": return 45; // More aggressive for medium (aiming for ~40KB main images)
    case "high": return 70;
    default: return 50;
  }
};

const OptimizedImage = memo(({ 
  src, 
  alt = "Balaji Design Studio project gallery image", // Default alt text for gallery
  priority = false,
  className = "",
  width = 800,
  height = 600,
  sizes,
  preload = false,
  quality = "medium", // This can be "low", "medium", "high", or a number
  skipLazyLoading = false,
  placeholderColor: customPlaceholderColor, // Allow overriding placeholder color
  format = "auto", // "webp", "avif", "jpeg", "auto"
  loading,
  decoding = "async",
  blur = false, // If we want a blur up effect
  onLoad
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isInView, elementRef } = useImageIntersection({ 
    priority, 
    skipLazyLoading,
    rootMargin: "25px" // Updated: Lazy load 25px from viewport
  });
  
  const fixedPlaceholderColor = "#E0E0E0"; // User requested light gray placeholder

  // Determine numeric quality for optimizations
  const numericQuality = mapQualityToNumericVal(quality);

  // Generate the primary optimized src URL
  const optimizedSrc = getOptimizedImageUrl(src, width, numericQuality, format === "auto" ? "webp" : format);
  
  // Determine if this is a hero image based on dimensions or priority
  const isHeroImage = priority || width >= 1000 || src.includes('hero') || src.includes('main');
  
  // Adjust quality for preloading based on connection speed (useImagePreload might do this internally)
  const preloadQuality = kwaliteit: "low" | "medium" | "high" = typeof quality === 'string' ? quality : "medium";
  
  useImagePreload(src, { // Preload original src, CDN will handle optimization based on params
    priority: priority || isHeroImage, 
    preload: preload || isHeroImage, 
    width, 
    quality: preloadQuality, // Pass string quality
    format: format === "auto" ? "webp" : format
  });

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  const getEffectiveQuality = () => {
    // For CDN parameters, we'll use the numeric quality directly
    // This function could be more complex if we vary quality by network.
    return numericQuality;
  };

  // Generate srcSet using getOptimizedImageUrl for each variant
  const getSrcSet = () => {
    const widths = [300, 600, 900, 1200, 1800]; // Define a set of widths for srcSet
    const qualityForSrcSet = getEffectiveQuality(); // Use consistent quality for srcSet variants
    
    return widths
      .map(w => `${getOptimizedImageUrl(src, w, qualityForSrcSet, format === "auto" ? "webp" : format)} ${w}w`)
      .join(', ');
  };
  
  // Define optimal sizes attribute for responsive images
  const getSizesAttribute = () => {
    if (sizes) return sizes;
    // Default sizes based on user's request
    return "(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw";
  };
  
  useEffect(() => {
    // DNS prefetch and preconnect (already in useImagePreload, but can be here for direct effect)
    if ((priority || preload || isHeroImage) && typeof window !== 'undefined') {
      try {
        const domain = new URL(src, window.location.origin).hostname;
        if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = `//${domain}`;
          document.head.appendChild(dnsLink);
        }
        if (!document.querySelector(`link[rel="preconnect"][href="//${domain}"]`)) {
           const preconnectLink = document.createElement('link');
           preconnectLink.rel = 'preconnect';
           preconnectLink.href = `//${domain}`;
           preconnectLink.crossOrigin = 'anonymous';
           document.head.appendChild(preconnectLink);
        }
        
        // Add preload link for hero/priority images (useImagePreload also handles this)
        if ((isHeroImage || priority) && !document.querySelector(`link[rel="preload"][as="image"][href="${optimizedSrc}"]`)) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = optimizedSrc; // Preload the already optimized URL
          preloadLink.type = format === "auto" || format === "webp" ? 'image/webp' : (format === "avif" ? 'image/avif' : 'image/jpeg');
          preloadLink.fetchPriority = 'high';
          document.head.appendChild(preloadLink);
        }
      } catch (e) { /* Fail silently */ }
    }
  }, [src, optimizedSrc, priority, preload, isHeroImage, format]);

  const contentVisibility = isInView || priority || skipLazyLoading || isHeroImage ? 'auto' : 'hidden';
  
  const cachingAttrs = {
    'data-cache-control': 'public, max-age=15552000', // 180 days browser caching
  };

  // For the 500-byte LQIP, we would ideally use a base64 tiny placeholder.
  // For now, the skeleton with fixed color serves as placeholder.
  // A true LQIP would involve `lqipUrl` from `useOptimizedImage` hook if it were enhanced to provide one.

  return (
    <div 
      ref={elementRef} 
      className="relative w-full h-full" 
      style={{ 
        contentVisibility,
        aspectRatio: `${width}/${height}`,
        filter: blur && !isLoaded ? 'blur(20px)' : 'none', // Optional blur up
        transition: 'filter 0.3s ease-out'
      }}
      {...cachingAttrs}
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton 
            className="w-full h-full" 
            style={{ 
              backgroundColor: customPlaceholderColor || fixedPlaceholderColor, // Use custom or fixed
              opacity: 1 // Make placeholder fully visible
            }} 
          />
          {/* ImageLoader can be conditional based on priority or if LQIP is not sufficient */}
          <ImageLoader 
            color={customPlaceholderColor || fixedPlaceholderColor} 
            showSpinner={priority || isHeroImage} 
            size={isHeroImage ? "large" : "medium"}
          />
        </div>
      )}
      
      {(isInView || priority || skipLazyLoading || isHeroImage) && (
        <PictureElement
          src={optimizedSrc} // Pass the optimized src
          alt={alt}
          width={width}
          height={height}
          priority={priority || isHeroImage}
          quality={typeof quality === 'number' ? quality : quality} // Pass original quality prop
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
          onLoad={handleImageLoad}
          srcSet={getSrcSet()} // Use the new srcSet
          sizes={getSizesAttribute()} // Use the new sizes
          fetchPriority={priority || isHeroImage ? "high" : "auto"}
          format={format} // Pass format down for PictureElement to choose sources
          placeholderColor={customPlaceholderColor || fixedPlaceholderColor} // Pass down placeholder color
          loading={loading || (isHeroImage || priority || skipLazyLoading ? "eager" : "lazy")}
          decoding={decoding || (isHeroImage || priority ? "sync" : "async")}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;

