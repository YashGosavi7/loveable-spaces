
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supportsWebP, supportsAVIF, isLowBandwidth } from '@/utils/imageOptimization';

interface ImageOptimizationContextType {
  supportsWebP: boolean;
  supportsAVIF: boolean;
  isSlowConnection: boolean;
  preloadMode: 'eager' | 'conservative';
}

const defaultContext: ImageOptimizationContextType = {
  supportsWebP: false,
  supportsAVIF: false,
  isSlowConnection: false,
  preloadMode: 'conservative',
};

const ImageOptimizationContext = createContext<ImageOptimizationContextType>(defaultContext);

export const useImageOptimization = () => useContext(ImageOptimizationContext);

interface ImageOptimizationProviderProps {
  children: ReactNode;
  preloadStrategy?: 'eager' | 'conservative';
}

export const ImageOptimizationProvider: React.FC<ImageOptimizationProviderProps> = ({ 
  children,
  preloadStrategy = 'conservative' 
}) => {
  const [state, setState] = useState<ImageOptimizationContextType>({
    ...defaultContext,
    preloadMode: preloadStrategy,
  });
  
  // Run detection on mount
  useEffect(() => {
    Promise.all([
      Promise.resolve(supportsWebP()),
      Promise.resolve(supportsAVIF()),
      Promise.resolve(isLowBandwidth())
    ]).then(([webpSupport, avifSupport, slowConnection]) => {
      setState(prev => ({
        ...prev,
        supportsWebP: webpSupport,
        supportsAVIF: avifSupport,
        isSlowConnection: slowConnection
      }));
    });
    
    // Add DNS prefetching for common image domains
    const addDomainHints = () => {
      const domains = [window.location.hostname];
      
      domains.forEach(domain => {
        if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'dns-prefetch';
          prefetchLink.href = `//${domain}`;
          document.head.appendChild(prefetchLink);
          
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = `//${domain}`;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        }
      });
    };
    
    addDomainHints();
    
  }, []);
  
  return (
    <ImageOptimizationContext.Provider value={state}>
      {children}
    </ImageOptimizationContext.Provider>
  );
};

export default ImageOptimizationProvider;
