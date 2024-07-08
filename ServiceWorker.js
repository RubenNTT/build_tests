const cacheName = "DefaultCompany-ZapparTestURP-0.1.0";
const contentToCache = [
    "Build/ba003fb1af043684b0b19f6e0dff1a14.loader.js",
    "Build/c39b1bd69adefa75856e05779b266f27.framework.js",
    "Build/1b3825fbfded1f5952ff645c85fdb96b.data",
    "Build/63dcdbf72564d30da11d883575fe440c.wasm",
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
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
