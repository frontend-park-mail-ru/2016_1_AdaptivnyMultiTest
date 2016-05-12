define(
    function (require) {
        var Backbone = require('backbone');
        var wsEvents = require('api/wsEvents');
        return( function() {
            return {
                onMessage: function(event) {
                    var data = JSON.parse(event.data);
                    switch(data.status) {
                        case 'start':
                            wsEvents.wsEvents.trigger("GameStart", data);
                            break;
                        case 'move':
                            wsEvents.wsEvents.trigger("MakeMove", data);
                            break;
                        case 'wait':
                            wsEvents.wsEvents.trigger("Wait");
                            break;
                        case 'finish':
                            wsEvents.wsEvents.trigger("Finish", data);
                            break;
                        case 'unexpectedEnemyExit':
                            wsEvents.wsEvents.trigger("EnemyExit", data);
                    }
                }   
            }
        })(); 
});

