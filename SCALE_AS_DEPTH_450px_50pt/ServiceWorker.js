const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/SCALE_AS_DEPTH_450px_50pt.loader.js",
    "Build/57abbecd2396f1cd8fc6cd52bce58110.js",
    "Build/137c09809d3de19b21159e5ba0a9b2c1.data",
    "Build/abcd38443eacdfe073dcd19cd6fbdea9.wasm",
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
