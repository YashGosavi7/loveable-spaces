
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
  rootMargin = "800px 0px",
  threshold = 0.01
}: UseImageIntersectionProps) => {
  const [isInView, setIsInView] = useState(priority || skipLazyLoading);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // If priority or skipLazyLoading is true, consider the element in view immediately
    if (priority || skipLazyLoading) {
      setIsInView(true);
      return;
    }

    // Use a single shared IntersectionObserver for better performance
    const getObserver = () => {
      if (!observerRef.current && typeof IntersectionObserver !== 'undefined') {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setIsInView(true);
                // Once the element is in view, stop observing it
                if (elementRef.current && observerRef.current) {
                  observerRef.current.unobserve(elementRef.current);
                }
              }
            });
          },
          { 
            threshold,
            rootMargin
          }
        );
      }
      return observerRef.current;
    };

    const observer = getObserver();
    
    if (elementRef.current && observer) {
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
