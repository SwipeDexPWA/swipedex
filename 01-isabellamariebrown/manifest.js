(function injectDynamicManifest() {
    const allowedHosts = ["swipedex.app", "www.swipedex.app"];
    
    // Guard Clause: Stops execution on local clones or alternative domains
    if (!allowedHosts.includes(window.location.hostname)) {
        return; 
    }

    const manifestData = {
        "name": "Isabella Marie Brown",
        "short_name": "IsabellaBrown",
        "description": "SEO Specialist, Ascend Corp",
        // Critical: Update paths to point exactly inside your subfolder!
        "start_url": "/01-isabellabrown/", 
        "scope": "/01-isabellabrown/",
        "display": "standalone",
        "orientation": "portrait",
        "background_color": "#6d0abf",
        "theme_color": "#650ca5",
        "icons": [
            { "src": "/01-isabellabrown/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
            { "src": "/01-isabellabrown/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
            { "src": "/01-isabellabrown/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
            { "src": "/01-isabellabrown/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
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