
import React from 'react';

interface ImageLoaderProps {
  color?: string;
  showSpinner?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ImageLoader = ({ color = '#f0f0f0', showSpinner = true, size = 'medium' }: ImageLoaderProps) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small': return 'w-4 h-4';
      case 'large': return 'w-8 h-8';
      default: return 'w-6 h-6';
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: color + '40' }}>
      {showSpinner && (
        <div className={`${getSpinnerSize()} border-2 border-transparent border-t-gray-500 rounded-full animate-spin`}></div>
      )}
    </div>
  );
};
