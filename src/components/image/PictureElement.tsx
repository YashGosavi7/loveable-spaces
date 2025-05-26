
import { memo, useEffect } from 'react';
import { ImageProps } from './types'; // Ensure ImageProps defines format
import { generatePlaceholderColor, cacheImage, getOptimizedImageUrl } from '@/utils/imageUtils';
import ImageSource from './ImageSource'; // This component needs to handle format correctly
import ResponsiveImage from './ResponsiveImage';

interface PictureElementProps extends ImageProps {
  onLoad: () => void;
}

// Map quality prop to a numeric value
const mapQualityToNum = (quality: "low" | "medium" | "high" | number | undefined): number => {
  if (typeof quality === 'number') return Math.max(10, Math.min(quality, 90));
  switch (quality) {
    case "low": return 25;
    case "medium": return 45;
    case "high": return 70;
    default: return 50;
  }
};

const PictureElement = memo(({ 
  src, // This src is already optimized by OptimizedImage.tsx
  alt, 
  className = '',
  width = 800,
  height = 600,
  priority = false,
  quality = "medium", // String or number
  onLoad,
  srcSet, // This srcSet is already optimized by OptimizedImage.tsx
  sizes,
  fetchPriority,
  format = "auto", // Crucial prop: "auto", "webp", "avif", "jpeg"
  placeholderColor,
  loading,
  decoding = "async"
}: PictureElementProps) => {
  const derivedPlaceholderColor = placeholderColor || generatePlaceholderColor(src) || "#E0E0E0";
  const numericQuality = mapQualityToNum(quality);

  // If srcSet is provided, use it directly. Otherwise, generate one.
  // The srcSet from OptimizedImage should be used.
  const effectiveSrcSet = srcSet || 
    [300, 600, 900, 1200, 1800]
    .map(w => `${getOptimizedImageUrl(src, w, numericQuality, format === "auto" ? "webp" : format)} ${w}w`)
    .join(', ');

  const actualFetchPriority = fetchPriority || (priority ? "high" : "auto");
  const actualLoading = loading || (priority ? "eager" : "lazy");

  useEffect(() => {
    if (priority && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (src) cacheImage(src);
    }
  }, [src, priority]);

  // isIndia check can be removed if not strictly needed or refined
  // const isPossiblyIndianUser = () => { /* ... */ };
  // const isIndia = isPossiblyIndianUser();

  return (
    <picture className="w-full h-full">
      {/* AVIF source if format is 'auto' or 'avif' */}
      {(format === "auto" || format === "avif") && (
        <ImageSource 
          src={src} // Base src for AVIF generation
          type="avif" 
          srcSet={
            [300, 600, 900, 1200, 1800]
            .map(w => `${getOptimizedImageUrl(src, w, numericQuality, "avif")} ${w}w`)
            .join(', ')
          }
          sizes={sizes} 
          quality={quality} // Pass original quality prop
          // isIndia={isIndia} // Conditional logic if needed
        />
      )}
      
      {/* WebP source if format is 'auto' or 'webp' */}
      {(format === "auto" || format === "webp") && (
        <ImageSource 
          src={src} // Base src for WebP generation
          type="webp" 
          srcSet={
             [300, 600, 900, 1200, 1800]
            .map(w => `${getOptimizedImageUrl(src, w, numericQuality, "webp")} ${w}w`)
            .join(', ')
          }
          sizes={sizes}
          quality={quality} // Pass original quality prop
          // isIndia={isIndia}
        />
      )}
      
      {/* JPEG fallback source if format is 'auto' or 'jpeg', or as ultimate fallback */}
      {(format === "auto" || format === "jpeg") && (
         <source 
          type="image/jpeg" 
          srcSet={
            [300, 600, 900, 1200, 1800]
            .map(w => `${getOptimizedImageUrl(src, w, numericQuality, "jpeg")} ${w}w`)
            .join(', ')
          }
          sizes={sizes}
          data-fetchpriority={actualFetchPriority}
        />
      )}
      
      <ResponsiveImage
        src={src} // The primary optimized src
        alt={alt}
        className={`${className} w-full h-full`}
        width={width}
        height={height}
        priority={priority}
        onLoad={onLoad}
        placeholderColor={derivedPlaceholderColor}
        fetchPriority={actualFetchPriority}
        loading={actualLoading}
        quality={quality} // Pass original quality prop
        decoding={decoding}
      />
    </picture>
  );
});

PictureElement.displayName = "PictureElement";

export default PictureElement;

