import { useEffect } from 'react';

interface PreloadOptions {
  priority?: boolean;
  preload?: boolean;
  width?: number;
  quality?: "low" | "medium" | "high";
  format?: "auto" | "webp" | "avif";
}

export const useImagePreload = (src: string, options: PreloadOptions = {}) => {
  const { priority = false, preload = false, width, quality = "medium", format = "auto" } = options;

  useEffect(() => {
    if ((preload || priority) && typeof window !== 'undefined') {
      // Check if already preloaded to avoid duplicate preloads
      const existingPreload = document.querySelector(`link[rel="preload"][href="${src}"]`);
      if (existingPreload) return;
      
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = src;
      
      // Set appropriate fetch priority
      linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
      
      // Set appropriate type based on format preference
      if (format !== 'auto') {
        linkElement.type = `image/${format}`;
      }
      
      // Optimize image size for mobile devices
      const isMobile = window.innerWidth < 768;
      if (isMobile && width && width > 240) {
        // In production, this would adjust the URL to request a smaller version
        // For now, we're just keeping the original URL
        linkElement.href = src;
      }
      
      // Set cache control directives
      linkElement.setAttribute('data-cache-control', 'public, max-age=7776000'); // 90 days
      
      document.head.appendChild(linkElement);
      
      return () => {
        try {
          document.head.removeChild(linkElement);
        } catch (e) {
          console.info('Preload link already removed');
        }
      };
    }
  }, [src, preload, priority, width, quality, format]);
};
