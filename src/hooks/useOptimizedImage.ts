
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

// Ultra-aggressive quality mapping for mobile
const mapQualityToNumeric = (quality: "low" | "medium" | "high" | number, isMobile: boolean): number => {
  if (typeof quality === 'number') {
    const mobileReduction = isMobile ? 30 : 0; // Reduce by 30 points for mobile
    return Math.max(5, Math.min(quality - mobileReduction, 40)); // Cap at 40 for mobile
  }
  
  if (isMobile) {
    switch (quality) {
      case "low": return 5; // Extremely aggressive
      case "medium": return 12; // Very aggressive  
      case "high": return 20; // Still aggressive
      default: return 8;
    }
  }
  
  switch (quality) {
    case "low": return 15;
    case "medium": return 35;
    case "high": return 50;
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
  const basePlaceholderColor = "#E0E0E0";

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const numericQuality = mapQualityToNumeric(quality, isMobile);
  
  // Mobile-specific width optimization
  const optimizedWidth = isMobile && width ? Math.floor(width * 0.6) : width; // 40% smaller on mobile
  
  const optimizedSrcUrl = optimizedWidth 
    ? getOptimizedImageUrl(src, optimizedWidth, numericQuality, targetFormat)
    : src;

  // Ultra-tiny LQIP for mobile
  const lqipUrl = optimizedWidth && lowQualityPreview
    ? getOptimizedImageUrl(src, isMobile ? 15 : 30, 3, targetFormat) // Extremely tiny for mobile
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
      
      // Mobile-specific optimizations
      if (isMobile) {
        image.decoding = 'sync'; // Faster decoding on mobile
        if ('importance' in image) {
          (image as any).importance = priority ? 'high' : 'auto';
        }
      }
      
      image.src = optimizedSrcUrl;
      image.onload = () => setIsLoaded(true);
      if (optimizedWidth) image.width = optimizedWidth;
      if (height) image.height = isMobile ? Math.floor(height * 0.6) : height;
    }
  }, [optimizedSrcUrl, priority, preload, optimizedWidth, height, aggressiveOptimizations, isMobile]);
  
  useEffect(() => {
    if (lowQualityPreview && lqipUrl) {
      const lqipImage = new Image();
      lqipImage.src = lqipUrl;
      lqipImage.onload = () => setLqipLoaded(true);
      
      // Mobile-specific LQIP optimization
      if (isMobile) {
        lqipImage.decoding = 'sync';
        lqipImage.loading = 'eager';
      }
    } else if (!lowQualityPreview) {
      setLqipLoaded(true);
    }
  }, [lqipUrl, lowQualityPreview, isMobile]);

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
    lqipUrl,
    isMobile
  };
};
