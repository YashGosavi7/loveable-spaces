
import { memo } from 'react';
import { ImageProps } from './types';
import { generatePlaceholderColor, getImageFormatSupport } from '@/utils/imageUtils';
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
  placeholderColor
}: PictureElementProps) => {
  // Get or generate placeholder color
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Check image format support
  const { webp, avif } = getImageFormatSupport();
  
  // Calculate optimal srcSet based on image dimensions
  const getSrcSet = () => {
    if (srcSet) return srcSet;
    
    // Create scaled srcset for responsive images
    // In production, this would call an actual image resize API
    const widths = [300, 600, 900, 1200, 1800];
    const relevantWidths = widths.filter(w => w <= Math.min(width * 2, 1800));
    
    if (relevantWidths.length === 0) {
      relevantWidths.push(width);
    }
    
    return relevantWidths
      .map(w => `${src} ${w}w`)
      .join(', ');
  };
  
  // Define optimal sizes attribute based on image context
  const getSizes = () => {
    if (sizes) return sizes;
    
    // Hero images get full width
    if (width >= 1000) {
      return "(max-width: 640px) 100vw, 100vw";
    }
    
    // Gallery images
    if (width >= 600) {
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px";
    }
    
    // Thumbnail images
    return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px";
  };

  // Determine fetch priority for browser optimization
  const actualFetchPriority = fetchPriority || (priority ? "high" : "auto");

  return (
    <picture className="w-full h-full">
      {/* Use AVIF for supported browsers */}
      {avif && format !== 'webp' && format !== 'jpeg' && (
        <source 
          type="image/avif" 
          srcSet={getSrcSet()}
          sizes={getSizes()} 
          data-fetchpriority={actualFetchPriority}
        />
      )}
      
      {/* WebP for broad support */}
      {webp && format !== 'jpeg' && (
        <source 
          type="image/webp" 
          srcSet={getSrcSet()}
          sizes={getSizes()}
          data-fetchpriority={actualFetchPriority}
        />
      )}
      
      {/* JPEG/PNG fallback for legacy browsers */}
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
        loading={priority ? "eager" : "lazy"}
        quality={quality}
      />
    </picture>
  );
});

PictureElement.displayName = "PictureElement";

export default PictureElement;
