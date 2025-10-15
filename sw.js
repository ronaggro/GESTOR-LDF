// Define un nombre y versión para el caché
const CACHE_NAME = 'report-generator-v1';

// Lista de archivos fundamentales de la aplicación para guardar en caché
const urlsToCache = [
  '.', // Representa el archivo index.html
  'manifest.json'
  // Si tuvieras tus propios iconos, los añadirías aquí, ej: '/icons/icon-192.png'
];

// Evento 'install': se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto, guardando archivos de la aplicación...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la aplicación pide un recurso (una imagen, un script, etc.)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en el caché, lo devuelve desde ahí.
        if (response) {
          return response;
        }
        // Si no, lo pide a la red.
        return fetch(event.request);
      })
  );
});