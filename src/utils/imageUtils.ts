
/**
 * Image utility functions for optimized loading
 */

// Generate placeholder color based on image URL to provide consistent colors
export const generatePlaceholderColor = (url: string): string => {
  // Return fixed light gray for consistent, fast rendering
  return "#E0E0E0";
};

// Get optimal image dimensions based on context
export const getOptimalImageDimensions = (context: 'hero' | 'gallery' | 'thumbnail' | 'slider') => {
  // Base dimensions optimized for speed
  let width = 800;
  let height = 600;
  
  // Adjust based on device
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    
    // Optimize based on context and device - more aggressive sizing
    switch (context) {
      case 'hero':
        width = isMobile ? 480 : isTablet ? 768 : 1200; // Reduced sizes
        height = Math.floor(width * 0.6); // 16:10 aspect ratio
        break;
      case 'gallery':
        width = isMobile ? 280 : isTablet ? 350 : 450; // Smaller gallery images
        height = Math.floor(width * 0.75);
        break;
      case 'thumbnail':
        width = isMobile ? 80 : 100; // Smaller thumbnails
        height = Math.floor(width * 0.75);
        break;
      case 'slider':
        width = isMobile ? 480 : isTablet ? 768 : 1000; // Reduced slider size
        height = Math.floor(width * 0.6);
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
      // More aggressive detection - consider 3G and below as slow
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.effectiveType === '3g') return true;
      if (conn.downlink < 2 && conn.effectiveType !== '4g') return true; // Increased threshold
    }
  }
  
  // Use memory as a proxy for device capability
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 4) return true; // Increased threshold
  }
  
  return false;
};

// Create an image URL with aggressive optimization parameters
export const getOptimizedImageUrl = (
  url: string, 
  width: number, 
  quality: number, // quality is now a number 0-100
  format: "webp" | "avif" | "jpeg" | "auto" = "auto"
): string => {
  if (!url) return "";
  try {
    const imageUrl = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    
    // Add cache-busting parameter with fixed value
    imageUrl.searchParams.set('v', 'opt3'); // Updated version for new optimizations
    
    // Force WebP for better compression - more aggressive format selection
    if (format === "auto" && !url.includes('.svg') && !url.includes('.gif')) {
      imageUrl.searchParams.set('format', 'webp');
    } else if (format === "webp" && !url.includes('.svg') && !url.includes('.gif')) {
      imageUrl.searchParams.set('format', 'webp');
    } else if (format === "avif" && !url.includes('.svg') && !url.includes('.gif')) {
      imageUrl.searchParams.set('format', 'avif');
    }
    
    // Apply more aggressive compression quality (reduced by 15 points)
    const aggressiveQuality = Math.max(10, Math.min(quality - 15, 75));
    imageUrl.searchParams.set('q', aggressiveQuality.toString());
    
    // Apply width parameter
    imageUrl.searchParams.set('w', width.toString());
    
    // Add additional optimization parameters
    imageUrl.searchParams.set('optimize', 'true');
    imageUrl.searchParams.set('strip', 'true'); // Remove metadata
    
    return imageUrl.toString();
  } catch (e) {
    return url;
  }
};

// Enhanced progressive loader for ultra-fast loading
export const createProgressiveLoader = (
  imageUrl: string,
  containerWidth: number,
  priority: boolean = false
) => {
  // Even more aggressive size reduction
  const thumbnailWidth = Math.max(Math.round(containerWidth * 0.05), 15); // 5% instead of 10%
  const thumbnailUrl = getOptimizedImageUrl(imageUrl, thumbnailWidth, 20); // Lower quality
  
  // Smaller medium size
  const mediumWidth = Math.max(Math.round(containerWidth * 0.3), 60); // 30% instead of 50%
  const mediumUrl = getOptimizedImageUrl(imageUrl, mediumWidth, 40); // Lower quality
  
  // Final with aggressive compression
  const finalUrl = getOptimizedImageUrl(imageUrl, containerWidth, 55); // Reduced from 85
  
  return {
    thumbnailUrl,
    mediumUrl,
    finalUrl,
    loadStrategy: priority ? 'eager' : 'progressive'
  };
};

// Ultra-aggressive preloading function
export const preloadNextImages = (urls: string[], startIndex: number, count: number = 2) => {
  if (typeof window === 'undefined') return;
  
  const urlsToPreload = [];
  for (let i = 0; i < count; i++) { // Reduced from 3 to 2
    const index = (startIndex + i) % urls.length;
    if (!urls[index]) continue;
    urlsToPreload.push(urls[index]);
  }
  
  // Immediate preloading for critical images
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      urlsToPreload.forEach(url => {
        const img = new Image();
        img.src = getOptimizedImageUrl(url, 400, 30); // Smaller, lower quality preload
      });
    }, { timeout: 1000 }); // Reduced timeout
  } else {
    setTimeout(() => {
      urlsToPreload.forEach(url => {
        const img = new Image();
        img.src = getOptimizedImageUrl(url, 400, 30);
      });
    }, 100); // Much faster fallback
  }
};

// Simplified cache strategy for speed
export const initImageCacheStrategy = () => {
  if ('serviceWorker' in navigator && 'caches' in window) {
    caches.open('image-cache-v2').then(cache => {
      console.log('Fast image cache initialized');
    });
  }
};

// Cache image with priority
export const cacheImage = (url: string) => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_NEW_IMAGE',
      url,
      priority: 'high'
    });
  }
};

// Initialize immediately
if (typeof window !== 'undefined') {
  initImageCacheStrategy();
}
