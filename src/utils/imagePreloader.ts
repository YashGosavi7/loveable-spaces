
/**
 * Advanced image preloading utility
 */

// List of critical images to preload on app start
const CRITICAL_IMAGES = [
  // Example paths - these would be actual paths in your application
  '/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png',
  '/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png'
];

// Preload priority levels
type PreloadPriority = 'critical' | 'high' | 'medium' | 'low';

// Image preloading function with connection awareness
export const preloadImages = (
  images: string[], 
  priority: PreloadPriority = 'medium',
  sizes?: number[] // Optional array of widths to preload
) => {
  // Don't preload in SSR
  if (typeof window === 'undefined') return;
  
  // Check connection speed
  const isSlowConnection = checkSlowConnection();
  
  // Skip non-critical preloading on slow connections
  if (isSlowConnection && priority !== 'critical') {
    return;
  }
  
  // Convert priority to delay timing
  const getDelay = (): number => {
    switch (priority) {
      case 'critical': return 0;
      case 'high': return 200;
      case 'medium': return 1000;
      case 'low': return 2000;
    }
  };
  
  // Use requestIdleCallback for non-critical images
  const preloadFunction = () => {
    images.forEach((src, index) => {
      // For each image, optionally load multiple sizes
      if (sizes && sizes.length > 0) {
        // Load each size with staggered timing
        sizes.forEach((size, sizeIndex) => {
          setTimeout(() => {
            const img = new Image();
            
            // Add size parameters if we have a method to do that
            const sizedSrc = addSizeToUrl(src, size);
            
            // Set appropriate attributes
            if ('fetchpriority' in img) {
              (img as any).fetchpriority = priority === 'critical' ? 'high' : 'auto';
            }
            
            img.decoding = 'async';
            img.src = sizedSrc;
          }, sizeIndex * 100); // Stagger size loading
        });
      } else {
        // Just load the original image
        setTimeout(() => {
          const img = new Image();
          
          // Set appropriate attributes
          if ('fetchpriority' in img) {
            (img as any).fetchpriority = priority === 'critical' ? 'high' : 'auto';
          }
          
          img.decoding = 'async';
          img.src = src;
        }, index * 50); // Stagger loading slightly
      }
    });
  };
  
  // Use different scheduling approaches based on priority
  if (priority === 'critical') {
    // Load critical images immediately
    preloadFunction();
  } else if ('requestIdleCallback' in window) {
    // Schedule non-critical images during idle time
    (window as any).requestIdleCallback(preloadFunction, { timeout: 5000 });
  } else {
    // Fallback to setTimeout for browsers without requestIdleCallback
    setTimeout(preloadFunction, getDelay());
  }
};

// Helper to add size parameters to URL
const addSizeToUrl = (url: string, width: number): string => {
  try {
    const imageUrl = new URL(url, window.location.origin);
    imageUrl.searchParams.set('w', width.toString());
    return imageUrl.toString();
  } catch (e) {
    return url;
  }
};

// Helper to check connection speed
const checkSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check Network Information API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
      if (conn.downlink < 1) return true;
    }
  }
  
  return false;
};

// Function to initialize preloading on app start
export const initImagePreloading = () => {
  // Preload critical images immediately
  preloadImages(CRITICAL_IMAGES, 'critical', [400, 800, 1200]);
  
  // Add listeners for connection changes to adjust strategy
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      conn.addEventListener('change', () => {
        // Re-evaluate preloading strategy when connection changes
        const isSlowConnection = checkSlowConnection();
        console.log(`Connection changed. Slow connection: ${isSlowConnection}`);
      });
    }
  }
  
  // Return cleanup function
  return () => {
    // Remove event listeners if needed
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      
      if (conn) {
        // No need to remove listeners as this would only run on app shutdown
      }
    }
  };
};

// Initialize immediately
if (typeof window !== 'undefined') {
  initImagePreloading();
}
