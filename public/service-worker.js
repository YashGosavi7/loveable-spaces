
// Image Optimizer Service Worker
const CACHE_NAME = 'image-cache-v3';
const IMAGE_CACHE_NAME = 'optimized-images-v3';
const STATIC_CACHE_NAME = 'static-assets-v3';

// Assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Critical image paths to precache
const CRITICAL_IMAGES = [
  // Team member images from AboutPage that are in the horizontal dark gray box
  '/lovable-uploads/25d0624e-4f4a-4e2d-a084-f7bf8671b099.png',
  '/lovable-uploads/f99d8834-eeec-4f35-b430-48d82f605f55.png',
  '/lovable-uploads/d655dd68-cb8a-43fd-8aaa-38db6cd905c1.png'
];

// Installation event
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing Optimized Image Service Worker v3');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  // Precaching critical assets and images
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching static assets');
        return cache.addAll(PRECACHE_ASSETS);
      }),
      
      // Create image cache and precache critical images
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching critical images');
        return cache.addAll(CRITICAL_IMAGES);
      })
    ])
  );
});

// Activation event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating Optimized Image Service Worker');
  
  const currentCaches = [STATIC_CACHE_NAME, IMAGE_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Helper function to determine if a request is for an image
const isImageRequest = (request) => {
  const url = new URL(request.url);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.ico'];
  return imageExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext));
};

// Function to apply optimizations to image request
const optimizeImageRequest = (request) => {
  const url = new URL(request.url);
  
  // Don't modify SVGs or already optimized images
  if (url.pathname.endsWith('.svg') || url.searchParams.has('optimized')) {
    return request;
  }
  
  // Clone the request to modify it
  const optimizedUrl = new URL(request.url);
  
  // Add optimization parameters
  optimizedUrl.searchParams.set('optimized', 'true');
  optimizedUrl.searchParams.set('cache', Date.now().toString().slice(0, -3)); // Cache for 1000 seconds
  
  // Create a new request with the same options but optimized URL
  return new Request(optimizedUrl, {
    method: request.method,
    headers: request.headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect,
    integrity: request.integrity,
    cache: 'force-cache' // Enforce aggressive caching
  });
};

// Fetch event with network-first strategy for images
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Handle image requests with special caching strategy
  if (isImageRequest(request)) {
    // Use network-first strategy for better performance after initial load
    event.respondWith(
      fetch(optimizeImageRequest(request))
        .then((networkResponse) => {
          // Clone the response before caching
          const responseToCache = networkResponse.clone();
          
          // Cache the fresh response
          caches.open(IMAGE_CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          
          return networkResponse;
        })
        .catch(() => {
          // Fall back to cache if network fails
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If nothing in cache either, return empty transparent image
            if (request.url.includes('/lovable-uploads/')) {
              return new Response('', {
                status: 200,
                statusText: 'OK'
              });
            }
            
            // For other errors, let them propagate
            throw new Error(`Failed to fetch: ${request.url}`);
          });
        })
    );
  } else {
    // For non-image requests, use standard cache-first strategy
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((networkResponse) => {
          // Cache successful responses
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          
          return networkResponse;
        });
      })
    );
  }
});

// Listen for messages to preload images
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_NEW_IMAGE') {
    // Manually cache a specific image when requested
    const imageUrl = event.data.url;
    
    if (!imageUrl) return;
    
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      cache.add(imageUrl).then(() => {
        console.log('[ServiceWorker] Cached image:', imageUrl);
      }).catch(err => {
        console.error('[ServiceWorker] Failed to cache image:', err);
      });
    });
  }
  
  // Handle batch image preloading
  if (event.data && event.data.type === 'PRELOAD_IMAGES') {
    const urls = event.data.urls;
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) return;
    
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      // Process in batches to avoid overwhelming the browser
      const batchSize = 3;
      const preloadBatch = (startIndex) => {
        const batch = urls.slice(startIndex, startIndex + batchSize);
        
        if (batch.length === 0) return;
        
        Promise.all(batch.map(url => {
          return fetch(url, { mode: 'no-cors', cache: 'force-cache' })
            .then(response => {
              if (response) {
                return cache.put(url, response);
              }
            })
            .catch(err => {
              console.warn('[ServiceWorker] Failed to preload image:', url, err);
            });
        })).then(() => {
          // Process next batch
          if (startIndex + batchSize < urls.length) {
            setTimeout(() => preloadBatch(startIndex + batchSize), 300);
          }
        });
      };
      
      // Start batch processing
      preloadBatch(0);
    });
  }
});
