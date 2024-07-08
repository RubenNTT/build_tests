const cacheName = "DefaultCompany-ZapparTestURP-0.1.0";
const contentToCache = [
    "Build/b81caf3578fce9e5c84f1c2b493c5c81.loader.js",
    "Build/ec2e2519a360384169e6bc2c39a68f64.framework.js",
    "Build/8930e2ed98e44ea2732c3ac69a7b6a75.data",
    "Build/c1c90f70a365655120387570b0f5c056.wasm",
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
