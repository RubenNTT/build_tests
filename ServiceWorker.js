const cacheName = "DefaultCompany-ZapparTestURP-0.1.0";
const contentToCache = [
    "Build/33b7588f53576698c7843ded83151baf.loader.js",
    "Build/c6c4475ead833d4e3fcdb69c2dc09b71.framework.js",
    "Build/7169a3007db1675c2e0ad667efc3df7b.data",
    "Build/f3cff4b5deb29ba9f060d15db0ac294c.wasm",
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
