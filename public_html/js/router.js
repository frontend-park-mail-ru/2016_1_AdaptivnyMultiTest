define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');
        
        var main = require('views/main');
        var scoreboard = require('views/scoreboard');
        var game = require('views/game');
        var main = require('views/main');
        var singleGame = require('views/singleGame');
        
        viewManager.addViews([
            main,
            scoreboard,
            game,
            singleGame
        ]);

        var Router = Backbone.Router.extend({
            routes: {
                'main': 'concreteAction', 
                'scoreboard': 'concreteAction',
                'game': 'gameAction',
                'singleGame' : 'concreteAction',

                '*default': 'defaultAction'
            },
           
            initialize: function() {
                Backbone.history.start();
                return this;
            },

            gameAction: function() {
                var self = this;
                game.isAuth().done(function(isOffline) {
                    if (!isOffline) {
                        game.show();
                    } else {
                        self.navigate("main", {trigger : true});
                    }     
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





