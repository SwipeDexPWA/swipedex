(function () {
    // Single function to instantly wipe the page
    function nukePage() {
        document.documentElement.innerHTML = '';
        if (document.head) document.head.innerHTML = '';
        if (document.body) document.body.innerHTML = '';
        window.location.replace("about:blank");
    }

    function runAntiInspectChecks() {
        // --- CHECK 1: Window Resize (Docked DevTools) ---
        const widthThreshold = window.outerWidth - window.innerWidth > 100;
        const heightThreshold = window.outerHeight - window.innerHeight > 150;

        if (widthThreshold || heightThreshold) {
            nukePage();
            return; // Stop execution
        }

        // --- CHECK 2: Console Lag (Floating/Undocked DevTools) ---
        const startTime = performance.now();

        // Generate a small table that only causes lag if DevTools is open & rendering it
        const heavyObject = [];
        for (let i = 0; i < 40; i++) {
            heavyObject.push({ 'Status': 'Protected' });
        }

        console.table(heavyObject);
        console.clear();

        // If rendering the table took longer than 5ms, DevTools is open
        if (performance.now() - startTime > 5) {
            nukePage();
        }
    }

    // Run the checks every 300ms
    setInterval(runAntiInspectChecks, 300);

    // Also trigger instantly if the window is resized
    window.addEventListener('resize', runAntiInspectChecks);
})();

window.addEventListener('blur', () => { setTimeout(() => { document.documentElement.innerHTML = '' }, 100) });

document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && ['s', 'u', 'p'].includes(e.key.toLowerCase()))
    ) {
        e.preventDefault();
        wipePage();
    }
});