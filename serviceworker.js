const allowedHosts = [
    "swipedex.app",
    "www.swipedex.app"
];
const isMobileOrTablet =
    ("ontouchstart" in window) ||
    (navigator.maxTouchPoints > 0);
if (!allowedHosts.includes(location.hostname) || !isMobileOrTablet) {
    return;
}
const CACHE_NAME = 'swipedex-offline-v1';

const APP_SHELL = [
    '/',
    '/index.html',
    '/data.json'
];

// Install: cache the complete app shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: Cache First
self.addEventListener('fetch', event => {

    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {

            // Use cached file when available
            if (cachedResponse) {
                return cachedResponse;
            }

            // Otherwise try the network
            return fetch(event.request)
                .then(networkResponse => {

                    // Only cache valid responses
                    if (
                        networkResponse &&
                        networkResponse.status === 200 &&
                        networkResponse.type === 'basic'
                    ) {
                        const responseClone = networkResponse.clone();

                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }

                    return networkResponse;
                })
                .catch(() => {

                    // If navigation fails completely,
                    // return the cached index.html
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }

                    return new Response('', {
                        status: 503,
                        statusText: 'Offline'
                    });
                });
        })
    );
});
