define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/joingame');

        var View = Backbone.View.extend({
            id: "joingame",
            template: tmpl,

            initialize: function() {
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            },

            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },
            
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);







