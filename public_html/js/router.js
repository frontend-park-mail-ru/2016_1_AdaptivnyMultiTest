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
                if( !game.isAuth() ) {
                    this.navigate("main", {trigger : true});
                } else {
                    game.show();
                }
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