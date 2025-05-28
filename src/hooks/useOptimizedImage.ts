
import { useState, useEffect, useCallback } from 'react';
import { generatePlaceholderColor, isLikelySlowConnection, getOptimizedImageUrl } from '@/utils/imageUtils';

interface UseOptimizedImageProps {
  src: string;
  priority?: boolean;
  preload?: boolean;
  quality?: "low" | "medium" | "high" | number;
  width?: number;
  height?: number;
  lowQualityPreview?: boolean;
  targetFormat?: "webp" | "avif" | "jpeg" | "auto";
}

// More aggressive quality mapping
const mapQualityToNumeric = (quality: "low" | "medium" | "high" | number): number => {
  if (typeof quality === 'number') {
    return Math.max(10, Math.min(quality, 70)); // Capped at 70 for speed
  }
  switch (quality) {
    case "low": return 15; // Very aggressive
    case "medium": return 35; // Aggressive
    case "high": return 50; // Moderate
    default: return 30;
  }
};

export const useOptimizedImage = ({ 
  src, 
  priority = false, 
  preload = false,
  quality = "medium",
  width,
  height,
  lowQualityPreview = true,
  targetFormat = "auto"
}: UseOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false);
  const basePlaceholderColor = "#E0E0E0"; // Fixed color for speed

  const numericQuality = mapQualityToNumeric(quality);
  
  const optimizedSrcUrl = width 
    ? getOptimizedImageUrl(src, width, numericQuality, targetFormat)
    : src;

  // Ultra-small LQIP for instant loading
  const lqipUrl = width && lowQualityPreview
    ? getOptimizedImageUrl(src, Math.min(width, 30), 5, targetFormat) // Tiny 30px max, 5% quality
    : "";

  const aggressiveOptimizations = isLikelySlowConnection();
  
  useEffect(() => {
    if ((!aggressiveOptimizations || priority) && (priority || preload)) {
      const image = new Image();
      if ('fetchpriority' in image) {
        (image as any).fetchpriority = priority ? 'high' : 'auto';
      }
      if ('loading' in image) {
        image.loading = priority ? 'eager' : 'lazy';
      }
      image.src = optimizedSrcUrl;
      image.onload = () => setIsLoaded(true);
      if (width) image.width = width;
      if (height) image.height = height;
    }
  }, [optimizedSrcUrl, priority, preload, width, height, aggressiveOptimizations]);
  
  useEffect(() => {
    if (lowQualityPreview && lqipUrl) {
      const lqipImage = new Image();
      lqipImage.src = lqipUrl;
      lqipImage.onload = () => setLqipLoaded(true);
    } else if (!lowQualityPreview) {
      setLqipLoaded(true);
    }
  }, [lqipUrl, lowQualityPreview]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return {
    isLoaded,
    lqipLoaded,
    handleImageLoad,
    placeholderColor: basePlaceholderColor,
    isSlowConnection: aggressiveOptimizations,
    optimizedSrcUrl,
    lqipUrl
  };
};
