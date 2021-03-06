var myCacheName = 'cache-v1';
var cacheUrls = [
  './',
  './css/styles.css',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './index.html',
  './restaurant.html'
];
console.log(cacheUrls.length);
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(myCacheName).then(function (cache) {
      return cache.addAll(cacheUrls);
    })
  )
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('cache-') &&
            cacheName != myCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/restaurant.html') {
      event.respondWith(caches.match('/restaurant.html'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});