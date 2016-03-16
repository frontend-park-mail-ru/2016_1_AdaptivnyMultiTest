define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/main');

        var View = Backbone.View.extend({
            template: tmpl,
            events: {
                'click button#mainToscoreboard' : 'toScoreboard',
                'click button#mainTogame' : 'toGame',
                'click button#mainTologin' : 'toLogin',
            },
            initialize: function() {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
                return this;
            },
            show: function () {
                this.trigger("show");
                $('#page').append(this.el);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            },
            toScoreboard: function(e) {
                e.preventDefault();
                window.location.hash = "scoreboard";
            },
            toGame: function(e) {
                e.preventDefault();
                window.location.hash = "game";
            },
            toLogin: function(e) {
                e.preventDefault();
                window.location.hash = "login";
            }
        });
        return new View();
    }
);

