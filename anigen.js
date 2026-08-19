(function () {
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

    // Slideshow
    UIkit.slideshow('#slideshow #player', { autoplay: 'true', autoplayInterval: '7000', animation: 'push', ratio: 'false' });
    UIkit.slideshowParallax('#slideshow #animation1', { y: '100, 0, 100' });
    UIkit.slideshowParallax('#slideshow #animation2', { y: '200, 0, 200' });
    UIkit.slideshowParallax('#slideshow #animation3', { y: '300, 0, 300' });

    // About
    const container = document.getElementById("js-sticky-parallax-container");
    if (container) {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        container.classList.add("uk-height-viewport-3");
        requestAnimationFrame(() => {
            window.scrollTo(scrollX, scrollY);
        });
    }
    UIkit.parallax('#about #background', { bgy: '-300' });
    UIkit.heightViewport('#about #background', {});
    UIkit.parallax('#about #animation1', { target: '#js-sticky-parallax-container', x: '-15vw,0', easing: -1, start: '80vh', end: '100vh' });
    UIkit.parallax('#about #animation2', { target: '#js-sticky-parallax-container', x: '10vw,0', easing: -1, start: '70vh', end: '100vh' });

})();
