// Utility functions for image optimization
export const generatePlaceholderColor = (src: string): string => {
  // Suraj Chavat's Luxury Bedroom
  if (src.includes('fc2d4e14')) return '#f5f1ea'; // Walk-in wardrobe view 1
  if (src.includes('11ce913b')) return '#f4efe8'; // Walk-in wardrobe view 2
  if (src.includes('7add93ba')) return '#f5f0e9'; // Walk-in wardrobe view 3
  if (src.includes('f4fa52bc')) return '#f3ede6'; // Bedroom overview
  if (src.includes('15bf770f')) return '#f4efe7'; // Bedroom with TV
  if (src.includes('f5834427')) return '#f5f0e8'; // Bedroom sitting area
  if (src.includes('09c9804b')) return '#f2ede5'; // Detailed bedroom view

  // Naikwadi project placeholders
  if (src.includes('7a9b0e2f')) return '#f5f1ea'; // Living room
  if (src.includes('59d47f06')) return '#f4efe8'; // Bedroom with mandalas
  if (src.includes('94247c8f')) return '#f5f0e9'; // Bedroom alternative angle
  if (src.includes('33bf1683')) return '#f3ede6'; // Bedroom storage
  if (src.includes('5d5e5726')) return '#f4efe7'; // Bedroom side view
  if (src.includes('8ebf3bc3')) return '#f5f0e8'; // Entrance
  if (src.includes('3914b6c6')) return '#f2ede5'; // TV Unit
  if (src.includes('88614b3e')) return '#f5f1ea'; // Dining area
  if (src.includes('cc7886ad')) return '#f4efe7'; // Living space

  // Wedding hall placeholders
  if (src.includes('eea53347')) return '#f5f0e9'; // Wedding hall main
  if (src.includes('18ae3aa6')) return '#f3ede6'; // Wedding hall seating
  if (src.includes('76be1317')) return '#f4efe8'; // Wedding hall walkway
  if (src.includes('ca4507e9')) return '#f2ede5'; // Wedding hall mandap
  if (src.includes('40a33995')) return '#f5f1ea'; // Wedding hall chandelier
  if (src.includes('c9e93dc4')) return '#f4efe7'; // Wedding hall entrance
  if (src.includes('de461583')) return '#f3eee7'; // Wedding hall stage
  if (src.includes('ac8a7286')) return '#f5f0e8'; // Wedding hall reception
  if (src.includes('e6e7be2a')) return '#f4efe7'; // Wedding hall overview
  
  // Nikhil Nikam's Modern Residence
  if (src.includes('54a11076')) return '#f2ede6'; // Living room
  if (src.includes('5225c2f7')) return '#f3eee7'; // Kitchen
  if (src.includes('b420a207')) return '#f5f1ea'; // Dining area
  if (src.includes('69c5505e')) return '#f4efe8'; // Bedroom
  
  // Gaikwad's Luxe Bungalow
  if (src.includes('6a80598e')) return '#f2ede6'; // Main hall
  if (src.includes('b6b202ac')) return '#f5f0e9'; // Living room
  if (src.includes('b6d041bc')) return '#f3eee7'; // Bedroom
  if (src.includes('53764224')) return '#f4efe8'; // Kitchen
  
  // More placeholders for additional projects
  if (src.includes('f5ee7e6c')) return '#f5f0e6';
  if (src.includes('09506ceb')) return '#f0e9e4';
  if (src.includes('cee99868')) return '#f5f5f0';
  if (src.includes('b52db17b')) return '#f0f0e8';
  if (src.includes('0ca6700f')) return '#f8f6f2';
  if (src.includes('5bc6dc7e')) return '#f5f2ed';
  if (src.includes('46f2b2ae')) return '#f2f0eb';
  if (src.includes('6f4bb809')) return '#f0e9e4';
  if (src.includes('e4e76a6f')) return '#f5f5f5';

  // Default warm color matching the website's aesthetic
  return '#f5f2ed';
};

// Calculate optimal dimensions for different view contexts
export const getOptimalImageDimensions = (
  context: 'thumbnail' | 'hero' | 'gallery' | 'slider',
  viewport: 'mobile' | 'tablet' | 'desktop' = 'desktop'
) => {
  const dimensionsMap = {
    thumbnail: {
      mobile: { width: 120, height: 90 },
      tablet: { width: 240, height: 180 },
      desktop: { width: 240, height: 180 }
    },
    hero: {
      mobile: { width: 480, height: 270 },
      tablet: { width: 768, height: 432 },
      desktop: { width: 960, height: 540 }
    },
    gallery: {
      mobile: { width: 320, height: 240 },
      tablet: { width: 480, height: 360 },
      desktop: { width: 640, height: 480 }
    },
    slider: {
      mobile: { width: 320, height: 240 },
      tablet: { width: 480, height: 360 },
      desktop: { width: 480, height: 360 }
    }
  };
  
  return dimensionsMap[context][viewport];
};

// Function to get optimized image URL with transformations
// In production, this would connect to an image optimization service
export const getImageUrl = (
  imgPath: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg';
  } = {}
): string => {
  // In a real implementation, this would transform the URL to include parameters
  // For the demo, we'll just return the original path
  return imgPath;
};

// Helper to determine if the connection is likely slow
export const isLikelySlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Check if the browser supports the Connection API
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    
    // Check if it's a slow connection
    if (conn) {
      if (conn.saveData) return true;
      if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
      if (conn.downlink < 1) return true;
    }
  }
  
  return false;
};
