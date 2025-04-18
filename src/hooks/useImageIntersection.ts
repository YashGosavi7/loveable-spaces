
import { useState, useEffect, useRef } from 'react';

interface UseImageIntersectionProps {
  priority?: boolean;
  skipLazyLoading?: boolean;
}

export const useImageIntersection = ({ 
  priority = false, 
  skipLazyLoading = false 
}: UseImageIntersectionProps) => {
  const [isInView, setIsInView] = useState(priority || skipLazyLoading);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || skipLazyLoading) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { 
        threshold: 0.01,
        rootMargin: "800px 0px"
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [priority, skipLazyLoading]);

  return { isInView, elementRef };
};
