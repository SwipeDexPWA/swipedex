const CACHE_NAME = "swipedex-v1";

// Add paths to the core files your app needs to load initially
const PRECACHE_ASSETS = [
    "/",
    "/index.html",
    // Add your main CSS or JS files here if needed, e.g., "/styles.css"
];

// 1. Install Event: Cache core assets immediately
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// 2. Activate Event: Clean up old caches if CACHE_NAME changes
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Fetch Event
self.addEventListener("fetch", event => {
    // Only handle standard GET requests
    if (event.request.method !== "GET") return;

    const request = event.request;

    // -----------------------------
    // HTML pages (Network First, Cache Fallback)
    // -----------------------------
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // If valid, clone and save to cache
                    if (response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, copy);
                        });
                    }
                    return response;
                })
                .catch(async () => {
                    // OFFLINE FALLBACK
                    const cache = await caches.open(CACHE_NAME);
                    const matched = await cache.match(request, { ignoreSearch: true });
                    
                    // Return matched page, or fallback to the cached root "/"
                    return matched || await cache.match("/");
                })
        );
        return;
    }

    // -----------------------------
    // Assets: CSS / JS / Images (Cache First, Network Fallback)
    // -----------------------------
    event.respondWith(
        caches.match(request, { ignoreSearch: true })
            .then(cached => {
                if (cached) {
                    return cached;
                }
                return fetch(request).then(response => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, copy);
                        });
                    }
                    return response;
                });
            })
    );
});