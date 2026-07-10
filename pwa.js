window.addEventListener("load", registerSW);

async function registerSW() {
    const allowedHosts = [
        "swipedex.app",
        "www.swipedex.app"
    ];

    // Accurate touch hardware check (matches your service worker exactly)
    const isMobileOrTablet =
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0);

    // Guard Clause: Block execution if domain or device type is illegal
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