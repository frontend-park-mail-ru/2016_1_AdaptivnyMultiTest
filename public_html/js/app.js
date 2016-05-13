define(
    function (require) {
        var Backbone = require('backbone');

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js', {scope : '/'})
                .then(function (registration) {
                    console.log('ServiceWorker registration', registration);
                })
                .catch(function (err) {
                    throw new Error('ServiceWorker error: ' + err);
                });
            
            navigator.serviceWorker.addEventListener('message', (evt) => {
                $.event.trigger({
                    type: "suggestionToPlay",
                    message: "Unfourtanately, server doesn't respond. You can only play single player game",
                    time: new Date()
                });
            })
        }
    }
);