const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/app.loader.js",
    "Build/92dce05637c28c47bd2e0b64ef9dfd96.js",
    "Build/2fc45e43acc8f8d69419e82de16e96a1.data",
    "Build/ead932f7853d6d607ab54e447a51a4e6.wasm",
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
