const CACHE_NAME = "swipedex-v1";

const PRECACHE_ASSETS = [
    "/",
    "/index.html"
];

// 1. Install Event: Cache core assets immediately
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Helper: Slices a full cached file into a 206 Partial Content response for video/audio
async function handleRangeRequest(request, cachedResponse) {
    const rawRange = request.headers.get("range");
    if (!rawRange) return cachedResponse;

    const arrayBuffer = await cachedResponse.arrayBuffer();
    const match = rawRange.match(/^bytes=(\d+)-(\d+)?$/);

    if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2] ? parseInt(match[2], 10) : arrayBuffer.byteLength - 1;

        const slicedBuffer = arrayBuffer.slice(start, end + 1);
        
        return new Response(slicedBuffer, {
            status: 206,
            statusText: "Partial Content",
            headers: {
                ...Object.fromEntries(cachedResponse.headers.entries()),
                "Content-Range": `bytes ${start}-${end}/${arrayBuffer.byteLength}`,
                "Content-Length": slicedBuffer.byteLength
            }
        });
    }

    return new Response(null, { status: 416, statusText: "Range Not Satisfiable" });
}

// 3. Main Fetch Interceptor (With your Host and Mobile restrictions)
self.addEventListener("fetch", event => {
    // --- YOUR CUSTOM ENVIROMENT GUARDS ---
    const allowedHosts = [
        "swipedex.app",
        "www.swipedex.app"
    ];

    // Check if device is a mobile or tablet layout
    const isMobileOrTablet =
        ("ontouchstart" in self) ||
        (self.navigator && self.navigator.maxTouchPoints > 0);

    const isAllowedHost = allowedHosts.includes(self.location.hostname);

    // If they aren't on mobile OR aren't on your live production host, 
    // bypass the Service Worker entirely and use normal network behavior.
    if (!isAllowedHost || !isMobileOrTablet) {
        return; 
    }
    // -------------------------------------

    // Only handle standard GET requests
    if (event.request.method !== "GET") return;

    const request = event.request;

    // -----------------------------
    // VIDEO / AUDIO / RANGE REQUESTS
    // -----------------------------
    if (request.headers.has("range") || request.destination === "video" || request.destination === "audio") {
        event.respondWith(
            caches.match(request, { ignoreSearch: true }).then(async cached => {
                if (cached) {
                    return handleRangeRequest(request, cached);
                }
                
                return fetch(request).then(response => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, copy);
                        });
                    }
                    return response;
                }).catch(() => {
                    return new Response(null, { status: 404 });
                });
            })
        );
        return;
    }

    // -----------------------------
    // HTML pages (Network First)
    // -----------------------------
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(async () => {
                    const cache = await caches.open(CACHE_NAME);
                    const matched = await cache.match(request, { ignoreSearch: true });
                    return matched || await cache.match("/");
                })
        );
        return;
    }

    // -----------------------------
    // Standard Assets: CSS / JS / Images (Cache First)
    // -----------------------------
    event.respondWith(
        caches.match(request, { ignoreSearch: true })
            .then(cached => {
                if (cached) return cached;
                return fetch(request).then(response => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                    }
                    return response;
                });
            })
    );
});