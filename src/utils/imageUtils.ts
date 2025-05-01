
/**
 * Generate a placeholder color based on the image URL
 * This creates consistent colors for the same images
 */
export const generatePlaceholderColor = (src: string): string => {
  // Hash the string to get a consistent color for the same image
  let hash = 0;
  for (let i = 0; i < src.length; i++) {
    hash = src.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate pastel colors that are visually pleasing
  const hue = ((hash % 360) + 360) % 360; // 0-359 degrees
  const saturation = 20 + (hash % 30); // 20-49%
  const lightness = 70 + (hash % 20); // 70-89%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Check if the user likely has a slow connection
 */
export const isLikelySlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check if save-data is enabled
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
      if (conn.effectiveType === '3g' && conn.downlink < 1) return true;
      if (conn.downlink < 0.5) return true;
    }
  }
  
  return false;
};

/**
 * Get optimal dimensions for different types of images based on device
 */
export const getOptimalImageDimensions = (
  type: 'thumbnail' | 'hero' | 'gallery' | 'preview', 
  viewport: 'mobile' | 'tablet' | 'desktop'
) => {
  // Base dimensions by image type
  const dimensions = {
    thumbnail: { width: 100, height: 75 },
    preview: { width: 300, height: 225 },
    gallery: { width: 600, height: 450 },
    hero: { width: 1200, height: 900 }
  };
  
  // Adjust based on viewport
  if (viewport === 'mobile') {
    // Smaller dimensions for mobile
    return {
      width: Math.round(dimensions[type].width * 0.8),
      height: Math.round(dimensions[type].height * 0.8),
    };
  } else if (viewport === 'tablet') {
    // Default dimensions work well for tablets
    return dimensions[type];
  } else {
    // Larger dimensions for desktop
    return {
      width: dimensions[type].width,
      height: dimensions[type].height,
    };
  }
};

/**
 * Detect if the user is likely from a specific region for CDN optimization
 */
export const detectUserRegion = (): string => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone.includes('Asia/Kolkata') || timeZone.includes('Asia/Calcutta')) {
      return 'india';
    }
    if (timeZone.includes('Asia/')) {
      return 'asia';
    }
    if (timeZone.includes('Europe/')) {
      return 'europe';
    }
    if (timeZone.includes('America/')) {
      return 'americas';
    }
    return 'global';
  } catch (e) {
    return 'global';
  }
};

/**
 * Get WebP and AVIF support status
 */
export const getImageFormatSupport = (): { webp: boolean, avif: boolean } => {
  let webp = false;
  let avif = false;
  
  if (typeof document !== 'undefined') {
    // Test for WebP support
    const webpCanvas = document.createElement('canvas');
    if (webpCanvas && webpCanvas.getContext && webpCanvas.toDataURL) {
      webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    // For AVIF, we'll check if the browser is recent enough
    const ua = navigator.userAgent;
    if (
      (ua.includes('Chrome/') && parseInt(ua.split('Chrome/')[1], 10) >= 85) ||
      (ua.includes('Firefox/') && parseInt(ua.split('Firefox/')[1], 10) >= 93) ||
      (ua.includes('Safari/') && parseInt(ua.split('Safari/')[1], 10) >= 16)
    ) {
      avif = true;
    }
  }
  
  return { webp, avif };
};

/**
 * Add DNS prefetch and preconnect for common image domains
 */
export const optimizeImageDomains = () => {
  if (typeof document === 'undefined') return;
  
  const domains = [
    'lovable-uploads.lovable.app',
    'images.unsplash.com',
    'cdn.lovable.dev'
  ];
  
  domains.forEach(domain => {
    // Add DNS prefetch
    if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
      const prefetch = document.createElement('link');
      prefetch.rel = 'dns-prefetch';
      prefetch.href = `//${domain}`;
      document.head.appendChild(prefetch);
      
      // Also add preconnect for critical resources
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = `//${domain}`;
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
    }
  });
};

/**
 * Apply best image loading practices based on connection quality
 */
export const getImageLoadingStrategy = () => {
  const isSlowConnection = isLikelySlowConnection();
  const region = detectUserRegion();
  const { webp, avif } = getImageFormatSupport();
  
  return {
    preferredFormat: avif ? 'avif' : webp ? 'webp' : 'jpg',
    loadingStrategy: isSlowConnection ? 'lazy' : 'eager',
    qualityLevel: isSlowConnection ? 'low' : 'high',
    preload: !isSlowConnection,
    regionOptimized: region !== 'global',
    region
  };
};

// Apply optimizations automatically when this file is imported
if (typeof window !== 'undefined') {
  optimizeImageDomains();
}
