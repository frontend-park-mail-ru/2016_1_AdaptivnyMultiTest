define(
    function (require) {
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');
        var main = require('views/main');
        var scoreboard = require('views/scoreboard');
        var game = require('views/game');
        
        
        viewManager.addViews([
            main,
            scoreboard,
            game
            ]);

        var Router = Backbone.Router.extend({
            routes: {
                'main': 'concreteAction', 
                'scoreboard': 'concreteAction',
                'game': 'gameAction',

                '*default': 'defaultAction'
            },
           
            initialize: function() {
                Backbone.history.start();
                return this;
            },

            gameAction: function() {
                var self = this;
                game.isAuth().done(function() {
                    game.show();
                }).fail(function() {
                    self.navigate("main", {trigger : true});
                });
            },

            concreteAction: function() {
                var view = require('views/'+ Backbone.history.getFragment());
                view.show();
            },

            defaultAction: function() { 
               main.show();
            },
            
        });
        return new Router();
    }
);