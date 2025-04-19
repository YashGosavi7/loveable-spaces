
import { memo } from 'react';
import { ImageProps } from './types';
import { generatePlaceholderColor } from '@/utils/imageUtils';
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
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src);
  
  // Calculate optimal width for different screen sizes
  const getOptimalWidth = () => {
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      if (vw < 640) return Math.min(width, 240);
      if (vw < 1024) return Math.min(width, 480);
      return width;
    }
    return width;
  };

  // Calculate optimal height based on aspect ratio
  const getOptimalHeight = () => {
    const optimalWidth = getOptimalWidth();
    const aspectRatio = width / height;
    return Math.round(optimalWidth / aspectRatio);
  };

  return (
    <picture>
      {/* AVIF for best compression */}
      <ImageSource 
        src={src} 
        type="avif" 
        srcSet={srcSet} 
        sizes={sizes} 
        quality={quality} 
      />
      
      {/* WebP as primary format with good browser support */}
      <ImageSource 
        src={src} 
        type="webp" 
        srcSet={srcSet} 
        sizes={sizes}
        quality={quality}
      />
      
      {/* JPEG fallback for legacy browsers */}
      <source 
        type="image/jpeg" 
        srcSet={srcSet || `${src} 480w, ${src} ${width}w`} 
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      />
      
      <ResponsiveImage
        src={src}
        alt={alt}
        className={className}
        width={getOptimalWidth()}
        height={getOptimalHeight()}
        priority={priority}
        onLoad={onLoad}
        placeholderColor={derivedPlaceholderColor}
        fetchPriority={fetchPriority || (priority ? "high" : "auto")}
        loading={priority ? "eager" : "lazy"}
        quality={quality}
      />
    </picture>
  );
});

PictureElement.displayName = "PictureElement";

export default PictureElement;
