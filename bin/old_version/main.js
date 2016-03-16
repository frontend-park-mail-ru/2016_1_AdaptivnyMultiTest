define(['backbone', 'tmpl/main'], function (Backbone, tmpl) {
        var View = Backbone.View.extend({
            //el: '#page',
            template: tmpl,
            events: {
                'click button#scoreboard' : 'toScoreboard',
                'click button#game' : 'toGame',
                'click button#login' : 'toLogin',
            },
            initialize: function() {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            },
            toScoreboard: function(e) {
                e.preventDefault();
                console.log('to scoreboard');
                window.location.hash = "scoreboard";
            },
            toGame: function(e) {
                e.preventDefault();
                window.location.hash = "game";
            },
            toLogin: function(e) {
                e.preventDefault();
                window.location.hash = "login";
            },
            /*
            show: function() {
                $('#page').append(this.el);
                $(this.el).show();
            },
            hide: function() {
                console.log("hide main");
                this.$el.hide();
                //this.$el.off();
            }*/
        });
        return new View();
    }
);

