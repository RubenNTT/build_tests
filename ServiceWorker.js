const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/app.loader.js",
    "Build/2b2139080f306a30bf50b539b423fce2.js",
    "Build/7295290480aca9313bb6777dbbbe2e4c.data",
    "Build/69343454289ad1cf8d8b092212bf80d6.wasm",
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
