
/**
 * Utility functions for image optimization
 */

// Check if the current browser supports WebP format
export const supportsWebP = (): boolean => {
  try {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      // Chrome added WebP support in version 23
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  } catch (e) {
    // Suppress errors
    console.warn('WebP detection failed', e);
  }
  return false;
};

// Check if the current browser supports AVIF format
export const supportsAVIF = (): boolean => {
  // For simplicity, use feature detection. In production, a proper feature detection
  // would be more reliable but requires more complex implementation.
  const isChromium = 'chrome' in window;
  const isOpera = 'opr' in window;
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  
  // Chrome 85+, Opera 71+, Firefox 93+ support AVIF
  if (isChromium && !isOpera) {
    const chromeVersion = parseInt((/Chrome\/([0-9]+)/.exec(navigator.userAgent) || ['', '0'])[1], 10);
    return chromeVersion >= 85;
  } else if (isOpera) {
    const operaVersion = parseInt((/OPR\/([0-9]+)/.exec(navigator.userAgent) || ['', '0'])[1], 10);
    return operaVersion >= 71;
  } else if (isFirefox) {
    const firefoxVersion = parseInt((/Firefox\/([0-9]+)/.exec(navigator.userAgent) || ['', '0'])[1], 10);
    return firefoxVersion >= 93;
  }
  
  return false;
};

// Detect network conditions
export const isLowBandwidth = (): boolean => {
  // Check for Network Information API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
      if (conn.effectiveType === '3g' && conn.downlink < 1) return true;
      return false;
    }
  }
  
  // Fallback: check if user is likely in a slow connection area
  return isPossiblyInSlowConnectionRegion();
};

// Heuristic to determine if user is likely in a region with slow internet
export const isPossiblyInSlowConnectionRegion = (): boolean => {
  try {
    // Very simple heuristic based on time zone
    // This would be replaced with a more sophisticated approach in production
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Regions that might have slower internet on average
    const possibleSlowRegions = [
      'Asia/Kolkata', 
      'Asia/Dhaka', 
      'Africa/', 
      'Pacific/', 
      'America/Lima',
      'America/Bogota'
    ];
    
    return possibleSlowRegions.some(region => timeZone.includes(region));
  } catch (e) {
    return false;
  }
};

// Generate an optimal quality setting based on image size and network conditions
export const getOptimalQuality = (
  width: number, 
  format: 'webp' | 'avif' | 'jpeg', 
  isPriority: boolean = false
): number => {
  // Start with base quality based on format
  let quality: number;
  
  switch (format) {
    case 'webp':
      quality = 80;
      break;
    case 'avif':
      quality = 70;
      break;
    case 'jpeg':
    default:
      quality = 85;
      break;
  }
  
  // Adjust based on image size
  if (width <= 300) {
    quality += 5; // Higher quality for small images
  } else if (width >= 1200) {
    quality -= 5; // Lower quality for large images
  }
  
  // Priority images get higher quality
  if (isPriority) {
    quality = Math.min(quality + 10, 95);
  }
  
  // Adjust for network conditions
  if (isLowBandwidth() && !isPriority) {
    quality -= 10;
  }
  
  // Ensure quality stays in reasonable bounds
  return Math.max(Math.min(quality, 95), 60);
};

// Calculate aspect ratio styles to prevent layout shift
export const calculateAspectRatioStyles = (width: number, height: number) => {
  return {
    aspectRatio: `${width}/${height}`,
    maxWidth: '100%',
    height: 'auto'
  };
};

// Get appropriate image dimensions based on device screen size
export const getResponsiveImageDimensions = (
  baseWidth: number, 
  baseHeight: number,
  deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
) => {
  const aspectRatio = baseWidth / baseHeight;
  
  switch (deviceType) {
    case 'mobile':
      return {
        width: Math.min(baseWidth, 640),
        height: Math.min(baseWidth, 640) / aspectRatio
      };
    case 'tablet':
      return {
        width: Math.min(baseWidth, 1024),
        height: Math.min(baseWidth, 1024) / aspectRatio
      };
    case 'desktop':
    default:
      return {
        width: baseWidth,
        height: baseHeight
      };
  }
};

// Generate srcset string for responsive images
export const generateSrcSet = (imageSrc: string, widths: number[] = [640, 960, 1280, 1920]) => {
  return widths
    .map(w => `${imageSrc} ${w}w`)
    .join(', ');
};

// Generate sizes string for responsive images
export const generateSizes = (
  defaultSize: string = '100vw',
  breakpoints: Array<{ minWidth: number, size: string }> = []
) => {
  if (breakpoints.length === 0) {
    return defaultSize;
  }
  
  return breakpoints
    .map(bp => `(min-width: ${bp.minWidth}px) ${bp.size}`)
    .concat([defaultSize])
    .join(', ');
};
