define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');

        var View = Backbone.View.extend({
            template: tmpl,
            initialize: function() {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            }
        });
        return new View();
    }
);

