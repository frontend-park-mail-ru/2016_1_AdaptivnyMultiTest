(function() {

    this.addEventListener('install', function(event) {
        console.log("install event");
        event.waitUntil(
            caches.open('v1').then(function(cache) {
                return cache.addAll([
                    '/',
                    '/css/main.css',
                    '/index.html',
                    '/js/tmpl/game.js',
                    '/js/tmpl/main.js',
                    '/js/tmpl/scoreboard.js',
                    '/js/main.js',       
                    '/static/snakes.jpg',
                    '/static/404.jpg'
                ]);
            })
        );
    });

    this.addEventListener('activate', function (event) {
        event.waitUntil(
            caches.keys().then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName !== "v1") {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });


    var self = this;

    this.addEventListener('fetch', function(event) {
        event.respondWith(fetch(event.request).catch(function() {
            console.log("attempt to execute url from cache ", event.request.url);
            if( event.request.url === "http://127.0.0.1:8080/api/session" && event.request.method === "GET" ) {
                self.clients.matchAll().then((clients) => {
                    clients.map((client) => {
                        return client.postMessage("offline");
                  })
                });
            }
            return caches.match(event.request);
        }).then(function(response) {
            caches.open('v1').then(function(cache) {
                console.log("request was putted in the cache ", event.request.url);
                cache.put(event.request, response);
            });
            return response.clone();
        }).catch(function() {
            return caches.match('/static/404.jpg');
        })
        );
    });
}());










  








  


