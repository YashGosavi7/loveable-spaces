
import { useState, useEffect, useRef } from 'react';

interface UseImageIntersectionProps {
  priority?: boolean;
  skipLazyLoading?: boolean;
  rootMargin?: string;
  threshold?: number;
}

// Shared IntersectionObserver for better performance
const sharedObservers = new Map<string, IntersectionObserver>();

export const useImageIntersection = ({ 
  priority = false, 
  skipLazyLoading = false,
  rootMargin = "300px 0px", // Reduced from 1200px for better performance
  threshold = 0.01
}: UseImageIntersectionProps) => {
  const [isInView, setIsInView] = useState(priority || skipLazyLoading);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If priority or skipLazyLoading is true, consider the element in view immediately
    if (priority || skipLazyLoading) {
      setIsInView(true);
      return;
    }

    // Don't create observers on the server
    if (typeof window === 'undefined' || !elementRef.current) return;

    // Use a single shared IntersectionObserver for better performance
    const observerKey = `${rootMargin}-${threshold}`;
    
    if (!sharedObservers.has(observerKey) && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Find the element's ref in our local state
              const target = entry.target as HTMLDivElement;
              const dataId = target.getAttribute('data-intersection-id');
              
              // Only update our state if this is our element
              if (elementRef.current && elementRef.current.getAttribute('data-intersection-id') === dataId) {
                setIsInView(true);
                observer.unobserve(target);
              }
            }
          });
        },
        { 
          threshold,
          rootMargin
        }
      );
      
      sharedObservers.set(observerKey, observer);
    }

    const observer = sharedObservers.get(observerKey);
    
    if (elementRef.current && observer) {
      // Add a unique ID to identify this element
      const uniqueId = `img-${Math.random().toString(36).substring(2, 9)}`;
      elementRef.current.setAttribute('data-intersection-id', uniqueId);
      
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current && observer) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [priority, skipLazyLoading, rootMargin, threshold]);

  return { isInView, elementRef };
};

// Cleanup function to call on page transitions
export const cleanupImageIntersectionObservers = () => {
  sharedObservers.forEach(observer => {
    observer.disconnect();
  });
  sharedObservers.clear();
};
