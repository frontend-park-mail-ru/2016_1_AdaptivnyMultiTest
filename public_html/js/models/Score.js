define(
    function (require) {
        var Backbone = require('backbone');
       
        var Model = Backbone.Model.extend({
            defaults: {
                id: '',
                login: '',
                score: 0
            },
 
            urlRoot: "api/scores",
        });
        return Model;  
    }
);

