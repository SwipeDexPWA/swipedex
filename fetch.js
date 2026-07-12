(function initGlobalProtection() {
    const allowedHosts = ["swipedex.app", "www.swipedex.app"];
    const isMobileOrTablet = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    if (!allowedHosts.includes(window.location.hostname) || !isMobileOrTablet) {
        document.body.innerHTML = "<h1>Unauthorized Environment</h1>";
        throw new Error("PWA assets locked.");
    }
})();
window.addEventListener("load", registerSW);
async function registerSW() {
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