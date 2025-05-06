
import React, { useState, useEffect, useRef } from 'react';
import { ImageProps } from './types';
import { useImageIntersection } from '@/hooks/useImageIntersection';
import { generatePlaceholderColor, createProgressiveLoader } from '@/utils/imageUtils';

const TurboImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  quality = "high",
  blur = true,
  onLoad,
  placeholderColor,
}: ImageProps) => {
  const [loadState, setLoadState] = useState<'loading' | 'thumbnail' | 'medium' | 'full'>('loading');
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const { isInView, elementRef } = useImageIntersection({
    priority,
    rootMargin: '1000px',
    skipLazyLoading: priority
  });
  const isMounted = useRef(true);
  
  // Derived placeholder color
  const bgColor = placeholderColor || generatePlaceholderColor(src);
  
  useEffect(() => {
    // Clean up on unmount
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    if (!src || (!isInView && !priority)) return;
    
    // Set up progressive loading
    const { thumbnailUrl, mediumUrl, finalUrl, loadStrategy } = createProgressiveLoader(src, width || 800, priority);
    
    // Function to load an image and update state when complete
    const loadImage = (url: string, state: 'thumbnail' | 'medium' | 'full') => {
      const img = new Image();
      img.src = url;
      
      // Set image attributes for optimal loading
      if ('fetchpriority' in img) {
        (img as any).fetchpriority = priority ? 'high' : 'auto';
      }
      
      if ('loading' in img) {
        img.loading = priority ? 'eager' : 'lazy';
      }
      
      if ('decoding' in img) {
        img.decoding = priority ? 'sync' : 'async';
      }
      
      img.onload = () => {
        if (isMounted.current) {
          setCurrentSrc(url);
          setLoadState(state);
          
          if (state === 'full' && onLoad) {
            onLoad();
          }
        }
      };
      
      return img;
    };
    
    // Start with thumbnail for instant display
    const thumbnailImage = loadImage(thumbnailUrl, 'thumbnail');
    
    // For priority images or eager loading, load all versions right away
    if (priority || loadStrategy === 'eager') {
      const mediumImage = loadImage(mediumUrl, 'medium');
      const fullImage = loadImage(finalUrl, 'full');
      
      // Preload additional responsive sizes if this is a priority image
      if (priority) {
        const extraSizes = [width * 0.5, width * 1.5, width * 2].filter(w => w !== width);
        extraSizes.forEach(w => {
          const img = new Image();
          img.src = createProgressiveLoader(src, Math.round(w), false).finalUrl;
        });
      }
    } else {
      // For non-priority images, use progressive loading with timers
      setTimeout(() => {
        if (isMounted.current) {
          const mediumImage = loadImage(mediumUrl, 'medium');
          
          // Load full quality version after medium or when in view
          setTimeout(() => {
            if (isMounted.current) {
              loadImage(finalUrl, 'full');
            }
          }, 300);
        }
      }, 100);
    }
    
    // Clean up function
    return () => {
      // Nothing to clean up
    };
  }, [src, isInView, priority, width, onLoad]);
  
  // Calculate blur amount based on load state
  const getBlurAmount = () => {
    if (!blur) return 0;
    
    switch (loadState) {
      case 'loading': return 20;
      case 'thumbnail': return 15;
      case 'medium': return 5;
      case 'full': return 0;
    }
  };
  
  // Calculate opacity based on load state
  const getOpacity = () => {
    switch (loadState) {
      case 'loading': return 0;
      case 'thumbnail': return 0.7;
      case 'medium': return 0.9;
      case 'full': return 1;
    }
  };

  return (
    <div 
      ref={elementRef}
      className="relative overflow-hidden"
      style={{ 
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        aspectRatio: `${width}/${height}`
      }}
    >
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-all duration-300 ${className}`}
          style={{
            filter: `blur(${getBlurAmount()}px)`,
            opacity: getOpacity(),
            transform: loadState === 'full' ? 'scale(1)' : 'scale(1.02)'
          }}
          onLoad={() => {
            // Final onLoad callback when full quality image is displayed
            if (loadState === 'full' && onLoad) {
              onLoad();
            }
          }}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
    </div>
  );
};

export default TurboImage;
