
/**
 * Ultra-fast image optimization for 10x performance improvement
 * Targeting LCP <200ms and total loading <500ms
 */

// Ultra-aggressive compression settings for minimal file sizes
export const ULTRA_COMPRESSION_SETTINGS = {
  avif: {
    quality: 55, // Aggressive but maintains interior design detail
    effort: 4,   // Balance between compression and encoding speed
  },
  webp: {
    quality: 62, // Slightly higher for WebP fallback
    effort: 4,
  },
  jpeg: {
    quality: 70, // JPEG fallback
    progressive: true,
  }
};

// Target file sizes for ultra-fast loading
export const TARGET_FILE_SIZES = {
  thumbnail: {
    avif: 25000,  // <30KB for thumbnails
    webp: 35000,  // <40KB
    jpeg: 45000,  // <50KB
  },
  hero: {
    avif: 85000,  // <100KB for hero images
    webp: 110000, // <120KB
    jpeg: 140000, // <150KB
  }
};

// CDN configuration for ultra-fast delivery
export const CDN_CONFIG = {
  baseUrl: window.location.origin, // Use current domain as base
  transformations: {
    thumbnail: 'w_350,h_263,c_fill,f_auto,q_auto:low',
    hero: 'w_1200,h_675,c_fill,f_auto,q_auto:eco',
    lightbox: 'w_1800,h_1200,c_fill,f_auto,q_auto:good'
  }
};

// Generate ultra-optimized image URLs with AVIF/WebP support
export const generateUltraOptimizedUrl = (
  originalUrl: string, 
  type: 'thumbnail' | 'hero' | 'lightbox',
  format: 'avif' | 'webp' | 'jpeg' = 'avif'
): string => {
  try {
    const url = new URL(originalUrl, window.location.origin);
    
    // Add ultra-aggressive optimization parameters
    url.searchParams.set('format', format);
    url.searchParams.set('q', format === 'avif' ? '55' : format === 'webp' ? '62' : '70');
    
    // Set dimensions based on type
    switch (type) {
      case 'thumbnail':
        url.searchParams.set('w', '350');
        url.searchParams.set('h', '263');
        break;
      case 'hero':
        url.searchParams.set('w', '1200');
        url.searchParams.set('h', '675');
        break;
      case 'lightbox':
        url.searchParams.set('w', '1800');
        url.searchParams.set('h', '1200');
        break;
    }
    
    // Add cache-busting with static version for better CDN caching
    url.searchParams.set('v', '2');
    url.searchParams.set('cache', '31536000');
    
    return url.toString();
  } catch (e) {
    return originalUrl;
  }
};

// Check browser support for modern formats
export const getBrowserSupport = (): { avif: boolean; webp: boolean } => {
  if (typeof window === 'undefined') return { avif: false, webp: false };
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return {
    avif: canvas.toDataURL('image/avif').includes('data:image/avif'),
    webp: canvas.toDataURL('image/webp').includes('data:image/webp')
  };
};

// Ultra-fast preloading with priority hints
export const ultraFastPreload = (
  images: string[], 
  type: 'thumbnail' | 'hero' | 'lightbox',
  priority: 'critical' | 'high' | 'medium' = 'high'
) => {
  if (typeof document === 'undefined') return;
  
  const support = getBrowserSupport();
  
  images.forEach((src, index) => {
    // Preload AVIF if supported, otherwise WebP, otherwise JPEG
    const format = support.avif ? 'avif' : support.webp ? 'webp' : 'jpeg';
    const optimizedUrl = generateUltraOptimizedUrl(src, type, format);
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedUrl;
    link.type = `image/${format}`;
    link.fetchPriority = index < 3 ? 'high' : 'auto';
    
    // Add responsive media queries for mobile optimization
    if (type === 'thumbnail') {
      link.media = index < 6 ? '(min-width: 1px)' : '(min-width: 768px)';
    }
    
    // Add cache control hints
    link.setAttribute('data-cache-control', 'public, max-age=31536000, immutable');
    
    document.head.appendChild(link);
  });
};

// Connection speed detection for adaptive loading
export const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
  if (typeof navigator === 'undefined') return 'medium';
  
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn?.saveData || conn?.effectiveType === '2g') return 'slow';
    if (conn?.effectiveType === '3g' || conn?.downlink < 2) return 'medium';
    if (conn?.downlink >= 5) return 'fast';
  }
  
  return 'medium';
};
