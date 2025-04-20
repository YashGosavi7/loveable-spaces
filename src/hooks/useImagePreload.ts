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

export const useImagePreload = (src: string, options: PreloadOptions = {}) => {
  const { priority = false, preload = false, width, quality = "medium", format = "auto" } = options;
  const attemptedRef = useRef(false);

  useEffect(() => {
    // Only preload if:
    // 1. It's a priority image, or 
    // 2. It's marked for preload AND not a slow connection (unless it's priority)
    const shouldPreload = priority || (preload && (!isLikelySlowConnection() || priority));
    
    if (shouldPreload && typeof window !== 'undefined' && !attemptedRef.current) {
      attemptedRef.current = true;
      
      // Skip if already preloaded
      if (preloadedImages.has(src)) return;
      preloadedImages.add(src);
      
      // For avif and webp, we need to create specific links
      if (format === 'avif' || format === 'webp') {
        const linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.as = 'image';
        linkElement.href = src;
        linkElement.type = `image/${format}`;
        linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
        document.head.appendChild(linkElement);
        
        // Also add a non-typed version for browsers that don't support the format
        const fallbackLink = document.createElement('link');
        fallbackLink.rel = 'preload';
        fallbackLink.as = 'image';
        fallbackLink.href = src;
        fallbackLink.setAttribute('fetchpriority', priority ? 'high' : 'auto');
        document.head.appendChild(fallbackLink);
        
        return () => {
          try {
            document.head.removeChild(linkElement);
            document.head.removeChild(fallbackLink);
          } catch (e) {
            // Ignore errors if elements are already removed
          }
        };
      }
      
      // For auto format, just preload the image
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = src;
      
      // Set appropriate fetch priority
      linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
      
      // Optimize image size for mobile devices
      const isMobile = window.innerWidth < 768;
      if (isMobile && width && width > 240) {
        // In production, this would adjust the URL to request a smaller version
        linkElement.href = src;
      }
      
      // Set cache control directives for longer caching
      linkElement.setAttribute('data-cache-control', 'public, max-age=7776000'); // 90 days
      
      document.head.appendChild(linkElement);
      
      return () => {
        try {
          document.head.removeChild(linkElement);
        } catch (e) {
          // Ignore errors if element is already removed
        }
      };
    }
  }, [src, preload, priority, width, quality, format]);
};
