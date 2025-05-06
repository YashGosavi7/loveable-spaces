
import { memo, useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProps } from "./image/types";
import PictureElement from "./image/PictureElement";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { generatePlaceholderColor, cacheImage } from "@/utils/imageUtils";
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
    rootMargin: "2000px 0px" // Significantly increased threshold for much earlier loading
  });
  
  const mounted = useRef(true);
  
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Determine if this is a hero image or team member image
  const isHeroImage = width >= 1000 || src.includes('hero') || src.includes('main');
  const isTeamMember = src.includes('25d0624e-4f4a-4e2d-a084-f7bf8671b099') || 
                       src.includes('f99d8834-eeec-4f35-b430-48d82f605f55') || 
                       src.includes('d655dd68-cb8a-43fd-8aaa-38db6cd905c1');
  
  // If team member image, always treat as priority
  const isEffectivePriority = priority || isTeamMember;
  
  // Cache the image via service worker when it's a team member or priority image
  useEffect(() => {
    if ((isEffectivePriority || preload || isTeamMember) && typeof window !== 'undefined') {
      cacheImage(src);
    }
  }, [src, isEffectivePriority, preload, isTeamMember]);
  
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
  
  // Adjust quality based on connection speed and image importance
  const getOptimalQuality = () => {
    const speed = getConnectionSpeed();
    
    if (isTeamMember) return quality; // Never reduce team member image quality
    if (isHeroImage) return quality; // Never reduce hero image quality
    
    if (speed === 'slow') return 'low';
    if (speed === 'medium' && quality === 'high') return 'medium';
    
    return quality;
  };
  
  // Use preloading hook for priority images
  useImagePreload(src, { 
    priority: isEffectivePriority, 
    preload: preload || isHeroImage || isTeamMember, 
    width, 
    quality: getOptimalQuality(),
    format: format || "webp"
  });

  const handleImageLoad = () => {
    if (mounted.current) {
      setIsLoaded(true);
      if (onLoad) {
        onLoad();
      }
    }
  };

  // Calculate content-visibility based on image position for better rendering performance
  const contentVisibility = isTeamMember ? 'auto' : (isInView ? 'auto' : 'hidden');
  
  // Add aggressive caching hints via data attributes (picked up by service workers)
  const cachingAttrs = {
    'data-cache-control': isTeamMember || isHeroImage ? 'public, max-age=31536000' : 'public, max-age=31536000, immutable',
  };
  
  // For team member images, we'll use content-visibility: auto to ensure they're always rendered
  const teamMemberStyle = isTeamMember ? { contentVisibility: 'auto', willChange: 'transform' } : {};

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
        transition: 'filter 0.3s ease-out',
        ...teamMemberStyle
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
            showSpinner={isEffectivePriority || isHeroImage || isTeamMember} 
            size={isHeroImage ? "large" : "medium"}
          />
        </div>
      )}
      
      {(isInView || isEffectivePriority || skipLazyLoading || isHeroImage || isTeamMember) && (
        <PictureElement
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={isEffectivePriority || isHeroImage || isTeamMember}
          quality={getOptimalQuality()}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
          onLoad={handleImageLoad}
          fetchPriority={isEffectivePriority || isHeroImage || isTeamMember ? "high" : "auto"}
          format={format}
          placeholderColor={derivedPlaceholderColor}
          loading={isEffectivePriority || isHeroImage || isTeamMember ? "eager" : "lazy"}
          decoding={isEffectivePriority || isHeroImage ? "sync" : "async"}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
