const { GET_ROUTES_URL } = require('../../utils/constants');
const { apiUrl } = require('../../utils/envVars');

const CACHE_NAME = 'data-cache-v1';
const urlsToCache = [`${apiUrl}/${GET_ROUTES_URL}`];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Check if we received a valid response
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Network request failed, try to serve the request from the cache.
            return response;
          });

        // Check if the cache is older than 12 hours
        const isFresh =
          response &&
          response.headers.has('date') &&
          new Date().getTime() -
            new Date(response.headers.get('date')).getTime() <
            12 * 60 * 60 * 1000;

        return isFresh ? response : fetchPromise;
      });
    })
  );
});
