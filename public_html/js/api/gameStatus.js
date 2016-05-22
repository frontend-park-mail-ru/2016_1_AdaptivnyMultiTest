define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var wsEvents = require('api/eventDispatcher');
        var statusMap = {
            'start' : 'GameStart',
            'move' : 'MakeMove',
            'wait' : "Wait",
            'finish' : "Finish",
            'unexpectedEnemyExit' : 'EnemyExit'
        };
       
        return( function() {
            return {
                onMessage: function(event) {
                    var data = JSON.parse(event.data);
                    wsEvents.trigger(statusMap[data.status], data);
                }   
            }
        })(); //оборачиваем в function, чтобы скрыть внутреннюю реализацию и не допустить конфликта
        //в глобальной видимости переменных
});







