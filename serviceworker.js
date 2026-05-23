const allowedHosts = ["swipedex.app", "www.swipedex.app"];
const isMobileOrTablet =
    ("ontouchstart" in self) ||
    (self.navigator && self.navigator.maxTouchPoints > 0);
const isAllowedHost = allowedHosts.includes(self.location.hostname);
if (!isAllowedHost || !isMobileOrTablet) {
} else {
    var staticCacheName = "pwa";
    self.addEventListener("install", function (e) {
        e.waitUntil(
            caches.open(staticCacheName).then(function (cache) {
                return cache.addAll(["/"]);
            })
        );
    });
    self.addEventListener("fetch", event => {

  const url = event.request.url;

  // 🚨 NEVER TOUCH EXTERNAL APIS
  if (
    url.includes("script.google.com") ||
    url.includes("googleapis.com")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // OPTIONAL: your existing cache logic below
  event.respondWith(
    fetch(event.request).catch(() => {
      // fallback if offline
      return caches.match(event.request);
    })
  );

});
}
