
import { useState, useEffect, useCallback } from 'react';
import { generatePlaceholderColor, isLikelySlowConnection } from '@/utils/imageUtils';

interface UseOptimizedImageProps {
  src: string;
  priority?: boolean;
  preload?: boolean;
  quality?: "low" | "medium" | "high";
  width?: number;
  height?: number;
  lowQualityPreview?: boolean;
}

export const useOptimizedImage = ({ 
  src, 
  priority = false, 
  preload = false,
  quality = "medium",
  width,
  height,
  lowQualityPreview = true
}: UseOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false);
  const placeholderColor = generatePlaceholderColor(src);
  
  // Generate low quality image placeholder URL
  const getLqipUrl = useCallback(() => {
    // In production, this would generate a real thumbnail URL
    // For now, we're just using the original image
    return src;
  }, [src]);
  
  // Determine if we should use aggressive loading optimizations
  const useAggressiveOptimizations = useCallback(() => {
    return isLikelySlowConnection();
  }, []);
  
  // Load the main image
  useEffect(() => {
    // Skip preloading on slow connections unless priority is true
    if ((!useAggressiveOptimizations() || priority) && (priority || preload)) {
      const preloadImage = new Image();
      
      // Set image loading attributes
      if ('fetchpriority' in preloadImage) {
        (preloadImage as any).fetchpriority = priority ? 'high' : 'auto';
      }
      
      if ('loading' in preloadImage) {
        preloadImage.loading = priority ? 'eager' : 'lazy';
      }
      
      if ('decoding' in preloadImage) {
        preloadImage.decoding = priority ? 'sync' : 'async';
      }
      
      // Load the image
      preloadImage.src = src;
      preloadImage.onload = () => setIsLoaded(true);
      
      // Set image dimensions if available
      if (width) preloadImage.width = width;
      if (height) preloadImage.height = height;
    }
  }, [src, priority, preload, width, height, useAggressiveOptimizations]);
  
  // Load LQIP for immediate visual feedback
  useEffect(() => {
    if (lowQualityPreview) {
      const lqipImage = new Image();
      lqipImage.src = getLqipUrl();
      lqipImage.onload = () => setLqipLoaded(true);
    }
  }, [getLqipUrl, lowQualityPreview]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return {
    isLoaded,
    lqipLoaded,
    handleImageLoad,
    placeholderColor,
    isSlowConnection: useAggressiveOptimizations(),
    lqipUrl: getLqipUrl()
  };
};
