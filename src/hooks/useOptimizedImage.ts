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
  cacheSeconds?: number;
}

export const useOptimizedImage = ({ 
  src, 
  priority = false, 
  preload = false,
  quality = "medium",
  width,
  height,
  lowQualityPreview = true,
  cacheSeconds = 86400 // Default: cache for 1 day
}: UseOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false);
  const placeholderColor = generatePlaceholderColor(src);
  
  // Generate low quality image placeholder URL with cache-busting
  const getLqipUrl = useCallback(() => {
    // In production, this would generate a real thumbnail URL
    // Add a cache parameter if needed
    const cacheBuster = !cacheSeconds ? `_cb=${Date.now()}` : '';
    const separator = src.includes('?') ? '&' : '?';
    return src + (cacheBuster ? `${separator}${cacheBuster}` : '');
  }, [src, cacheSeconds]);
  
  // Determine if we should use aggressive loading optimizations
  const useAggressiveOptimizations = useCallback(() => {
    return isLikelySlowConnection();
  }, []);
  
  // Add support for image loading via Intersection Observer API
  const setupIntersectionObserver = useCallback(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    if (priority) return; // Skip for priority images
    
    const imgElement = new Image();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          imgElement.src = src;
          imgElement.onload = () => setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when image is within 200px of viewport
    );
    
    // Simulate observer target (will be connected to real DOM in component)
    const target = document.createElement('div');
    observer.observe(target);
    
    return () => observer.disconnect();
  }, [src, priority]);
  
  // Preload high-priority images and LQIP for immediate visual feedback
  useEffect(() => {
    // Skip aggressive optimizations for priority images
    if ((!useAggressiveOptimizations() || priority) && (priority || preload)) {
      const preloadImage = new Image();
      
      // Set image loading attributes for better performance
      if ('fetchpriority' in preloadImage) {
        (preloadImage as any).fetchpriority = priority ? 'high' : 'auto';
      }
      
      if ('loading' in preloadImage) {
        preloadImage.loading = priority ? 'eager' : 'lazy';
      }
      
      if ('decoding' in preloadImage) {
        preloadImage.decoding = priority ? 'sync' : 'async';
      }
      
      // Apply cache control if supported by browser
      if ('attributionSrc' in preloadImage) {
        // This is a workaround to add cache hints
        // In real implementation, you'd use proper CDN cache-control headers
        preloadImage.setAttribute('data-cache-control', `public, max-age=${cacheSeconds}`);
      }
      
      // Load the image
      preloadImage.src = src;
      preloadImage.onload = () => setIsLoaded(true);
      
      // Set image dimensions if available to avoid layout shifts
      if (width) preloadImage.width = width;
      if (height) preloadImage.height = height;
    } else {
      // Otherwise use intersection observer approach
      setupIntersectionObserver();
    }
  }, [src, priority, preload, width, height, useAggressiveOptimizations, setupIntersectionObserver, cacheSeconds]);
  
  // Always load LQIP for immediate visual feedback
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
    lqipUrl: getLqipUrl(),
    intersectionObserver: setupIntersectionObserver
  };
};
