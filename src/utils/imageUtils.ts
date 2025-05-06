
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
// In production, this would connect to a real image optimization service
export const getOptimizedImageUrl = (url: string, width: number, quality = 80): string => {
  // This is a placeholder - in real production, this would use a service like Cloudinary, imgix, etc.
  // For now, we'll just return the original URL as we don't have a real image service
  return url;
};
