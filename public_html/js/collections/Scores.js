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
        /*
        //рыба
        var scoresCollection = new Collection([
        {
            login: "Мудрец",
            score: 1
        }, 
        {
            login: "Мудрец",
            score: 2
        },  
        {
            login: "Мудрец",
            score: 3
        }, 
        {
            login: "Мудрец",
            score: 4
        }, 
        {
            login: "Мудрец",
            score: 5
        }, 
        {
            login: "Мудрец",
            score: 6
        }, 
        {
            login: "Мудрец",
            score: 7
        }, 
        {
            login: "Мудрец 3",
            score: 8
        }, 
        {
            login: "Мудрец 2",
            score: 9
        }, 
        {
            login: "Мудрец 1",
            score: 10
        }])
        return scoresCollection;*/ 

        return Collection;
});

