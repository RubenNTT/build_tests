const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/3d.loader.js",
    "Build/0067fd6d58e9e6cf593f145398199ba1.js",
    "Build/a453ebf6a7dc98a267e4529c366c6cd9.data",
    "Build/55744e02a41993159491d2e6d279a709.wasm",
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
