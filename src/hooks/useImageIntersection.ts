
import { useState, useEffect, useRef } from 'react';

interface UseImageIntersectionProps {
  priority?: boolean;
  skipLazyLoading?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const useImageIntersection = ({
  priority = false,
  skipLazyLoading = false,
  rootMargin = '800px 0px', // Load images 800px before they enter viewport
  threshold = 0.01 // Trigger when just 1% of the element is visible
}: UseImageIntersectionProps = {}) => {
  const [isInView, setIsInView] = useState(priority || skipLazyLoading);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    // If priority or skipLazyLoading is true, always consider in view
    if (priority || skipLazyLoading) {
      setIsInView(true);
      return;
    }

    // Skip if IntersectionObserver is not supported
    if (!element || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    // Create observer with custom options
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority, skipLazyLoading, rootMargin, threshold]);

  return { isInView, elementRef };
};
