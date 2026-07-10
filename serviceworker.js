const CACHE_NAME = "swipedex";

const allowedHosts = [
    "swipedex.app",
    "www.swipedex.app"
];

const isMobileOrTablet =
    ("ontouchstart" in self) ||
    (self.navigator && self.navigator.maxTouchPoints > 0);

const isAllowedHost =
    allowedHosts.includes(self.location.hostname);

if (!isAllowedHost || !isMobileOrTablet) {
    return;
}

self.addEventListener("install", event => {

    self.skipWaiting();

});

self.addEventListener("activate", event => {

    event.waitUntil(self.clients.claim());

});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    const request = event.request;

    // -----------------------------
    // HTML pages (Network First)
    // -----------------------------
    if (request.mode === "navigate") {

        event.respondWith(

            fetch(request)

                .then(response => {

                    const copy = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(request, copy);

                            // Also cache the scope root
                            cache.put(
                                new Request(
                                    new URL(self.registration.scope).pathname
                                ),
                                response.clone()
                            );

                        });

                    return response;

                })

                .catch(async () => {

                    const cache = await caches.open(CACHE_NAME);

                    return (
                        await cache.match(request, {
                            ignoreSearch: true
                        })
                    ) ||
                    (
                        await cache.match(
                            new URL(self.registration.scope).pathname
                        )
                    );

                })

        );

        return;

    }

    // -----------------------------
    // CSS / JS / Images / JSON
    // -----------------------------
    event.respondWith(

        caches.match(request, {
            ignoreSearch: true
        })

        .then(cached => {

            if (cached) {
                return cached;
            }

            return fetch(request)

                .then(response => {

                    if (
                        response &&
                        response.status === 200
                    ) {

                        const copy = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(request, copy);

                            });

                    }

                    return response;

                });

        })

    );

});
