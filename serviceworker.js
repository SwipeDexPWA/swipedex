const CACHE_NAME = "swipedex-test-v1";


self.addEventListener("install", event => {

    console.log("SW INSTALL");

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            console.log("Creating cache");

            return cache.add(
                "/cupofjoe/"
            );

        })

    );

    self.skipWaiting();

});



self.addEventListener("activate", event => {

    console.log("SW ACTIVE");

    event.waitUntil(
        self.clients.claim()
    );

});



self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            if (response) {

                console.log(
                    "CACHE HIT:",
                    event.request.url
                );

                return response;

            }


            return fetch(event.request)
            .then(networkResponse => {


                const clone =
                    networkResponse.clone();


                caches.open(CACHE_NAME)
                .then(cache => {

                    console.log(
                        "Caching:",
                        event.request.url
                    );

                    cache.put(
                        event.request,
                        clone
                    );

                });


                return networkResponse;

            });


        })

    );

});
