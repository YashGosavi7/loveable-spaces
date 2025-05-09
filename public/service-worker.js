
// Image Optimizer Service Worker
const CACHE_NAME = 'image-cache-v2';
const IMAGE_CACHE_NAME = 'optimized-images-v2';
const STATIC_CACHE_NAME = 'static-assets-v2';

// Assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Installation event
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing Optimized Image Service Worker');
  
  // Precaching critical assets
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching static assets');
        return cache.addAll(PRECACHE_ASSETS);
      }),
      
      // Create image cache
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Image cache created');
        return cache;
      })
    ]).then(() => {
      return self.skipWaiting();
    })
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
  
  // Create a new request with the same options but optimized URL
  return new Request(optimizedUrl, {
    method: request.method,
    headers: request.headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect,
    integrity: request.integrity,
    cache: 'force-cache' // Encourage aggressive caching
  });
};

// Fetch event
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Handle image requests with special caching strategy
  if (isImageRequest(request)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          // Clone the response before returning it
          return cachedResponse.clone();
        }
        
        // Optimize the request before fetching
        const optimizedRequest = optimizeImageRequest(request);
        
        return fetch(optimizedRequest)
          .then((response) => {
            // Don't cache bad responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response since it's a stream and can only be consumed once
            const responseToCache = response.clone();
            
            // Cache the fetched image
            caches.open(IMAGE_CACHE_NAME)
              .then((cache) => {
                // Cache both the original and optimized request
                cache.put(request, responseToCache.clone());
                if (request.url !== optimizedRequest.url) {
                  cache.put(optimizedRequest, responseToCache);
                }
              });
            
            return response;
          })
          .catch(() => {
            // Return a fallback for images or pass along the network error
            if (request.url.includes('/lovable-uploads/')) {
              // Return an empty transparent image as fallback
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
    // For non-image requests, use a standard stale-while-revalidate strategy
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          // Cache any successful responses
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
        
        // Return the cached response immediately if we have one, otherwise wait for the network
        return cachedResponse || fetchPromise;
      })
    );
  }
});

// Listen for messages from clients
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
});
