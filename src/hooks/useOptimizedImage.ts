
import { useState, useEffect, useCallback } from 'react';
import { generatePlaceholderColor, isLikelySlowConnection, getOptimizedImageUrl } from '@/utils/imageUtils';

interface UseOptimizedImageProps {
  src: string;
  priority?: boolean;
  preload?: boolean;
  quality?: "low" | "medium" | "high" | number; // Allow numeric quality
  width?: number;
  height?: number;
  lowQualityPreview?: boolean; // For LQIP if used
  targetFormat?: "webp" | "avif" | "jpeg" | "auto";
}

// Map string quality to numeric values for getOptimizedImageUrl
const mapQualityToNumeric = (quality: "low" | "medium" | "high" | number): number => {
  if (typeof quality === 'number') {
    return Math.max(10, Math.min(quality, 100));
  }
  switch (quality) {
    case "low": return 30; // Aggressive compression for "low"
    case "medium": return 50; // Target for main images
    case "high": return 75;
    default: return 60;
  }
};

export const useOptimizedImage = ({ 
  src, 
  priority = false, 
  preload = false,
  quality = "medium",
  width,
  height,
  lowQualityPreview = true, // Defaulting to true if we want to show LQIP
  targetFormat = "auto"
}: UseOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false); // For LQIP state
  const basePlaceholderColor = generatePlaceholderColor(src); // Original dynamic color

  const numericQuality = mapQualityToNumeric(quality);
  
  const optimizedSrcUrl = width 
    ? getOptimizedImageUrl(src, width, numericQuality, targetFormat)
    : src;

  // LQIP URL would be a very low quality, small version of the image
  // For a 500-byte LQIP, this would typically be a base64 encoded tiny image.
  // Here, we generate a URL for a very small version.
  const lqipUrl = width && lowQualityPreview
    ? getOptimizedImageUrl(src, Math.min(width, 50), 10, targetFormat) // 10 quality, max 50px wide for LQIP
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
      // If not using LQIP, consider lqipLoaded as true to not block main image
      setLqipLoaded(true);
    }
  }, [lqipUrl, lowQualityPreview]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return {
    isLoaded,
    lqipLoaded, // Indicates if the Low Quality Image Placeholder is loaded
    handleImageLoad,
    placeholderColor: basePlaceholderColor, // The dynamic one, can be overridden in component
    isSlowConnection: aggressiveOptimizations,
    optimizedSrcUrl, // The main optimized image URL
    lqipUrl // The URL for the Low Quality Image Placeholder
  };
};
