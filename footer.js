(function () {
  function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function loadJS(src, cb) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = cb || null;
    document.head.appendChild(s);
  }

  // Console
  loadJS("../console.js");

  // Preloader
  loadJS("../loader.js");
  
  // Countdown
  loadJS("../countdown.js");

  // PWA
  loadJS("../pwa.js");
})();