
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
    
    // Use requestIdleCallback for more efficient preloading
    const preloadWithPriority = (index: number, arrayIndex: number) => {
      if (index >= 0 && index < imagePaths.length) {
        const imagePath = imagePaths[index];
        
        // Skip if already preloaded
        if (preloadedImagesRef.current.has(imagePath)) return;
        
        const preloadFunction = () => {
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
        };
        
        // Use requestIdleCallback for non-critical images
        if (arrayIndex < 6) {
          // Critical images - load immediately
          preloadFunction();
        } else if ('requestIdleCallback' in window) {
          // Non-critical images - load during idle time
          (window as any).requestIdleCallback(preloadFunction, { timeout: 5000 });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(preloadFunction, arrayIndex * 100);
        }
      }
    };
    
    // Preload images with priority ordering
    preloadedIndices.forEach((index, arrayIndex) => {
      preloadWithPriority(index, arrayIndex);
    });
    
    // Also preload all images in background for faster navigation
    if (connectionSpeed !== 'slow') {
      for (let i = 0; i < imagePaths.length; i++) {
        if (!preloadedIndices.includes(i)) {
          preloadWithPriority(i, preloadedIndices.length + i);
        }
      }
    }
    
  }, [imagePaths, preloadedIndices, onImagePreloaded]);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader;
