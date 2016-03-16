/*define(['backbone', 'models/Score'], function(Backbone, score) {
    var Collection = Backbone.Collection.extend({
    	model: score,
        //localStorage: new Backbone.LocalStorage();
        comparator: function(score) {
            return -score.get('score');
        },
        fetch: function() {

        }
    });

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
    return scoresCollection;
});*/


define(
    function (require) {
        var Backbone = require('backbone');
        var apiSync = require('api/sync');
        var score = require('models/Score');

        var Collection = Backbone.Collection.extend({
            model: score,
            sync: apiSync,
            url: '/api/scores',
            //localStorage: new Backbone.LocalStorage();
            comparator: function(score) {
                return -score.get('score');
            },

            //GET /scores
            fetch: function() {
                var self = this;
                var method = 'read';
                var options = {
                    //data = JSON.stringify({limit : limit});//как вытащить данные из урла ?limit=10
                    success: function(data, textStatus, jqXHR) { // data - данные, который пришли с сервера в формате dataType
                        if(jqXHR.status === 200) {
                            //to do
                        }
                        self.trigger('sync');
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        /*if(jqXHR.status === 400) {
                            alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "неверные входные данные");
                        }
                        if(jqXHR.status === 404) {
                            alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "модель с указанным id не найдена");
                        }*/
                        self.trigger('error');
                    }
                }
            }
        });

        
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
        return scoresCollection;   

        //return Collection;
});

