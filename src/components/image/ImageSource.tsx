
import React from 'react';

interface ImageSourceProps {
  src: string;
  type: 'webp' | 'avif' | 'jpeg';
  srcSet?: string;
  sizes?: string;
  quality?: 'low' | 'medium' | 'high';
  isIndia?: boolean;
}

const ImageSource = ({ 
  src, 
  type, 
  srcSet, 
  sizes,
  quality = 'medium',
  isIndia = false
}: ImageSourceProps) => {
  // Quality settings based on quality prop
  // In a real app, these would be passed to a real image API
  const getQualityParam = () => {
    if (quality === 'low') return '&q=60';
    if (quality === 'medium') return '&q=75';
    return '&q=85';
  };
  
  // For users in India, we'd use specialized CDN params
  // This is a simulation for the example
  const getOptimizedSrc = (originalSrc: string) => {
    if (isIndia) {
      // In production, this would use a CDN with edge locations in India
      return originalSrc;
    }
    return originalSrc;
  };
  
  // In production, you would transform the srcSet URLs as well
  const getOptimizedSrcSet = () => {
    if (!srcSet) return undefined;
    
    if (isIndia) {
      // Process srcSet for India
      return srcSet;
    }
    
    return srcSet;
  };
  
  return (
    <source 
      type={`image/${type}`} 
      srcSet={getOptimizedSrcSet() || getOptimizedSrc(src)}
      sizes={sizes}
      data-quality={quality}
    />
  );
};

export default ImageSource;
