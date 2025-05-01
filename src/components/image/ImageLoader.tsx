
import React from 'react';

interface ImageLoaderProps {
  color?: string;
  showSpinner?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ImageLoader = ({ 
  color = "#D4A017", 
  showSpinner = true,
  size = 'medium'
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
            borderTopColor: 'transparent'
          }}
          data-testid="image-loader-spinner"
        />
      )}
    </div>
  );
};

export default ImageLoader;
