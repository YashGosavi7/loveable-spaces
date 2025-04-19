
import { useState, useEffect } from 'react';
import { generatePlaceholderColor } from '@/utils/imageUtils';

interface UseOptimizedImageProps {
  src: string;
  priority?: boolean;
  preload?: boolean;
}

export const useOptimizedImage = ({ src, priority = false, preload = false }: UseOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const placeholderColor = generatePlaceholderColor(src);

  useEffect(() => {
    if (priority || preload) {
      const preloadImage = new Image();
      preloadImage.src = src;
      preloadImage.onload = () => setIsLoaded(true);
    }
  }, [src, priority, preload]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return {
    isLoaded,
    handleImageLoad,
    placeholderColor,
  };
};
