/*define(
    function (require) {
        var Backbone = require('backbone');
        var main = require('views/main');
        var login = require('views/login');
        var scoreboard = require('views/scoreboard');
        var signup = require('views/signup');
        var game = require('views/game');
        
        var Router = Backbone.Router.extend({
            routes: {
                'main': 'concreteAction', 
                'login': 'concreteAction',
                'scoreboard': 'concreteAction',
                'signup': 'concreteAction',
                'game': 'concreteAction',
                '*default': 'defaultAction' 
            },
            show: function(view) {
                $('#page').append(view.el);
                $(view.el).show();
            },
            hide: function(view) {
                view.$el.hide();
            },
            initialize: function() {
                this.currentView = main;
                Backbone.history.start();
                return this;
            },
            concreteAction: function() {
                var view = require('views/'+ Backbone.history.getFragment());
                this.hide(this.currentView);
                this.show(view);
                this.currentView = view;
            },
            defaultAction: function() { 
                this.hide(this.currentView);
                this.show(main);
                this.currentView = main;
            }
        });
        return new Router();
    }
);*/

define(
    function (require) {
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');
        var main = require('views/main');
        var login = require('views/login');
        var scoreboard = require('views/scoreboard');
        var signup = require('views/signup');
        var game = require('views/game');
        
        viewManager.addViews([
            main,
            login,
            scoreboard,
            signup,
            game
            ]);

        var Router = Backbone.Router.extend({
            routes: {
                'main': 'concreteAction', 
                'login': 'concreteAction',
                'scoreboard': 'concreteAction',
                'signup': 'concreteAction',
                'game': 'concreteAction',
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
            }
        });
        return new Router();
    }
);