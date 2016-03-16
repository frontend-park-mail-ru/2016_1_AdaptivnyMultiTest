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
                return this;
            },
            show: function () {
                this.trigger("show");
                $('#page').append(this.el);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);

