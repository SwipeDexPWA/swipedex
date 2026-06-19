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
    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
  );

  loadCSS(
    "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
  );

  loadCSS(
    "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
  );

  loadCSS(
    "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&display=swap"
  );

  // Loader
  loadCSS("../loader.min.css");

  // Future scripts go here:
  // loadJS("../some-script.js");
  // loadJS("https://example.com/library.js");
})();