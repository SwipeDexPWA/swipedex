window.addEventListener("load", () => {
    registerSW();
});
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
    if ("serviceWorker" in navigator) {
        try {
            const registration =
                await navigator.serviceWorker.register(
                    "/serviceworker.js",
                    {
                        scope: "./"
                    }
                );
            console.log(
                "SW registered:",
                registration.scope
            );
        } catch (error) {
            console.error(
                "Service Worker registration failed:",
                error
            );
        }
    }
}