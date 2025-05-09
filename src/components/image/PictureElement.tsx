import { memo, useEffect } from 'react';
import { ImageProps } from './types';
import { generatePlaceholderColor, cacheImage } from '@/utils/imageUtils';
import ImageSource from './ImageSource';
import ResponsiveImage from './ResponsiveImage';

interface PictureElementProps extends ImageProps {
  onLoad: () => void;
}

const PictureElement = memo(({ 
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
  placeholderColor,
  loading,
  decoding = "async"
}: PictureElementProps) => {
  // Get or generate placeholder color
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Detect if user might be from India based on time zone 
  // This is a simplified approach; in production, use IP-based geolocation
  const isPossiblyIndianUser = () => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZone.includes('Asia/Kolkata') || timeZone.includes('Asia/Calcutta');
    } catch (e) {
      return false;
    }
  };
  
  const isIndia = isPossiblyIndianUser();
  
  // Calculate optimal srcSet based on image dimensions
  const getSrcSet = () => {
    if (srcSet) return srcSet;
    
    // For hero images (larger dimensions)
    if (width >= 1000) {
      return `${src} 600w, ${src} 1200w, ${src} 1800w`;
    }
    
    // For thumbnails (smaller dimensions)
    return `${src} 300w, ${src} 600w, ${src} 900w`;
  };
  
  // Define optimal sizes attribute based on image context
  const getSizes = () => {
    if (sizes) return sizes;
    
    // Hero images get full width
    if (width >= 1000) {
      return "(max-width: 768px) 600px, 1200px";
    }
    
    // Gallery or thumbnail images use responsive sizing
    return "(max-width: 768px) 300px, 600px";
  };

  // Determine fetch priority for browser optimization
  const actualFetchPriority = fetchPriority || (priority ? "high" : "auto");
  
  // Determine loading attribute
  const actualLoading = loading || (priority ? "eager" : "lazy");

  // Use service worker to cache the image
  useEffect(() => {
    if (priority && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Call the cacheImage function to notify service worker
      if (src) {
        cacheImage(src);
      }
    }
  }, [src, priority]);

  return (
    <picture className="w-full h-full">
      {/* AVIF for best compression - highest priority */}
      <ImageSource 
        src={src} 
        type="avif" 
        srcSet={getSrcSet()}
        sizes={getSizes()} 
        quality={quality}
        isIndia={isIndia}
      />
      
      {/* WebP as primary format with good browser support */}
      <ImageSource 
        src={src} 
        type="webp" 
        srcSet={getSrcSet()}
        sizes={getSizes()}
        quality={quality}
        isIndia={isIndia}
      />
      
      {/* JPEG fallback for legacy browsers */}
      <source 
        type="image/jpeg" 
        srcSet={getSrcSet()}
        sizes={getSizes()}
        data-fetchpriority={actualFetchPriority}
      />
      
      <ResponsiveImage
        src={src}
        alt={alt}
        className={`${className} w-full h-full`}
        width={width}
        height={height}
        priority={priority}
        onLoad={onLoad}
        placeholderColor={derivedPlaceholderColor}
        fetchPriority={actualFetchPriority}
        loading={actualLoading}
        quality={quality}
        decoding={decoding}
      />
    </picture>
  );
});

PictureElement.displayName = "PictureElement";

export default PictureElement;
