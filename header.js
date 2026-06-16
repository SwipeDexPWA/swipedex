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

  // Fonts
  loadCSS(
    "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
  );

  loadCSS(
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
  );

  // Loader
  loadCSS("../loader.min.css");

  // Future scripts go here:
  // loadJS("../some-script.js");
  // loadJS("https://example.com/library.js");
})();