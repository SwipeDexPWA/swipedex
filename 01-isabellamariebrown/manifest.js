(function injectDynamicManifest() {
    const allowedHosts = ["swipedex.app", "www.swipedex.app"];
    
    // Guard Clause: Stops execution on local clones or alternative domains
    if (!allowedHosts.includes(window.location.hostname)) {
        return; 
    }

    const manifestData = {
        "name": "Cup of Joe",
        "short_name": "CupOfJoe",
        "description": "Your ultimate companion for Swipedex tracking.",
        // Critical: Update paths to point exactly inside your subfolder!
        "start_url": "/01-isabellabrown/", 
        "scope": "/01-isabellabrown/",
        "display": "standalone",
        "orientation": "portrait",
        "background_color": "#1d1412",
        "theme_color": "#1d1412",
        "icons": [
            { "src": "/cupofjoe/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
            { "src": "/cupofjoe/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
            { "src": "/cupofjoe/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
            { "src": "/cupofjoe/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
        ]
    };

    // Convert data array into an active live link target
    const manifestBlob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(manifestBlob);

    const linkTag = document.createElement('link');
    linkTag.rel = 'manifest';
    linkTag.href = manifestURL;
    document.head.appendChild(linkTag);
})();