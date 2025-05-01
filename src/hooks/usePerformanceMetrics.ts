
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  cls: number | null; // Cumulative Layout Shift
  fid: number | null; // First Input Delay
  ttfb: number | null; // Time to First Byte
  navigation: {
    type: string;
    redirectCount: number;
    loadEventTime: number;
    domContentLoadedTime: number;
  } | null;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    navigation: null
  });

  useEffect(() => {
    // Only collect metrics in browser environment and if Performance API is available
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      console.log('Performance API not supported in this browser');
      return;
    }

    // Navigation and timing data
    if (performance.getEntriesByType) {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navEntry) {
        setMetrics(prev => ({
          ...prev,
          navigation: {
            type: navEntry.type,
            redirectCount: navEntry.redirectCount,
            loadEventTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            domContentLoadedTime: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart
          },
          ttfb: navEntry.responseStart - navEntry.requestStart
        }));
      }
    }

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0] as PerformancePaintTiming;
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
        console.log(`FCP: ${fcp.startTime.toFixed(1)}ms`);
      }
    });
    
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      setMetrics(prev => ({ ...prev, lcp: lastEntry?.startTime || null }));
      console.log(`LCP: ${lastEntry?.startTime?.toFixed(1)}ms`);
    });
    
    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }));
      console.log(`CLS: ${clsValue.toFixed(3)}`);
    });
    
    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0] as any;
        setMetrics(prev => ({ 
          ...prev, 
          fid: firstInput.processingStart - firstInput.startTime 
        }));
        console.log(`FID: ${(firstInput.processingStart - firstInput.startTime).toFixed(1)}ms`);
      }
    });

    // Start observing
    try {
      fcpObserver.observe({ type: 'paint', buffered: true });
      
      lcpObserver.observe({ 
        type: 'largest-contentful-paint', 
        buffered: true 
      });
      
      clsObserver.observe({ 
        type: 'layout-shift', 
        buffered: true 
      });
      
      fidObserver.observe({ 
        type: 'first-input', 
        buffered: true 
      });
    } catch (e) {
      console.error('Error setting up performance observers:', e);
    }

    // Cleanup
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  return metrics;
};
