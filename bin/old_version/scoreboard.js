define(['backbone', 'tmpl/scoreboard', 'collections/Scores'], function (Backbone, tmpl, scores) {
        var View = Backbone.View.extend({
            //el: '#page',
            collection: scores,
            template: tmpl,
            events: {
                'click button#main': 'toMenu'
            },
            initialize: function() {
                this.render();
            },
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));
            },
            toMenu: function(e) {
                console.log('to main');
                e.preventDefault();
                window.location.hash = "main";
            },/*
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

