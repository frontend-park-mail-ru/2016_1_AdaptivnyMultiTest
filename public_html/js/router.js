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
                'game': 'concreteAction',

                '*default': 'defaultAction'
            },
           
            initialize: function() {
                Backbone.history.start();
                self = this;
                this.listenTo(game, 'finish', function() {
                    this.navigate("main", {trigger: true});
                });
                this.listenTo(main, 'start', function() {
                    game.connectToGame();
                    this.navigate("game", {trigger: true});
                });
                
                /*
                this.listenTo(main, 'start', function() {
                    game.connectToGame();
                    //this.navigate("game", {trigger: true});
                });
                this.listenTo(game, 'Authorized user', function() {
                    this.navigate("game", {trigger : true});
                });

                this.listenTo(game, "Unauthorized user", function() {
                    alert("You need to authorize");
                });*/
                
        
                return this;
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