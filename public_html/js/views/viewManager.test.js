define(function (require) {
    var viewManager = require('views/viewManager');
    var main = require('views/main');
    var game = require('views/game');

    QUnit.module("views/viewManager");

    QUnit.test("ViewManager works properly!", function () {
        var currentView = main;

        viewManager.addViews([
           main,
           game
        ]);
        main.show();

        QUnit.ok(currentView.$el.css('display') === 'block' && game.$el.css('display') === 'none');
    });
});


