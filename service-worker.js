const CACHE_NAME = 'todo.jcms.dev';
const urlsToCache = [
  '/',
  '/CNAME',
  '/disable.js',
  '/embed_image.png',
  '/favicon.ico',
  '/index.html',
  '/index.js',
  '/style.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});