(function () {
    const allowedHosts = [
        "swipedex.app",
        "www.swipedex.app"
    ];
    const isMobileOrTablet =
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0);
    if (!allowedHosts.includes(window.location.hostname) || !isMobileOrTablet) {
        //return;
    }

    window.addEventListener("load", () => {
        registerSW();
    });
    async function registerSW() {
        if ("serviceWorker" in navigator) {
            try {
                await navigator
                    .serviceWorker
                    .register("serviceworker.js");
            }
            catch (e) {
                console.log("SW registration failed");
            }
        }
    }

})();