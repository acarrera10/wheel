self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('ruleta-cache').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './service-worker.js',
        './Video Trivias fondo-landscape.mp4',
        './Video Trivias fondo-vertical.mp4',
        './wheel_pointer_ok.png',
        './cordobesa.webp',
        './participar.webp',
        './taca-taca.webp',
        './otro-tiro.webp',
        './disfrutando.webp',
        './champaqui.webp',
        './bancor.webp',
        './cordoba.webp',
        './punteada.webp',
        './icon-192.png',
        './icon-512.png',
        './spin.mp3'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});