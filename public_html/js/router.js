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
        
        var urlHistory = window.sessionStorage;

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
                'singleGame' : 'singleGameAction',

                '*default': 'defaultAction'
            },
           
            initialize: function() {
                var self = this;
                Backbone.history.start();
                this.listenTo(singleGame, "QuitTheSingleGame", function() {
                    self.navigate("main", {trigger : true});
                });
                return this;
            },

            gameAction: function() {
                var self = this;
                game.isAuth().done(function() {
                    urlHistory.setItem(urlHistory.length + 1, window.location.href);
                    game.show();
                }).fail(function() {
                    self.navigate("main");
                }); 
            },

            concreteAction: function() {
                urlHistory.setItem(urlHistory.length + 1, window.location.href);
                var view = require('views/'+ Backbone.history.getFragment());
                view.show();
            },

            singleGameAction: function() {
                urlHistory.setItem(urlHistory.length + 1, window.location.href);
                var previousUrl = urlHistory.getItem(urlHistory.length - 1);
                singleGame.show(previousUrl);
            },

            defaultAction: function() {
                urlHistory.setItem(urlHistory.length + 1, window.location.href);
                main.show();
            },
            
        });
        return new Router();
    }
);