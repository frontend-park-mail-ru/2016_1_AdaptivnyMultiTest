define(
    function (require) {
        var Backbone = require('backbone');
        
        var events = {
            wsEvents: new _.extend({}, Backbone.Events)
        };
        
        return events;
});