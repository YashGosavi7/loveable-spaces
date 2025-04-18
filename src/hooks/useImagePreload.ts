
import { useEffect } from 'react';

interface PreloadOptions {
  priority?: boolean;
  preload?: boolean;
  width?: number;
}

export const useImagePreload = (src: string, options: PreloadOptions = {}) => {
  const { priority = false, preload = false, width } = options;

  useEffect(() => {
    if ((preload || priority) && typeof window !== 'undefined') {
      const linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = src;
      
      linkElement.setAttribute('fetchpriority', priority ? 'high' : 'auto');
      
      const isMobile = window.innerWidth < 768;
      if (isMobile && width && width > 400) {
        linkElement.href = src; // In production, would use resized version
      }
      
      linkElement.setAttribute('data-cache-control', 'public, max-age=5184000');
      
      document.head.appendChild(linkElement);
      
      return () => {
        try {
          document.head.removeChild(linkElement);
        } catch (e) {
          console.info('Preload link already removed');
        }
      };
    }
  }, [src, preload, priority, width]);
};
