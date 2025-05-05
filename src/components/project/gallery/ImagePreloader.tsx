
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
    
    // Even on slow connections, preload a minimal set of images
    // for better user experience
    
    // Create preload images with optimized priorities
    preloadedIndices.forEach((index, arrayIndex) => {
      if (index >= 0 && index < imagePaths.length) {
        const imagePath = imagePaths[index];
        
        // Skip if already preloaded
        if (preloadedImagesRef.current.has(imagePath)) return;
        
        // Start preloading with progressive quality
        const img = new Image();
        
        // Set loading priority based on index
        if ('fetchpriority' in img) {
          // First 6 images get high priority
          (img as any).fetchpriority = arrayIndex < 6 ? 'high' : 'auto';
        }
        
        // Set loading attribute based on connection and index
        if ('loading' in img) {
          img.loading = arrayIndex < 3 || connectionSpeed !== 'slow' ? 'eager' : 'lazy';
        }
        
        // Set decoding attribute for better performance
        if ('decoding' in img) {
          img.decoding = 'async';
        }
        
        // Set image dimensions to help browser allocate space
        // These are approximate dimensions for thumbnails
        img.width = 350;
        img.height = 263;
        
        // Add crossOrigin for better caching with CDN
        img.crossOrigin = 'anonymous';
        
        // Finally set the source to start loading
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
