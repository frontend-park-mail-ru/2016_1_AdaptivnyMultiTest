define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/scoreboard');
        var scores = require('collections/Scores');

        var View = Backbone.View.extend({
            collection: scores,
            template: tmpl,
            events: {
                'click button#scoreboarTomain': 'toMenu'
            },
            initialize: function() {
                this.render();
            },
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));
            },
            toMenu: function(e) {
                e.preventDefault();
                window.location.hash = "main";
            }
        });
        return new View();
    }
);

