/* eslint-disable no-restricted-globals */

// Cache version ID - change this whenever the service worker logic changes
const CACHE_VERSION = 'v1';

// Names of caches
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `image-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-cache-${CACHE_VERSION}`;

// Assets to precache (add crucial assets here)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js'
];

// Install event - precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(PRECACHE_ASSETS);
      }),
      
      // Create image cache (will be filled later)
      caches.open(IMAGE_CACHE)
    ])
    .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            // Delete old versions of our caches
            return cacheName.startsWith('static-cache-') && cacheName !== STATIC_CACHE ||
                   cacheName.startsWith('image-cache-') && cacheName !== IMAGE_CACHE ||
                   cacheName.startsWith('runtime-cache-') && cacheName !== RUNTIME_CACHE;
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is an image
const isImageRequest = request => {
  const url = new URL(request.url);
  return (
    request.destination === 'image' ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.svg')
  );
};

// Fetch event - network first for dynamic content, cache first for images
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Special strategy for images
  if (isImageRequest(event.request)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          // Return from cache if available
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise go to network
          return fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const clonedResponse = networkResponse.clone();
              // Store in cache
              cache.put(event.request, clonedResponse);
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }
  
  // Default strategy for other assets - network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If this is a navigation request or HTML document, cache it for offline use
        if (
          response &&
          response.status === 200 &&
          (event.request.mode === 'navigate' || 
           event.request.headers.get('accept').includes('text/html'))
        ) {
          const clonedResponse = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request);
      })
  );
});

// Listen for messages from clients (e.g., to clear cache)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_IMAGE_CACHE') {
    caches.open(IMAGE_CACHE).then(cache => {
      cache.keys().then(keys => {
        keys.forEach(request => cache.delete(request));
      });
    });
  }
});
