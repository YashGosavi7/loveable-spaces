
import { useState, useEffect, useRef } from 'react';

interface UseImageIntersectionProps {
  priority?: boolean;
  skipLazyLoading?: boolean;
  rootMargin?: string;
  threshold?: number;
}

// Use a more efficient shared IntersectionObserver implementation
const sharedObservers = new Map<string, IntersectionObserver>();
const observedElements = new Map<string, HTMLElement>();

export const useImageIntersection = ({ 
  priority = false, 
  skipLazyLoading = false,
  rootMargin = "200px 0px", // Reduced from 300px for better performance
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
              const target = entry.target as HTMLElement;
              const dataId = target.getAttribute('data-intersection-id');
              
              if (dataId) {
                // Mark as viewed
                setIsInView(true);
                
                // Cleanup to reduce memory usage
                observer.unobserve(target);
                observedElements.delete(dataId);
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
      
      // Track the element
      observedElements.set(uniqueId, elementRef.current);
      
      observer.observe(elementRef.current);
      
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
          const id = elementRef.current.getAttribute('data-intersection-id');
          if (id) observedElements.delete(id);
        }
      };
    }
  }, [priority, skipLazyLoading, rootMargin, threshold]);

  return { isInView, elementRef };
};

// Cleanup function to call on page transitions
export const cleanupImageIntersectionObservers = () => {
  sharedObservers.forEach(observer => {
    observer.disconnect();
  });
  sharedObservers.clear();
  observedElements.clear();
};
