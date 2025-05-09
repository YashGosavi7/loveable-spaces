
/**
 * Image utility functions for optimized loading
 */

// Generate placeholder color based on image URL to provide consistent colors
export const generatePlaceholderColor = (url: string): string => {
  // Simple hash function to convert url to a consistent color
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Generate a pastel color using the hash
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 95%)`;
};

// Get optimal image dimensions based on context
export const getOptimalImageDimensions = (context: 'hero' | 'gallery' | 'thumbnail' | 'slider') => {
  // Base dimensions
  let width = 800;
  let height = 600;
  
  // Adjust based on device
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    
    // Optimize based on context and device
    switch (context) {
      case 'hero':
        width = isMobile ? 640 : isTablet ? 1024 : 1600;
        height = Math.floor(width * 0.75); // 4:3 aspect ratio
        break;
      case 'gallery':
        width = isMobile ? 350 : isTablet ? 500 : 650;
        height = Math.floor(width * 0.75);
        break;
      case 'thumbnail':
        width = isMobile ? 120 : 150;
        height = Math.floor(width * 0.75);
        break;
      case 'slider':
        width = isMobile ? 640 : isTablet ? 1024 : 1400;
        height = Math.floor(width * 0.6); // 16:9 for slider
        break;
    }
  }
  
  return { width, height };
};

// Detect if the current connection is likely to be slow
export const isLikelySlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check Network Information API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
      if (conn.effectiveType === '3g' && conn.downlink < 1) return true;
    }
  }
  
  // Use memory as a proxy for device capability
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 2) return true;
  }
  
  return false;
};

// Create an image URL with size parameters
export const getOptimizedImageUrl = (url: string, width: number, quality = 80): string => {
  try {
    // Create a URL object to manipulate the URL
    const imageUrl = new URL(url, window.location.origin);
    
    // Add cache-busting parameter with fixed value to improve CDN caching
    imageUrl.searchParams.set('version', 'v1');
    
    // Force WebP format for better compression when possible
    if (!url.includes('.svg') && !url.includes('.gif')) {
      imageUrl.searchParams.set('format', 'webp');
    }
    
    // Apply basic compression
    imageUrl.searchParams.set('q', quality.toString());
    
    // Apply width parameter
    imageUrl.searchParams.set('w', width.toString());
    
    return imageUrl.toString();
  } catch (e) {
    // If URL parsing fails, return original URL
    return url;
  }
};

// Create a high-speed loading mechanism with progressive enhancement
export const createProgressiveLoader = (
  imageUrl: string,
  containerWidth: number,
  priority: boolean = false
) => {
  // First load a tiny thumbnail (10% of final size) for instant display
  const thumbnailWidth = Math.max(Math.round(containerWidth * 0.1), 20);
  const thumbnailUrl = getOptimizedImageUrl(imageUrl, thumbnailWidth, 60);
  
  // Then load a medium quality version (50% of final size)
  const mediumWidth = Math.max(Math.round(containerWidth * 0.5), 100);
  const mediumUrl = getOptimizedImageUrl(imageUrl, mediumWidth, 75);
  
  // Finally load the full-quality version
  const finalUrl = getOptimizedImageUrl(imageUrl, containerWidth, 85);
  
  return {
    thumbnailUrl,
    mediumUrl,
    finalUrl,
    loadStrategy: priority ? 'eager' : 'progressive'
  };
};

// Add aggressive preloading function
export const preloadNextImages = (urls: string[], startIndex: number, count: number = 3) => {
  if (typeof window === 'undefined') return;
  
  const urlsToPreload = [];
  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % urls.length;
    if (!urls[index]) continue;
    urlsToPreload.push(urls[index]);
  }
  
  // Use requestIdleCallback for non-blocking preloading
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      urlsToPreload.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      urlsToPreload.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    }, 300);
  }
};

// Advanced image caching strategy
export const initImageCacheStrategy = () => {
  // Check if the browser supports service workers and caches
  if ('serviceWorker' in navigator && 'caches' in window) {
    // Create a specific cache for images
    caches.open('image-cache-v1').then(cache => {
      // Cache will be managed by service worker
      console.log('Image cache initialized');
    });
  }
};

// Add helper function to manually cache images - exported from serviceWorker.ts
export const cacheImage = (url: string) => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_NEW_IMAGE',
      url
    });
  }
};

// Initialize the cache strategy immediately
if (typeof window !== 'undefined') {
  initImageCacheStrategy();
}
