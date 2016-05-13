define(
    function (require) {
        var Backbone = require('backbone');
        var api = require('api/apiWS');
        var apiStatus = require('api/apiGameStatus');
        var wsEvents = require('api/wsEvents');

        var Model = Backbone.Model.extend({
            
            defaults: {
                myName : null,
                enemyName : null,
                color : null,

                firstRed : {
                    x : null,
                    y : null
                },
                firstBlue : {
                    x : null,
                    y : null
                },

                left : {
                    x : null,
                    y : null
                },
                right : {
                    x : null,
                    y : null
                },
                top : {
                    x : null,
                    y : null
                },
                bottom : {
                    x : null,
                    y : null
                },

                enemyMove : {
                    x : null,
                    y : null
                },

                win : null,

                isEnemyExit : false                 
            },

            //при создании нового объекта модели во вьюхе, создаться 
            //сокет соединение и начнется прослушка событии статуса отправляемых
            //с сервера данных
            initialize: function() {
                this.listenTo(wsEvents.wsEvents, "GameStart", this.getInitDataForGame);
                this.listenTo(wsEvents.wsEvents, "MakeMove", this.getPossibleMove);
                this.listenTo(wsEvents.wsEvents, "Wait", this.waiting);
                this.listenTo(wsEvents.wsEvents, "Finish", this.determineWinner);
                this.listenTo(wsEvents.wsEvents, "EnemyExit", this.notifyEnemyExit);
            },

            getInitDataForGame: function(data) {
               
                console.log("GameStart!");
                
                this.set({"myName" : data.myName, 
                          "enemyName" : data.enemyName,
                          "firstBlue" : data.firstBlue,
                          "firstRed" : data.firstRed
                        });
                if (data.color === "red") {
                    this.set({"color" : "#FF0000"});
                } else if(data.color == "blue") {
                    this.set({"color" : "#004DFF"});
                }
            },
           
            sendCoord: function(x, y) {
                console.log("send");
                api.send({"x" : x, "y" : y});
            },

            getPossibleMove: function (data) {
                console.log("move");
                this.set({
                          "left" : data.left,
                          "right" : data.right,
                          "top" : data.top,
                          "bottom" : data.bottom,
                          "enemyMove" : data.enemyMove});

                console.log("model move", JSON.stringify(this));
                this.trigger("turnOnKeyboard");
            },

            waiting: function () {
                console.log("waiting");
                this.trigger("turnOffKeyboard");
            },

            determineWinner: function (data) {
                this.set({"win" : data.win});
                this.trigger("Winner was determined");
            },

            notifyEnemyExit: function(data) {
                this.set({"isEnemyExit" : true});
                this.trigger("isEnemyExit");
            }

        });
        return Model;  
});





