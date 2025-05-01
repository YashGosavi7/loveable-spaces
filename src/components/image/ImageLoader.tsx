
import React from 'react';
import { Loader } from "lucide-react";

interface ImageLoaderProps {
  color?: string;
  size?: 'small' | 'medium' | 'large';
  showSpinner?: boolean;
}

export const ImageLoader = ({ 
  color = "#E0E0E0", 
  size = 'medium',
  showSpinner = false
}: ImageLoaderProps) => {
  // Size mapping
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  // If not showing spinner, just return the placeholder
  if (!showSpinner) {
    return null;
  }

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-opacity-20 z-10"
      style={{ backgroundColor: color }}
    >
      <Loader 
        className={`animate-spin text-roseGold/70 ${sizeMap[size]}`}
        aria-label="Loading image"
      />
    </div>
  );
};
