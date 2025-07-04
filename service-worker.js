self.addEventListener('install', event => {
  event.waitUntil(caches.open('cache').then(cache => cache.addAll([
'./', './index.html', './style.css', './script.js', './manifest.json',
    './Video Trivias fondo-landscape.mp4',
    './cordobesa.webp', './participar.webp', './taca-taca.webp', './otro-tiro.webp',
    './disfrutando.webp', './champaqui.webp',
    './wheel_pointer_ok.png', './bancor.webp', './cordoba.webp', './punteada.webp',
    './icon-192.png', './icon-512.png',
'./Video Trivias fondo-vertical.mp4'
]));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});