
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
 * Detect if the user is likely from India
 */
export const isProbablyFromIndia = (): boolean => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone === 'Asia/Kolkata' || timeZone === 'Asia/Calcutta';
  } catch (e) {
    return false;
  }
};

/**
 * Update HTML meta tags for better performance in India
 */
export const applyIndiaCDNOptimizations = () => {
  if (typeof document !== 'undefined' && isProbablyFromIndia()) {
    // Add DNS prefetch for CDNs used for images
    const cdnHosts = ['lovable-uploads.lovable.app'];
    
    cdnHosts.forEach(host => {
      // Add DNS prefetch
      if (!document.querySelector(`link[rel="dns-prefetch"][href="//${host}"]`)) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'dns-prefetch';
        prefetch.href = `//${host}`;
        document.head.appendChild(prefetch);
        
        // Also add preconnect
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = `//${host}`;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      }
    });
  }
};
