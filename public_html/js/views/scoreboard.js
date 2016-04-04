define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/scoreboard');
        var scores = require('collections/Scores');

        var View = Backbone.View.extend({
            collection: new scores(),
            template: tmpl,

            initialize: function() {
                $(document.body).append(this.$el);
                this.collection.bind('sync', this.render, this);
                this.collection.fetch();
                //this.render();
                this.hide(); 
            },
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));
                return this;
            },
            show: function () {
                this.trigger("show");
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);

