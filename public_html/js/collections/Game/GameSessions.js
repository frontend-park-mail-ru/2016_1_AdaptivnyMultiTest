define(
    function (require) {
        var Backbone = require('backbone');
        var gameSession = require('models/Game/GameSession');

        var Collection = Backbone.Collection.extend({
            model: gameSession
        });
        return new Collection();
});
