import { useEffect, useRef } from 'react';
import { isLowBandwidth } from '@/utils/imageOptimization';

interface PreloadOptions {
  priority?: boolean;
  preload?: boolean;
  width?: number;
  quality?: "low" | "medium" | "high";
  format?: "auto" | "webp" | "avif" | "jpeg";
}

// Keep track of preloaded images to avoid duplicates
const preloadedImages = new Set<string>();

// Keep track of DNS prefetched domains to avoid duplicates
const prefetchedDomains = new Set<string>();

export const useImagePreload = (src: string, options: PreloadOptions = {}) => {
  const { priority = false, preload = false, width, quality = "medium", format = "auto" } = options;
  const attemptedRef = useRef(false);
  
  // Determine if this is a hero image based on dimensions or filename
  const isHeroImage = (width && width >= 1000) || src.includes('hero') || src.includes('main');

  useEffect(() => {
    // Always preload hero and priority images, and conditionally preload others
    // based on connection speed and preload flag
    const shouldPreload = priority || isHeroImage || 
      (preload && (!isLowBandwidth() || priority));
    
    if (shouldPreload && typeof window !== 'undefined' && !attemptedRef.current) {
      attemptedRef.current = true;
      
      // Skip if already preloaded
      if (preloadedImages.has(src)) return;
      preloadedImages.add(src);
      
      try {
        // Extract domain for DNS prefetch
        const url = new URL(src, window.location.origin);
        const domain = url.hostname;
        
        // Add DNS prefetch for the domain
        if (!prefetchedDomains.has(domain)) {
          prefetchedDomains.add(domain);
          
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = `//${domain}`;
          document.head.appendChild(dnsLink);
          
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = `//${domain}`;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        }
        
        // For hero images, use high-priority preload
        if (isHeroImage || priority) {
          // First try WebP format
          const webpLink = document.createElement('link');
          webpLink.rel = 'preload';
          webpLink.as = 'image';
          webpLink.href = src;
          webpLink.type = 'image/webp';
          webpLink.fetchPriority = 'high';
          document.head.appendChild(webpLink);
          
          // Then add fallback (browser will ignore the one it doesn't support)
          const fallbackLink = document.createElement('link');
          fallbackLink.rel = 'preload';
          fallbackLink.as = 'image';
          fallbackLink.href = src;
          fallbackLink.fetchPriority = 'high';
          document.head.appendChild(fallbackLink);
          
          return () => {
            try {
              document.head.removeChild(webpLink);
              document.head.removeChild(fallbackLink);
            } catch (e) {
              // Ignore errors if elements are already removed
            }
          };
        }
        
        // For non-hero images, use standard prefetch
        const linkElement = document.createElement('link');
        linkElement.rel = isLowBandwidth() ? 'prefetch' : 'preload';
        linkElement.as = 'image';
        linkElement.href = src;
        linkElement.fetchPriority = priority ? 'high' : 'auto';
        
        // Set cache control directives for longer caching
        linkElement.setAttribute('data-cache-control', 'public, max-age=31536000, immutable');
        
        document.head.appendChild(linkElement);
        
        return () => {
          try {
            document.head.removeChild(linkElement);
          } catch (e) {
            // Ignore errors if element is already removed
          }
        };
      } catch (e) {
        console.warn('Image preload error:', e);
      }
    }
  }, [src, preload, priority, width, quality, format, isHeroImage]);
};
