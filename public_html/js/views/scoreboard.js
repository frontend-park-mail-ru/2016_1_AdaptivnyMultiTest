define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/scoreboard');
        var scores = require('collections/Scores');

        var View = Backbone.View.extend({
       

            collection: new scores(),
            template: tmpl,

            initialize: function() {
                this.collection.bind('sync', this.render, this);
            },
            
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));  
                return this;
            },

            show: function () {
                this.collection.fetch();
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },
            
            hide: function () {
                $( ".js-btn" ).off("mouseenter mouseleave");
                this.$el.hide();
            }
        });
        return new View();
    }
);



