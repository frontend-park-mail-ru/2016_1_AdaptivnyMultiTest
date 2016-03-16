define(['backbone'], function (Backbone) {
        var View = Backbone.View.extend({
            template: function(){},
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

