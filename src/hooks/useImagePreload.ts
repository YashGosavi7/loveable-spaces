import { useEffect, useRef } from 'react';
import { isLikelySlowConnection } from '@/utils/imageUtils';

interface PreloadOptions {
  priority?: boolean;
  preload?: boolean;
  width?: number;
  quality?: "low" | "medium" | "high";
  format?: "auto" | "webp" | "avif";
}

// Keep track of preloaded images to avoid duplicates
const preloadedImages = new Set<string>();

// Maximum number of images to preload at once to prevent network overload
const MAX_CONCURRENT_PRELOADS = 5;
let currentPreloadCount = 0;

export const useImagePreload = (src: string, options: PreloadOptions = {}) => {
  const { priority = false, preload = false, width, quality = "medium", format = "auto" } = options;
  const attemptedRef = useRef(false);

  useEffect(() => {
    // Only preload if:
    // 1. It's a priority image, or 
    // 2. It's marked for preload AND not a slow connection (unless it's priority)
    // 3. We haven't exceeded our concurrent preload limit
    const shouldPreload = (priority || (preload && (!isLikelySlowConnection() || priority))) && 
                          currentPreloadCount < MAX_CONCURRENT_PRELOADS;
    
    if (shouldPreload && typeof window !== 'undefined' && !attemptedRef.current) {
      attemptedRef.current = true;
      
      // Skip if already preloaded
      if (preloadedImages.has(src)) return;
      
      // Increment our tracking counter
      currentPreloadCount++;
      preloadedImages.add(src);
      
      // Create appropriate link element based on image format
      let linkElement: HTMLLinkElement;
      
      if (format === 'avif' || format === 'webp') {
        linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.as = 'image';
        linkElement.href = src;
        linkElement.type = `image/${format}`;
        linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
        linkElement.setAttribute('media', '(max-width: 2000px)');
        document.head.appendChild(linkElement);
      } else {
        // For auto format, just preload the image
        linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.as = 'image';
        linkElement.href = src;
        linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
        
        // Optimize image size for mobile devices
        const isMobile = window.innerWidth < 768;
        if (isMobile && width && width > 240) {
          // In production, this would adjust the URL to request a smaller version
          // linkElement.href = src + '?width=240';
        }
        
        document.head.appendChild(linkElement);
      }
      
      // Decrease the counter when the image is loaded or on error
      const decrementCounter = () => {
        currentPreloadCount = Math.max(0, currentPreloadCount - 1);
      };
      
      // Use an Image object to track loading completion
      const img = new Image();
      img.onload = decrementCounter;
      img.onerror = decrementCounter;
      img.src = src;
      
      return () => {
        try {
          document.head.removeChild(linkElement);
          decrementCounter();
        } catch (e) {
          // Ignore errors if element is already removed
        }
      };
    }
  }, [src, preload, priority, width, quality, format]);
};

// Cleanup function to reset preloaded images cache
export const clearImagePreloadCache = () => {
  preloadedImages.clear();
  currentPreloadCount = 0;
};
