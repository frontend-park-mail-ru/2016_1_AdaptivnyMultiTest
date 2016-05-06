define(
    function (require) {
        var Backbone = require('backbone');
        var View = Backbone.View.extend({
            returnCurrentView: null,

            addViews: function(views) {
                var self = this;
                _.each(views, function(view) {
                    $(document.body).append(view.el);
                    self.listenTo(view, 'show', function(currentView) {
                        idCurrentView = currentView.el.id;
                        _.each(views, function(view) {
                            if( idCurrentView != view.el.id ) {
                                view.hide();
                            } else {
                                self.returnCurrentView = view;
                            }  
                        })
                    });
                })
            },
        });
        return new View();
    }
);