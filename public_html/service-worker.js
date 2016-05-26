(function() {
    var cacheName = "v1";
    var self = this;

    this.addEventListener('install', function(event) {
        onInstall(event);
    });

    this.addEventListener('fetch', function(event) {
       onFetch(event);
    });

    function onInstall(event) {
        event.waitUntil(
            caches.open(cacheName).then(function(cache) {
                return cache.addAll([
                    '/',
                    '/css/main.css',
                    '/index.html',
                    '/js/tmpl/game.js',
                    '/js/tmpl/main.js',
                    '/js/tmpl/scoreboard.js',
                    '/js/main.js',      
                    '/static/snakes.jpg',
                    '/static/404.jpg',
                    '/static/snake_logo.png'
                ]);
            })
        );
    }

    function onFetch(event) {
         event.respondWith(fetch(event.request)
            .catch(function() {
                console.log("attempt to execute url from cache ", event.request.url);
                return caches.match(event.request);
            })
            .then(function(response) {
                caches.open(cacheName).then(function(cache) {
                    console.log("request was putted in the cache ", event.request.url);
                    cache.put(event.request, response);
                });
                return response.clone();
            })
            .catch(function() {
                return caches.match('/static/404.jpg');
            })
        );
    }
}());