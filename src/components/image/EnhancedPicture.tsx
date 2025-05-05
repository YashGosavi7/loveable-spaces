
import { memo, useState, useEffect } from 'react';
import { supportsWebP, supportsAVIF, getOptimalQuality } from '@/utils/imageOptimization';
import { ImageProps } from './types';
import ResponsiveImage from './ResponsiveImage';

interface EnhancedPictureProps extends ImageProps {
  onLoad?: () => void;
}

const EnhancedPicture = memo(({ 
  src, 
  alt, 
  className = '',
  width = 800,
  height = 600,
  priority = false,
  quality = "medium",
  onLoad,
  srcSet,
  sizes,
  fetchPriority,
  format = "auto",
  placeholderColor
}: EnhancedPictureProps) => {
  const [hasWebP, setHasWebP] = useState<boolean | null>(null);
  const [hasAVIF, setHasAVIF] = useState<boolean | null>(null);
  
  // Detect supported formats on client
  useEffect(() => {
    if (hasWebP === null) {
      setHasWebP(supportsWebP());
    }
    
    if (hasAVIF === null) {
      setHasAVIF(supportsAVIF());
    }
  }, [hasWebP, hasAVIF]);
  
  // Convert quality string to number
  const getQualityNumber = (qualityStr: "low" | "medium" | "high"): number => {
    const qualityMap = {
      low: 70,
      medium: 80,
      high: 90
    };
    return qualityMap[qualityStr];
  };
  
  // Determine optimal sizes attribute if not provided
  const optimalSizes = sizes || ((width >= 1200) 
    ? '100vw' 
    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw');
  
  // Determine optimal srcSet if not provided
  const optimalSrcSet = srcSet || (width >= 1200 
    ? `${src} 640w, ${src} 1280w, ${src} 1920w` 
    : `${src} 320w, ${src} 640w, ${src} 960w`);

  return (
    <picture>
      {/* AVIF (best compression) - Add only if browser supports it or we're unsure */}
      {(hasAVIF === true || hasAVIF === null) && (
        <source 
          type="image/avif" 
          srcSet={optimalSrcSet}
          sizes={optimalSizes}
          data-fetchpriority={priority ? "high" : "auto"}
        />
      )}
      
      {/* WebP - Better support than AVIF */}
      {(hasWebP === true || hasWebP === null || !hasAVIF) && (
        <source 
          type="image/webp" 
          srcSet={optimalSrcSet}
          sizes={optimalSizes}
          data-fetchpriority={priority ? "high" : "auto"}
        />
      )}
      
      {/* JPEG/PNG fallback for legacy browsers */}
      <source 
        type="image/jpeg" 
        srcSet={optimalSrcSet}
        sizes={optimalSizes}
        data-fetchpriority={priority ? "high" : "auto"}
      />
      
      <ResponsiveImage
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        priority={priority}
        onLoad={onLoad}
        placeholderColor={placeholderColor || '#f5f2ed'}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        quality={quality}
      />
    </picture>
  );
});

EnhancedPicture.displayName = "EnhancedPicture";

export default EnhancedPicture;
