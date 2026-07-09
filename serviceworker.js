const CACHE_NAME = "swipedex-v1";

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


    // INSTALL
    self.addEventListener("install", event => {

        self.skipWaiting();

        event.waitUntil(

            caches.open(CACHE_NAME).then(async cache => {

                /*
                    Cache the service worker scope root.

                    Example:
                    /cupofjoe/
                    /brushnetwork/
                */

                const scopeURL = new URL(
                    self.registration.scope
                );

                await cache.add(
                    scopeURL.pathname
                );

            })

        );

    });



    // ACTIVATE
    self.addEventListener("activate", event => {

        event.waitUntil(

            Promise.all([

                self.clients.claim(),

                caches.keys().then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(name =>
                                name !== CACHE_NAME
                            )
                            .map(name =>
                                caches.delete(name)
                            )

                    );

                })

            ])

        );

    });



    // FETCH
    self.addEventListener("fetch", event => {


        if (event.request.method !== "GET") {
            return;
        }


        event.respondWith(

            caches.match(event.request)

            .then(cachedResponse => {


                // Return cached file first

                if (cachedResponse) {

                    return cachedResponse;

                }



                // Otherwise download it

                return fetch(event.request)

                .then(networkResponse => {


                    if (

                        !networkResponse ||
                        networkResponse.status !== 200 ||
                        networkResponse.type === "opaque"

                    ) {

                        return networkResponse;

                    }



                    const clone =
                        networkResponse.clone();



                    caches.open(CACHE_NAME)

                    .then(cache => {

                        cache.put(
                            event.request,
                            clone
                        );

                    });



                    return networkResponse;


                })

                .catch(() => {


                    // Offline navigation fallback

                    if (
                        event.request.mode === "navigate"
                    ) {

                        return caches.match(
                            new URL(
                                self.registration.scope
                            ).pathname
                        );

                    }


                });


            })

        );


    });


}
