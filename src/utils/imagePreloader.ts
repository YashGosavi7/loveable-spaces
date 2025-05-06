/**
 * Advanced image preloading utility with improved performance
 */

// List of critical images to preload on app start - specifically including team members
const CRITICAL_IMAGES = [
  // Team member images from AboutPage (in the dark gray horizontal box)
  '/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png',
  '/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png',
  '/lovable-uploads/d655dd68-cb8a-43fd-8aaa-38db6cd905c1.png',
  // Other critical images
  '/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png'
];

// Preload priority levels
type PreloadPriority = 'critical' | 'high' | 'medium' | 'low';

// Progress tracking for preloads
let preloadProgress: Record<string, boolean> = {};

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
  
  // Use Service Worker for preloading when possible (more efficient)
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: images
    });
    return;
  }
  
  // Convert priority to delay timing
  const getDelay = (): number => {
    switch (priority) {
      case 'critical': return 0;
      case 'high': return 100;
      case 'medium': return 500;
      case 'low': return 1000;
    }
  };
  
  // Use requestIdleCallback for non-critical images
  const preloadFunction = () => {
    images.forEach((src, index) => {
      // Skip already preloaded images
      if (preloadProgress[src]) return;
      
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
            if ('loading' in img) {
              img.loading = priority === 'critical' ? 'eager' : 'lazy';
            }
            
            img.onload = () => { preloadProgress[src] = true; };
            img.src = sizedSrc;
          }, (index * 50) + (sizeIndex * 50)); // Stagger size loading
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
          if ('loading' in img) {
            img.loading = priority === 'critical' ? 'eager' : 'lazy';
          }
          
          img.onload = () => { preloadProgress[src] = true; };
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
    (window as any).requestIdleCallback(preloadFunction, { timeout: 3000 });
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
  // Preload critical images immediately with prioritized loading
  preloadImages(CRITICAL_IMAGES, 'critical', [300, 600]);
  
  // Add listeners for connection changes to adjust strategy
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      conn.addEventListener('change', () => {
        // Re-evaluate preloading strategy when connection changes
        const isSlowConnection = checkSlowConnection();
        console.log(`Connection changed. Slow connection: ${isSlowConnection}`);
        
        // If connection improved, preload more images
        if (!isSlowConnection) {
          preloadImages(CRITICAL_IMAGES, 'high');
        }
      });
    }
  }
  
  // Preload team member images when app loads
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    // Immediately tell service worker to cache team member images
    const teamMemberImages = CRITICAL_IMAGES.slice(0, 3);
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: teamMemberImages
    });
  }
  
  // Return cleanup function
  return () => {
    // No cleanup needed for preloading
  };
};

// Initialize immediately
if (typeof window !== 'undefined') {
  initImagePreloading();
}

// Add path-specific preloading for AboutPage
export const preloadTeamMemberImages = () => {
  // These are the team member images in the dark gray horizontal box
  const teamMemberImages = [
    '/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png',
    '/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png',
    '/lovable-uploads/d655dd68-cb8a-43fd-8aaa-38db6cd905c1.png',
  ];
  
  // Use critical priority for these images
  preloadImages(teamMemberImages, 'critical');
  
  // Also notify service worker
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: teamMemberImages
    });
  }
};
