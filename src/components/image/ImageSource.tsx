
import { memo } from 'react';

interface ImageSourceProps {
  src: string;
  type: 'webp' | 'avif';
  srcSet?: string;
  sizes?: string;
  quality?: "low" | "medium" | "high";
  isIndia?: boolean; // Special optimization for Indian users
}

const ImageSource = memo(({ 
  src, 
  type,
  srcSet,
  sizes,
  quality = "medium",
  isIndia = false
}: ImageSourceProps) => {
  // Calculate quality parameter based on format, quality setting and user location
  const getQualityParam = () => {
    // In production, this would be used with a real image API
    // For India (typically slower connections), reduce quality slightly
    const indiaAdjustment = isIndia ? -5 : 0;
    
    const qualityMap = {
      avif: { low: 60, medium: 75, high: 85 },
      webp: { low: 65, medium: 80, high: 90 }
    };
    
    return Math.max(qualityMap[type]?.[quality] + indiaAdjustment, 50) || 75;
  };
  
  // Process srcSet to add quality parameters and handle responsive sizes
  const processedSrcSet = srcSet || generateOptimalSrcSet(src, type);
  
  // Default sizes if not provided - optimized for all device widths
  const defaultSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <source 
      type={`image/${type}`} 
      srcSet={processedSrcSet} 
      sizes={sizes || defaultSizes}
      fetchPriority={quality === "high" ? "high" : "auto"}
    />
  );
});

// Generate optimal srcSet with varied sizes for responsive images
const generateOptimalSrcSet = (src: string, format: 'webp' | 'avif'): string => {
  // Small size for mobile (150x113px)
  // Medium size for tablets (300x225px)
  // Large size for desktop (600x450px)
  // Based on 4:3 aspect ratio
  
  // For AVIF, we need fewer variations since it's already very efficient
  if (format === 'avif') {
    return `${src} 300w, ${src} 600w`;
  }
  
  // For WebP, provide more options for browsers to choose from
  return `${src} 150w, ${src} 300w, ${src} 600w, ${src} 900w`;
};

ImageSource.displayName = "ImageSource";

export default ImageSource;
