define(['backbone', 'tmpl/game'], function (Backbone, tmpl) {
        var View = Backbone.View.extend({
            //el: '#page',
            template: tmpl,
            
            initialize: function() {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            },
            /*
            show: function() {
                $('#page').append(this.el);
                $(this.el).show();
            },
            hide: function() {
                this.$el.hide();
                //this.$el.off();
            }*/
        });
        return new View();
    }
);

