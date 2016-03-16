define(['superview', 'tmpl/scoreboard', 'collections/Scores'], function (superview, tmpl, scores) {
        var View = superview.extend({
            collection: scores,
            template: tmpl,
            events: {
                'click button#main': 'toMenu'
            },
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));
            },
            toMenu: function(e) {
                console.log('to main');
                e.preventDefault();
                window.location.hash = "main";
            }
        });
        return new View();
    }
);

