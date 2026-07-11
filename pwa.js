window.addEventListener("load", registerSW);

async function registerSW() {
    const allowedHosts = [
        "swipedex.app",
        "www.swipedex.app" // Fixed markdown link error
    ];

    const isMobileOrTablet =
        window.innerWidth <= 1024 ||
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0;

    // Guard clause: Only register on valid production mobile environments
    if (!allowedHosts.includes(location.hostname) || !isMobileOrTablet) {
        return;
    }

    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("/serviceworker.js", {
                scope: "/"
            });
        } catch (error) {
            console.error("Service Worker registration failed:", error);
        }
    }
}