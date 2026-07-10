const CACHE_NAME = "swipedex-v3";

const allowedHosts = [
    "swipedex.app",
    "www.swipedex.app"
];

const isMobileOrTablet =
    ("ontouchstart" in self) ||
    (self.navigator && self.navigator.maxTouchPoints > 0);

const isAllowedHost =
    allowedHosts.includes(self.location.hostname);

if (isAllowedHost && isMobileOrTablet) {

    self.addEventListener("install", event => {

        self.skipWaiting();

        event.waitUntil(

            caches.open(CACHE_NAME).then(cache => {

                // Cache the current app root
                return cache.add(
                    new URL(self.registration.scope).pathname
                );

            })

        );

    });



    self.addEventListener("activate", event => {

        event.waitUntil(

            Promise.all([

                self.clients.claim(),

                caches.keys().then(keys =>

                    Promise.all(

                        keys
                            .filter(key => key !== CACHE_NAME)
                            .map(key => caches.delete(key))

                    )

                )

            ])

        );

    });



    self.addEventListener("fetch", event => {

        if (event.request.method !== "GET") {
            return;
        }

        event.respondWith(

            caches.match(event.request, {
                ignoreSearch: true
            })

            .then(cachedResponse => {

                if (cachedResponse) {

                    console.log(
                        "CACHE HIT:",
                        event.request.url
                    );

                    return cachedResponse;

                }

                return fetch(event.request)

                .then(networkResponse => {

                    if (
                        !networkResponse ||
                        networkResponse.status !== 200
                    ) {
                        return networkResponse;
                    }

                    const clone =
                        networkResponse.clone();

                    caches.open(CACHE_NAME).then(cache => {

                        cache.put(
                            event.request,
                            clone
                        );

                    });

                    return networkResponse;

                })

                .catch(() => {

                    // Offline page fallback
                    if (event.request.mode === "navigate") {

                        return caches.match(
                            new URL(self.registration.scope).pathname
                        );

                    }

                    // Any other missing file
                    return new Response("", {
                        status: 404,
                        statusText: "Offline"
                    });

                });

            })

        );

    });

}
