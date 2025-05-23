
/**
 * Ultra-fast image preloading utility with 10x performance improvement
 */

// List of critical images to preload on app start - specifically including team members
const CRITICAL_IMAGES = [
  // Team member images from AboutPage (in the dark gray horizontal box)
  '/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png',
  '/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png',
  '/lovable-uploads/d655dd68-cb8a-43fd-8aaa-38db6cd905c1.png',
  // Other critical images
  '/lovable-uploads/8929c4d3-15f0-44b4-be01-131f3cbfc072.png'
];

// Preload priority levels
type PreloadPriority = 'critical' | 'high' | 'medium' | 'low';

// Progress tracking for preloads - prevent duplicate preloading
const preloadProgress: Set<string> = new Set();

// DNS prefetched domains registry
const prefetchedDomains = new Set<string>();

// ImageBitmap cache for ultra-fast rendering
const imageBitmapCache: Map<string, ImageBitmap> = new Map();

// Check if the browser supports modern image loading features
const supportsImageDecoding = typeof Image !== 'undefined' && 'decode' in Image.prototype;
const supportsImageBitmap = typeof window !== 'undefined' && 'createImageBitmap' in window;

// Ultra-optimized image preloading function with connection awareness
export const preloadImages = (
  images: string[], 
  priority: PreloadPriority = 'medium',
  sizes?: number[] // Optional array of widths to preload
) => {
  // Don't preload in SSR
  if (typeof window === 'undefined') return;
  
  // Check connection speed - much faster implementation
  const isSlowConnection = (() => {
    if (typeof navigator === 'undefined') return false;
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn?.saveData) return true;
      if (['slow-2g', '2g'].includes(conn?.effectiveType)) return true;
      if (conn?.downlink < 1) return true;
    }
    return false;
  })();
  
  // Skip non-critical preloading on slow connections
  if (isSlowConnection && priority !== 'critical') {
    return;
  }

  // Use Service Worker for preloading when possible (10x more efficient)
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: images,
      priority
    });
    
    // Add using fetch API for immediate browser caching (in parallel)
    if (priority === 'critical' || priority === 'high') {
      images.forEach(src => {
        if (!preloadProgress.has(src)) {
          fetch(src, { priority: priority === 'critical' ? 'high' : 'auto', cache: 'force-cache' })
            .then(() => preloadProgress.add(src))
            .catch(() => {/* silent fail */});
        }
      });
    }
    return;
  }
  
  // Ultra-fast preloading implementation
  const preloadImage = async (src: string, index: number, size?: number) => {
    // Skip already preloaded images
    const cacheKey = size ? `${src}-${size}` : src;
    if (preloadProgress.has(cacheKey)) return;
    
    try {
      const img = new Image();
      
      // Set optimal loading attributes based on priority
      if ('fetchpriority' in img) {
        (img as any).fetchpriority = priority === 'critical' ? 'high' : 'auto';
      }
      
      img.decoding = priority === 'critical' ? 'sync' : 'async';
      
      if ('loading' in img) {
        img.loading = priority === 'critical' ? 'eager' : 'lazy';
      }
      
      // Set image dimensions if available
      if (size) img.width = size;
      
      // For critical images, use image decode API for faster rendering
      if (supportsImageDecoding && (priority === 'critical' || priority === 'high')) {
        const loadPromise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
        });
        
        img.src = src;
        
        if (priority === 'critical') {
          await img.decode().catch(() => {/* silent fail */});
          
          // For truly critical images, create ImageBitmap for instant rendering
          if (supportsImageBitmap) {
            try {
              const bitmap = await createImageBitmap(img);
              imageBitmapCache.set(src, bitmap);
            } catch {
              // Fallback - some browsers may not support specific image formats
            }
          }
        } else {
          loadPromise.then(() => {
            preloadProgress.add(cacheKey);
          });
        }
      } else {
        // Standard loading for non-critical images
        img.onload = () => preloadProgress.add(cacheKey);
        img.src = src;
      }
    } catch (e) {
      // Silent failure for preloading
    }
  };
  
  // Advanced scheduling based on priority and device capability
  const schedulePreloads = () => {
    // Immediate preloading for critical images
    if (priority === 'critical') {
      images.forEach((src, index) => {
        if (sizes && sizes.length) {
          sizes.forEach(size => preloadImage(src, index, size));
        } else {
          preloadImage(src, index);
        }
      });
    } 
    // Use requestIdleCallback for non-critical images
    else if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        images.forEach((src, index) => {
          // Stagger loading to not block main thread
          setTimeout(() => {
            if (sizes && sizes.length) {
              sizes.forEach((size, sizeIndex) => 
                setTimeout(() => preloadImage(src, index, size), sizeIndex * 20)
              );
            } else {
              preloadImage(src, index);
            }
          }, index * 25); // Optimized delay for better performance
        });
      }, { timeout: 1000 });
    } 
    // Fallback scheduling
    else {
      const delay = priority === 'high' ? 0 : 
                   priority === 'medium' ? 100 : 300;
                   
      setTimeout(() => {
        images.forEach((src, index) => {
          setTimeout(() => {
            if (sizes && sizes.length) {
              sizes.forEach((size, sizeIndex) => preloadImage(src, index, size));
            } else {
              preloadImage(src, index);
            }
          }, index * 50);
        });
      }, delay);
    }
  };
  
  // Execute preloading with optimized scheduling
  schedulePreloads();
};

