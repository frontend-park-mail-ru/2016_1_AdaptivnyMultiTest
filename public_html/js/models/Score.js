define(
    function (require) {
        'use strict';
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