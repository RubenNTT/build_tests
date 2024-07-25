const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/app.loader.js",
    "Build/0a26ec2b05d75218a620df9d4d731d91.js",
    "Build/0934a40aa2f39e15c6117943c4f941f7.data",
    "Build/529be05100e4773e2ebe415a43daa3f7.wasm",
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
