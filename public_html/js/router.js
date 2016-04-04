define(
    function (require) {
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');
        var main = require('views/main');
        var login = require('views/login');
        var scoreboard = require('views/scoreboard');
        var signup = require('views/signup');
        var game = require('views/game');
        var finish = require('views/finish');
        var joingame = require('views/joingame');
        var newgame = require('views/newgame');
        
        viewManager.addViews([
            main,
            login,
            scoreboard,
            signup,
            game,
            finish,
            joingame,
            newgame
            ]);

        var Router = Backbone.Router.extend({
            routes: {
                'main': 'concreteAction', 
                'login': 'concreteAction',
                'scoreboard': 'concreteAction',
                'signup': 'concreteAction',
                'game': 'concreteAction',
                'finish': 'concreteAction',
                'joingame': 'concreteAction',
                'newgame': 'concreteAction',

                '*default': 'defaultAction'
            },
           
            initialize: function() {
                Backbone.history.start();
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