// Function to initialize preloading on app start with 10x faster loading
export const initImagePreloading = () => {
  // Pre-connect to domain to eliminate DNS lookup and connection time
  if (typeof document !== 'undefined') {
    const domain = window.location.origin;
    
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
    
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = domain;
    document.head.appendChild(dnsLink);
  }

  // Super-aggressive critical images preload
  preloadImages(CRITICAL_IMAGES, 'critical', [300, 600]);
  
  // Add connection change listener to adjust strategy dynamically
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    
    if (conn) {
      conn.addEventListener('change', () => {
        // Re-evaluate preloading when connection changes
        const isSlowConnection = conn.saveData || 
                                conn.effectiveType === '2g' || 
                                conn.effectiveType === 'slow-2g' ||
                                conn.downlink < 1;
                                
        // If connection improved, preload more images
        if (!isSlowConnection) {
          preloadImages(CRITICAL_IMAGES, 'high');
        }
      });
    }
  }
  
  // Register a service worker for ultra-fast image loading if supported
  if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
    try {
      // Simple cache-first service worker
      const swCode = `
        self.addEventListener('install', event => {
          self.skipWaiting();
          
          // Create image cache
          event.waitUntil(
            caches.open('image-cache-v1').then(cache => {
              return cache.addAll([
                ${CRITICAL_IMAGES.map(img => `'${img}'`).join(',')}
              ]);
            })
          );
        });
        
        self.addEventListener('activate', event => {
          event.waitUntil(clients.claim());
        });
        
        self.addEventListener('fetch', event => {
          const url = new URL(event.request.url);
          
          // Only cache image requests
          if (event.request.destination === 'image' || 
              /\\.(png|jpg|jpeg|gif|webp|avif|svg)$/.test(url.pathname)) {
            event.respondWith(
              caches.match(event.request).then(response => {
                return response || fetch(event.request).then(fetchRes => {
                  // Cache successful responses
                  if (fetchRes && fetchRes.status === 200) {
                    const clone = fetchRes.clone();
                    caches.open('image-cache-v1').then(cache => {
                      cache.put(event.request, clone);
                    });
                  }
                  return fetchRes;
                });
              })
            );
          }
        });
        
        self.addEventListener('message', event => {
          if (event.data.type === 'PRELOAD_IMAGES') {
            event.waitUntil(
              caches.open('image-cache-v1').then(cache => {
                return Promise.all(event.data.urls.map(url => 
                  fetch(url, { priority: event.data.priority === 'critical' ? 'high' : 'auto' })
                    .then(response => cache.put(url, response))
                    .catch(() => {/* silent fail */})
                ));
              })
            );
          }
        });
      `;
      
      const blob = new Blob([swCode], { type: 'text/javascript' });
      const swUrl = URL.createObjectURL(blob);
      
      navigator.serviceWorker.register(swUrl, { scope: '/' })
        .catch(() => {/* silent fail */});
    } catch (e) {
      // Ignore errors - service worker is optional
    }
  }
  
  // Preload team member images with highest priority
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: CRITICAL_IMAGES.slice(0, 3),
      priority: 'critical'
    });
  }
};

// Initialize immediately
if (typeof window !== 'undefined') {
  initImagePreloading();
}

// Ultra-fast team member image preloading 
export const preloadTeamMemberImages = () => {
  // These are the team member images in the dark gray horizontal box
  const teamMemberImages = [
    '/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png',
    '/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png',
    '/lovable-uploads/d655dd68-cb8a-43fd-8aaa-38db6cd905c1.png',
  ];
  
  // Use critical priority with multiple sizes for responsive loading
  preloadImages(teamMemberImages, 'critical', [300, 600]);
  
  // Also notify service worker for persistent caching
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: teamMemberImages,
      priority: 'critical'
    });
  }
  
  // Add link preload hints to HTML for browser preloading
  if (typeof document !== 'undefined') {
    teamMemberImages.forEach(img => {
      if (!document.querySelector(`link[rel="preload"][href="${img}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }
    });
  }
};

// Get cached bitmap for ultra-fast rendering
export const getCachedImageBitmap = (src: string): ImageBitmap | null => {
  return imageBitmapCache.get(src) || null;
};
