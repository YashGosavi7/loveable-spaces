
import { useState, useEffect, useRef } from 'react';

interface UseImageIntersectionProps {
  priority?: boolean;
  skipLazyLoading?: boolean;
  rootMargin?: string;
  threshold?: number;
}

// Use a shared observer for better performance
const observers = new Map<string, IntersectionObserver>();

export const useImageIntersection = ({ 
  priority = false, 
  skipLazyLoading = false,
  rootMargin = "1200px 0px", // Much more aggressive preloading
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

    // Get connection speed to adjust intersection thresholds
    const getConnectionSpeed = () => {
      if (typeof navigator === 'undefined') return 'unknown';
      
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        
        if (conn) {
          if (conn.saveData) return 'slow';
          if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return 'slow';
          if (conn.effectiveType === '3g') return 'medium';
        }
      }
      
      return 'unknown';
    };

    // Adjust root margin based on connection speed
    const getOptimizedRootMargin = () => {
      const speed = getConnectionSpeed();
      
      if (speed === 'slow') {
        // Less aggressive for slow connections
        return "600px 0px";
      }
      
      if (speed === 'medium') {
        // Medium aggressive for 3G
        return "900px 0px";
      }
      
      // Very aggressive preloading for fast connections
      return rootMargin;
    };

    // Use a single shared IntersectionObserver for better performance
    const observerKey = `${getOptimizedRootMargin()}-${threshold}`;
    
    if (!observers.has(observerKey) && typeof IntersectionObserver !== 'undefined') {
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
          rootMargin: getOptimizedRootMargin() 
        }
      );
      
      observers.set(observerKey, observer);
    }

    const observer = observers.get(observerKey);
    
    if (elementRef.current && observer) {
      // Add a unique ID to identify this element
      const uniqueId = `image-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
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
