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
    self.addEventListener("fetch", function (event) {
        const url = event.request.url;

if (url.includes("script.google.com")) {
  event.respondWith(fetch(event.request));
  return;
}
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    });
}
