
import React from 'react';

interface ImageLoaderProps {
  color?: string;
  showSpinner?: boolean;
  size?: 'small' | 'medium' | 'large';
  blurEffect?: boolean;
}

const ImageLoader = ({ 
  color = "#D4A017", 
  showSpinner = true,
  size = 'medium',
  blurEffect = true
}: ImageLoaderProps) => {
  const spinnerSize = size === 'small' ? 16 : (size === 'medium' ? 24 : 32);
  
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-darkGray/5"
      aria-hidden="true"
    >
      {showSpinner && (
        <div 
          className="animate-spin rounded-full border-t-2 border-opacity-60"
          style={{ 
            width: spinnerSize, 
            height: spinnerSize,
            borderColor: color,
            borderTopColor: 'transparent',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            animationDuration: '0.8s', // Faster animation
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' // Smoother easing
          }}
          data-testid="image-loader-spinner"
        />
      )}
      
      {/* Improved subtle pulse effect with optimized animation */}
      {blurEffect && (
        <div 
          className="absolute inset-0 animate-pulse bg-darkGray/5 opacity-30"
          style={{
            animationDuration: '1.5s', // Faster pulse
            backdropFilter: 'blur(2px)', // Slight blur for better visual
            WebkitBackdropFilter: 'blur(2px)'
          }}
        />
      )}
    </div>
  );
};

export { ImageLoader };
export default ImageLoader;
