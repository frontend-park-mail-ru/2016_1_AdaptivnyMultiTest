define(
    function (require) {
        'use strict';
        if ( 'serviceWorker' in navigator ) {
            navigator.serviceWorker.register('/service-worker.js', {scope : '/'})
            .then(function (registration) {
                console.log('ServiceWorker registration', registration);
            })
            .catch(function (err) {
                throw new Error('ServiceWorker error: ' + err);
            });
        }
    }
);

