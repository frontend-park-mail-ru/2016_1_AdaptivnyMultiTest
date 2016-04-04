define(
    function (require) {
        var Backbone = require('backbone');
        
        var View = Backbone.View.extend({
            addViews: function(views) {
            	var self = this;
            	_.each(views, function(view) {
            		self.listenTo(view, 'show', function() {
            			_.each(views, function(view) {
            				view.hide();
            			})
            		});
            	})
            }
         
        });
        return new View();
    }
);
