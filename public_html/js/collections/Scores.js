define(
    function (require) {
        var Backbone = require('backbone');
        var score = require('models/Score');

        var Collection = Backbone.Collection.extend({
            model: score,
            
            url: 'api/scores',

            comparator: function(score) {
                return -score.get('score');
            }
        });
        return Collection;
});

