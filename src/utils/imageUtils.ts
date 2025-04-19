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
  
  // Samir Ghule's Duplex Flat placeholders
  if (src.includes('69ec1e87')) return '#f4efe8'; // Bedroom view 1
  if (src.includes('eaf8abd9')) return '#f5f0e9'; // Bedroom view 2
  if (src.includes('23180269')) return '#f3ede6'; // Bedroom with workspace
  if (src.includes('8890830f')) return '#f4efe7'; // Bedroom with TV
  if (src.includes('4087f33e')) return '#f5f0e8'; // Bedroom side view
  if (src.includes('d09f42ee')) return '#f4efe8'; // Bedroom with seating
  if (src.includes('10b63de8')) return '#f3ede6'; // Modern bedroom view
  if (src.includes('b682a7cf')) return '#f4efe7'; // Bedroom with storage
  if (src.includes('75e23826')) return '#f5f0e8'; // Bedroom with seating area
  if (src.includes('9a92d3e9')) return '#f4efe8'; // Additional bedroom view
  if (src.includes('25d0624e')) return '#f5f0e9'; // Secondary bedroom angle
  if (src.includes('2c7d97e4')) return '#f3ede6'; // Living room view
  if (src.includes('720e8505')) return '#f4efe7'; // Living space with artwork
  if (src.includes('92a8b763')) return '#f5f0e8'; // Seating area
  if (src.includes('f7be22f5')) return '#f4efe8'; // Living room alternate view
  if (src.includes('af6bcccb')) return '#f3ede6'; // Additional seating space
  if (src.includes('a655d983')) return '#f4efe7'; // Main bedroom vista
  if (src.includes('d4581ac8')) return '#f5f0e8'; // Master bedroom detail

  // Samir Ghule's Duplex Flat placeholders - additional views
  if (src.includes('5a2aff14')) return '#f4efe8'; // Dining area alternate view
  if (src.includes('2faf3e3c')) return '#f3ede6'; // Kitchen view
  if (src.includes('1c3e331c')) return '#f4efe7'; // Pooja room detail
  if (src.includes('b8701b77')) return '#f5f0e8'; // Staircase detail view 1
  if (src.includes('f0e9f148')) return '#f4efe8'; // Staircase detail view 2
  if (src.includes('0a377a7f')) return '#f3ede6'; // Living space view 1
  if (src.includes('51321ef6')) return '#f4efe7'; // Living space view 2
  if (src.includes('176eb3a2')) return '#f5f0e8'; // Kitchen and dining
  if (src.includes('d7feb61c')) return '#f4efe8'; // Kitchen alternate angle

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

  // Additional Samir Ghule's project images
  if (src.includes('5f920765')) return '#f4efe8'; // Living room with designer chandelier
  if (src.includes('cb324df1')) return '#f3ede6'; // Entertainment area view
  if (src.includes('7bb8af9e')) return '#f4efe7'; // Living space alternate angle
  if (src.includes('3b0645ff')) return '#f5f0e8'; // Media room front view
  if (src.includes('c2d52fcd')) return '#f4efe8'; // Living area detail shot
  if (src.includes('e3c671b2')) return '#f3ede6'; // Modern pooja room
  if (src.includes('135e62ce')) return '#f4efe7'; // Entrance unit with nameplate
  if (src.includes('afbf5e62')) return '#f5f0e8'; // Media room wide view
  if (src.includes('81f64ee8')) return '#f4efe8'; // Living space with artwork

  // Additional Samir Ghule's project images
  if (src.includes('de5ee7a3')) return '#f4efe7'; // Entrance with family nameplate

  // Ravi Kale's 3BHK Apartment placeholders
  if (src.includes('53e406a7')) return '#f4efe8'; // Pooja room view
  if (src.includes('9355aa7a')) return '#f5f0e9'; // Dining area view 1
  if (src.includes('248904a0')) return '#f3ede6'; // Dining and kitchen view
  if (src.includes('59444e2d')) return '#f4efe7'; // Dining close-up
  if (src.includes('8c33ab1a')) return '#f4efe8'; // Master bedroom
  if (src.includes('04a59497')) return '#f5f0e8'; // Entrance foyer
  if (src.includes('24bc45ca')) return '#f4efe8'; // Kitchen view 1
  if (src.includes('2f3d8ae0')) return '#f3ede6'; // Kitchen view 2

  // New Ravi Kale 3BHK project images placeholders
  if (src.includes('0c969194')) return '#f4efe8'; // Bedroom with marble wall
  if (src.includes('ba8fcac1')) return '#f5f0e9'; // Bedroom with curtains and console
  if (src.includes('164f03ed')) return '#f3ede6'; // Bedroom with arched mirror
  if (src.includes('2050285b')) return '#f4efe7'; // Bedroom with side console
  if (src.includes('95bc3918')) return '#f5f0e8'; // Pooja room with Ganesha statue
  if (src.includes('366cf1dd')) return '#f3eee7'; // Dining area with pendant lights
  if (src.includes('32396da3')) return '#f4efe8'; // Kitchen and dining area
  if (src.includes('b5081487')) return '#f5f0e9'; // Dining room with round table
  if (src.includes('5e1ae636')) return '#f3ede6'; // Another dining room view

  // New Ravi Kale 3BHK project images placeholders
  if (src.includes('8aa6ea8f')) return '#f4efe8'; // Bedroom with architectural wall panel
  if (src.includes('081379a4')) return '#f5f0e9'; // Bedroom with workspace
  if (src.includes('737f1abd')) return '#f3ede6'; // Bedroom with textured wall
  if (src.includes('4847c6b9')) return '#f4efe7'; // Bedroom with minimalist design
  if (src.includes('aa20a76e')) return '#f5f0e8'; // Bedroom with unique lighting
  if (src.includes('1e6f3006')) return '#f3eee7'; // Bedroom with bulletin board
  if (src.includes('d0d2a8e8')) return '#f4efe8'; // Alternate bedroom view
  if (src.includes('1070561d')) return '#f5f0e9'; // Another bedroom perspective

  // New Ravi Kale Celebrity Home project images placeholders
  if (src.includes('e458768f')) return '#f4efe8';
  if (src.includes('933cc55d')) return '#f5f0e9';
  if (src.includes('7376f411')) return '#f3ede6';

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
