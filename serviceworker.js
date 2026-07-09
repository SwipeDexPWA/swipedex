const CACHE_NAME = "swipedex-v2";

self.addEventListener("install", event => {

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(
        self.clients.claim()
    );

});


self.addEventListener("fetch", event => {


    if (event.request.method !== "GET") {
        return;
    }


    const requestURL = new URL(event.request.url);


    // Only cache SwipeDex pages
    if (
        requestURL.hostname !== "swipedex.app" &&
        requestURL.hostname !== "www.swipedex.app"
    ) {
        return;
    }



    event.respondWith(

        caches.match(event.request)

        .then(cached => {


            if (cached) {
                return cached;
            }



            return fetch(event.request)

            .then(response => {


                if (
                    !response ||
                    response.status !== 200
                ) {
                    return response;
                }


                const copy =
                    response.clone();



                caches.open(CACHE_NAME)

                .then(cache => {


                    cache.put(
                        event.request,
                        copy
                    );


                });



                return response;


            });


        })

    );


});
