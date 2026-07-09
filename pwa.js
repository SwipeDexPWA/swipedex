window.addEventListener(
    "load",
    registerSW
);


async function registerSW() {


    const allowedHosts = [
        "swipedex.app",
        "www.swipedex.app"
    ];


    const isMobileOrTablet =
        window.innerWidth <= 1024 ||
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0;



    if (
        !allowedHosts.includes(location.hostname) ||
        !isMobileOrTablet
    ) {

        return;

    }



    if (
        "serviceWorker" in navigator
    ) {


        try {


            await navigator.serviceWorker.register(

                "/serviceworker.js",

                {

                    /*
                       Automatically becomes:

                       /cupofjoe/
                       /brushnetwork/

                       depending where page is loaded
                    */

                    scope: "./"

                }

            );


            console.log(
                "SwipeDex Service Worker Registered"
            );


        }

        catch(error) {

            console.error(
                "SW registration failed:",
                error
            );

        }


    }


}
