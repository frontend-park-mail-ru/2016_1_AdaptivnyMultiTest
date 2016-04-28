define(
    function (require) {
        var Backbone = require('backbone');
        var score = require('models/Score');
        var Collection = Backbone.Collection.extend({
            model: score,
            url: 'api/scores',

            comparator: function(score) {
                return -score.get('score');
            },

            getCustomUrl: function (method) {
                switch (method) {
                    case 'read':
                        return this.url;
                }
            },

            sync: function (method, model, options) {
                options || (options = {});
                options.url = this.getCustomUrl(method.toLowerCase());
                return Backbone.sync.apply(this, arguments);
            },      
        });
    return Collection;
    }
);

