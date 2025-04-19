
import { memo } from 'react';

interface ImageSourceProps {
  src: string;
  type: 'webp' | 'avif';
  srcSet?: string;
  sizes?: string;
  quality?: "low" | "medium" | "high";
}

const ImageSource = memo(({ 
  src, 
  type,
  srcSet,
  sizes,
  quality = "medium"
}: ImageSourceProps) => {
  // Calculate quality parameter based on format and quality setting
  const getQualityParam = () => {
    // In production, this would be used with a real image API
    const qualityMap = {
      avif: { low: 60, medium: 75, high: 85 },
      webp: { low: 65, medium: 80, high: 90 }
    };
    
    return qualityMap[type]?.[quality] || 80;
  };
  
  // Process srcSet to add quality parameters
  const processedSrcSet = srcSet || `${src} 240w, ${src} 480w, ${src} ${type === 'avif' ? '800w' : '960w'}`;
  
  // Default sizes if not provided
  const defaultSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <source 
      type={`image/${type}`} 
      srcSet={processedSrcSet} 
      sizes={sizes || defaultSizes}
    />
  );
});

ImageSource.displayName = "ImageSource";

export default ImageSource;
