
import { useEffect, useRef } from 'react';

interface ImagePreloaderProps {
  imagePaths: string[];
  preloadedIndices: number[];
  onImagePreloaded?: (index: number) => void;
}

const ImagePreloader = ({ imagePaths, preloadedIndices, onImagePreloaded }: ImagePreloaderProps) => {
  const preloadedImagesRef = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    // Detect connection speed to adjust preloading strategy
    const detectConnectionSpeed = () => {
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const conn = (navigator as any).connection;
        
        if (conn) {
          if (conn.saveData) return 'slow';
          if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'slow';
          if (conn.downlink < 1) return 'slow';
          return 'normal';
        }
      }
      
      return 'normal';
    };
    
    const connectionSpeed = detectConnectionSpeed();
    
    // Only preload on normal connections
    if (connectionSpeed === 'slow') {
      console.info('Skipping image preloading due to slow connection');
      return;
    }
    
    // Create preload images
    preloadedIndices.forEach(index => {
      if (index >= 0 && index < imagePaths.length) {
        const imagePath = imagePaths[index];
        
        // Skip if already preloaded
        if (preloadedImagesRef.current.has(imagePath)) return;
        
        // Start preloading
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
          preloadedImagesRef.current.add(imagePath);
          if (onImagePreloaded) {
            onImagePreloaded(index);
          }
        };
      }
    });
  }, [imagePaths, preloadedIndices, onImagePreloaded]);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader;
