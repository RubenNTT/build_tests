const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/app.loader.js",
    "Build/639d64d1cf0b5833c82168724b68a7c3.js",
    "Build/33957fb99d8ceaf07daf0c9b7e362952.data",
    "Build/c8f2e2bce4f212a3dae45e5a58d74a13.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
//      const cache = await caches.open(cacheName);
//      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//      cache.put(e.request, response.clone());
      return response;
    })());
});
