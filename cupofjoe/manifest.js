(function initGlobalProtection() {
    const allowedHosts = ["swipedex.app", "www.swipedex.app"];
    const isMobileOrTablet = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    if (!allowedHosts.includes(window.location.hostname) || !isMobileOrTablet) {
        document.body.innerHTML = "<h1>Unauthorized Environment</h1>";
        throw new Error("PWA assets locked.");
    }
})();
(function injectDynamicManifest() {
    const manifestData = {
        "name": "Cup of Joe",
        "short_name": "CupOfJoe",
        "description": "Coffee for the Common Man",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "orientation": "portrait",
        "background_color": "#1d1412",
        "theme_color": "#1d1412",
        "icons": [
            { "src": "icon-72x72.png", "sizes": "72x72", "type": "image/png" },
            { "src": "icon-96x96.png", "sizes": "96x96", "type": "image/png" },
            { "src": "icon-128x128.png", "sizes": "128x128", "type": "image/png" },
            { "src": "icon-144x144.png", "sizes": "144x144", "type": "image/png" },
            { "src": "icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
            { "src": "icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
            { "src": "icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
            { "src": "icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
        ]
    };
    const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(manifestBlob);
    const linkTag = document.createElement('link');
    linkTag.rel = 'manifest';
    linkTag.href = manifestURL;
    document.head.appendChild(linkTag);
})();