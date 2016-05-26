define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var api = require('api/web-sockets');
        var apiStatus = require('api/gameStatus');
        var wsEvents = require('api/eventDispatcher');

        var Model = Backbone.Model.extend({
            defaults: {
                gameFieldSize : 7,

                myName : null,
                enemyName : null,
                color : null,

                red : {
                    x : null,
                    y : null
                },
                blue : {
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

            initialize: function() {
                this.listenTo(wsEvents, "GameStart", this.getInitDataForGame);
                this.listenTo(wsEvents, "MakeMove", this.getPossibleMove);
                this.listenTo(wsEvents, "Wait", this.waiting);
                this.listenTo(wsEvents, "Finish", this.determineWinner);
                this.listenTo(wsEvents, "EnemyExit", this.notifyEnemyExit);
            },

            getInitDataForGame: function(data) {
                console.log("GameStart!");
                this.set({"myName" : data.myName, 
                    "enemyName" : data.enemyName,
                    "blue" : data.firstBlue,
                    "red" : data.firstRed,
                    "color" : data.color
                });
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
                    "enemyMove" : data.enemyMove
                });
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
            },
        });

        return Model;  
    }
);

