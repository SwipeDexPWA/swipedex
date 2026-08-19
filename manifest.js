(function injectDynamicManifest() {
    const allowedHosts = [
        "swipedex.app",
        "www.swipedex.app"
    ];
    const isMobileOrTablet =
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0);
    if (!allowedHosts.includes(window.location.hostname) || !isMobileOrTablet) {
        return;
    }
    const manifestData = {
        "name": "SwipeDex℠",
        "short_name": "SwipeDex℠",
        "description": "Digital Business Cards & Progressive Web Apps (PWA)",
        "start_url": "/",
        "scope": "/",
        "display": "fullscreen",
        "orientation": "any",
        "background_color": "#222222",
        "theme_color": "#222222",
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