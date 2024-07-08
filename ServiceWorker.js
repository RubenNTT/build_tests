const cacheName = "DefaultCompany-ZapparTestURP-0.1.0";
const contentToCache = [
    "Build/e98eff75d2447fea5b9afd12a817cf89.loader.js",
    "Build/c39b1bd69adefa75856e05779b266f27.framework.js",
    "Build/577dd6114275101bac8472621ff9a3b4.data",
    "Build/fe28104549804ac89886330b0b7cf3b0.wasm",
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
