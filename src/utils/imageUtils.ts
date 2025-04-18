
// Utility functions for image optimization
export const generatePlaceholderColor = (src: string): string => {
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

  // Original placeholders
  if (src.includes('f5ee7e6c')) return '#f5f0e6';
  if (src.includes('09506ceb')) return '#f0e9e4';
  if (src.includes('cee99868')) return '#f5f5f0';
  if (src.includes('b52db17b')) return '#f0f0e8';
  if (src.includes('0ca6700f')) return '#f8f6f2';
  if (src.includes('5bc6dc7e')) return '#f5f2ed';
  if (src.includes('46f2b2ae')) return '#f2f0eb';
  if (src.includes('6f4bb809')) return '#f0e9e4';
  if (src.includes('e4e76a6f')) return '#f5f5f5';

  return '#f5f2ed';
};

export const getImageUrl = (imgPath: string, imgWidth: number, format: string = 'auto'): string => {
  // In production, this would be handled by an image processing service
  // For example: return `https://cdn.loveable.com/img/${imgWidth}/${format}/${imgPath}`
  return imgPath;
};
