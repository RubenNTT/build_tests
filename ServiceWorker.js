const cacheName = "DefaultCompany-ZapparTestURP-0.1.0";
const contentToCache = [
    "Build/aca17784a298616c111c1b891787f0af.loader.js",
    "Build/ec2e2519a360384169e6bc2c39a68f64.framework.js",
    "Build/61c62f2a4e93bd165af1202e9bba3314.data",
    "Build/01f77212f89ad97891e569c08c7a01ec.wasm",
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
