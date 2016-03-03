define( //запускает контроль адресной строки для хеш-навигации
    ['backbone', 'router'],
    function (Backbone, router) {
        Backbone.history.start();
    }
);
