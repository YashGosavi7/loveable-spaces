/**
 * Image utility functions for optimized loading
 */

// Generate placeholder color based on image URL to provide consistent colors
export const generatePlaceholderColor = (url: string): string => {
  // Return fixed light gray for consistent, fast rendering
  return "#E0E0E0";
};

// Get optimal image dimensions based on context - MUCH MORE AGGRESSIVE FOR MOBILE
export const getOptimalImageDimensions = (context: 'hero' | 'gallery' | 'thumbnail' | 'slider') => {
  // Base dimensions optimized for speed
  let width = 800;
  let height = 600;
  
  // Adjust based on device
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    
    // Ultra-aggressive sizing for mobile - 10x faster loading
    switch (context) {
      case 'hero':
        width = isMobile ? 320 : isTablet ? 480 : 800; // Much smaller for mobile
        height = Math.floor(width * 0.6);
        break;
      case 'gallery':
        width = isMobile ? 180 : isTablet ? 240 : 300; // Tiny for mobile
        height = Math.floor(width * 0.75);
        break;
      case 'thumbnail':
        width = isMobile ? 60 : 80; // Very small thumbnails
        height = Math.floor(width * 0.75);
        break;
      case 'slider':
        width = isMobile ? 300 : isTablet ? 480 : 640; // Much smaller slider
        height = Math.floor(width * 0.6);
        break;
    }
  }
  
  return { width, height };
};

// Much more aggressive mobile detection
export const isLikelySlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check for mobile device first
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) return true; // Assume all mobile is slow for ultra-fast loading
  
  // Check Network Information API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) return true;
      // Much more aggressive - treat anything below 4G as slow
      if (conn.effectiveType !== '4g') return true;
      if (conn.downlink < 3) return true; // Increased threshold significantly
    }
  }
  
  // Use memory as a proxy for device capability
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 6) return true; // Much higher threshold
  }
  
  return false;
};

// Ultra-aggressive image URL optimization for mobile
export const getOptimizedImageUrl = (
  url: string, 
  width: number, 
  quality: number, // quality is now a number 0-100
  format: "webp" | "avif" | "jpeg" | "auto" = "auto"
): string => {
  if (!url) return "";
  try {
    const imageUrl = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    
    // Mobile-specific optimizations
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    
    // Ultra-aggressive compression for mobile
    if (isMobile) {
      quality = Math.max(5, quality - 30); // Reduce quality by 30 points for mobile
      width = Math.floor(width * 0.7); // Reduce size by 30% for mobile
    }
    
    // Add cache-busting parameter
    imageUrl.searchParams.set('v', 'mobile-opt'); // Mobile optimized version
    
    // Force WebP for mobile, AVIF for modern browsers
    if (format === "auto") {
      if (isMobile) {
        imageUrl.searchParams.set('format', 'webp');
      } else {
        imageUrl.searchParams.set('format', 'avif');
      }
    } else if (format !== "jpeg") {
      imageUrl.searchParams.set('format', format);
    }
    
    // Apply ultra-aggressive compression quality
    const finalQuality = Math.max(5, Math.min(quality, 60)); // Cap at 60%
    imageUrl.searchParams.set('q', finalQuality.toString());
    
    // Apply width parameter
    imageUrl.searchParams.set('w', width.toString());
    
    // Mobile-specific optimizations
    if (isMobile) {
      imageUrl.searchParams.set('mobile', 'true');
      imageUrl.searchParams.set('blur', '2'); // Slight blur for smaller files
    }
    
    // Add ultra-aggressive optimization parameters
    imageUrl.searchParams.set('optimize', 'aggressive');
    imageUrl.searchParams.set('strip', 'all'); // Remove all metadata
    imageUrl.searchParams.set('compress', 'max'); // Maximum compression
    
    return imageUrl.toString();
  } catch (e) {
    return url;
  }
};

// Ultra-fast progressive loader for mobile
export const createProgressiveLoader = (
  imageUrl: string,
  containerWidth: number,
  priority: boolean = false
) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  
  // Ultra-tiny thumbnails for mobile
  const thumbnailWidth = isMobile ? 
    Math.max(Math.round(containerWidth * 0.02), 10) : // 2% for mobile, minimum 10px
    Math.max(Math.round(containerWidth * 0.05), 15);
  const thumbnailUrl = getOptimizedImageUrl(imageUrl, thumbnailWidth, 5); // Extremely low quality
  
  // Very small medium size for mobile
  const mediumWidth = isMobile ?
    Math.max(Math.round(containerWidth * 0.15), 40) : // 15% for mobile
    Math.max(Math.round(containerWidth * 0.3), 60);
  const mediumUrl = getOptimizedImageUrl(imageUrl, mediumWidth, 25); // Low quality
  
  // Final with mobile-optimized compression
  const finalQuality = isMobile ? 35 : 55; // Much lower for mobile
  const finalUrl = getOptimizedImageUrl(imageUrl, containerWidth, finalQuality);
  
  return {
    thumbnailUrl,
    mediumUrl,
    finalUrl,
    loadStrategy: priority ? 'eager' : 'progressive'
  };
};

// Ultra-aggressive preloading function for mobile
export const preloadNextImages = (urls: string[], startIndex: number, count: number = 1) => {
  if (typeof window === 'undefined') return;
  
  const isMobile = window.innerWidth < 640;
  const preloadCount = isMobile ? 1 : count; // Only preload 1 image on mobile
  
  const urlsToPreload = [];
  for (let i = 0; i < preloadCount; i++) {
    const index = (startIndex + i) % urls.length;
    if (!urls[index]) continue;
    urlsToPreload.push(urls[index]);
  }
  
  // Ultra-fast preloading for mobile
  if ('requestIdleCallback' in window && !isMobile) {
    (window as any).requestIdleCallback(() => {
      urlsToPreload.forEach(url => {
        const img = new Image();
        img.src = getOptimizedImageUrl(url, isMobile ? 200 : 400, isMobile ? 15 : 30);
      });
    }, { timeout: 500 }); // Reduced timeout for mobile
  } else {
    // Immediate loading for mobile (no idle callback)
    setTimeout(() => {
      urlsToPreload.forEach(url => {
        const img = new Image();
        img.src = getOptimizedImageUrl(url, isMobile ? 200 : 400, isMobile ? 15 : 30);
      });
    }, isMobile ? 50 : 100); // Much faster for mobile
  }
};

// Simplified cache strategy for speed
export const initImageCacheStrategy = () => {
  if ('serviceWorker' in navigator && 'caches' in window) {
    caches.open('image-cache-mobile-v1').then(cache => {
      console.log('Mobile-optimized image cache initialized');
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
