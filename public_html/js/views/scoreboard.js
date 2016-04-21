define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/scoreboard');
        var scores = require('collections/Scores');

        var View = Backbone.View.extend({
            id: "scoreboard",

            collection: new scores(),
            template: tmpl,

            initialize: function() {
                this.collection.bind('sync', this.render, this);
                this.collection.fetch();
            },
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));
                $(".js-btn").hover(
                    function() {
                        $(this).addClass("js-btn_hover");
                    }, 
                    function() {
                        $(this).removeClass("js-btn_hover");
                    }
                );
                
                return this;
            },
            show: function () {
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

