const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/app.loader.js",
    "Build/d120234470eb110e0ae864c7b6c1404e.js",
    "Build/b2f8d1f9bc0836fc0af9ebdedd68278d.data",
    "Build/56710ae845dd4c29490c71a6a1a077d5.wasm",
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
