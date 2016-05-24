define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
      
        var Model = Backbone.Model.extend({
            defaults: {
                gameFieldSize : 7,

                playerColor : "red", //цвет игрока (красный игрок начинает игру первым)

                current: {
                    red : {
                        x : null,
                        y : null
                    },
                    blue : {
                        x : null,
                        y : null
                    }
                },

                possibilities : {
                    red : {
                        //possible move of red player
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
                        }
                    },

                    blue : {
                        //possible move of blue player
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
                        }
                    }
                } 
            },
        
            initialize: function() {
                this.occupiedPoints = window.localStorage;
                this.gameFieldBorderPoints = {"blue" : [], "red" : []}
                this.fillBorderPoints();
            },

            fillBorderPoints: function() {
                //заполнение точек границ
                for( var i = 0; i <= this.get("gameFieldSize"); i++ ) {
                    this.gameFieldBorderPoints["red"].push({"x" : i, "y" : this.get("gameFieldSize")});
                    this.gameFieldBorderPoints["blue"].push({"x" : i, "y" : 0});
                    this.gameFieldBorderPoints["red"].push({"x" : this.get("gameFieldSize"), "y" : i});
                    this.gameFieldBorderPoints["blue"].push({"x" : 0, "y" : i});
                }
            },

            pushInContainerOcuppiedPoints: function(point) {
                var length = this.occupiedPoints.length;
                this.occupiedPoints.setItem(length++, JSON.stringify(point));
            },

            getNextPoint: function(state, current) {
                var next = {
                    "x" : current["x"] + differBetweenCurrentNeigbourCoord[state]["dx"],
                    "y" : current["y"] + differBetweenCurrentNeigbourCoord[state]["dy"],
                }
                return next;
            },

            isElemInArray: function(array, elem) {
                for( var i = 0; i < array.length; i++ ) {
                    if( elem["x"] === array[i]["x"] && elem["y"] === array[i]["y"]  ) {
                        return true;
                    }   
                }
                return false;
            },

            isElemInLocalStorage: function(storage, elem) {
                var storageItem;
                for( var i = 0; i < storage.length; i++ ) {
                    storageItem = storage.getItem(String(i));
                    storageItem = JSON.parse(storageItem);
                    if( elem["x"] === storageItem["x"] && elem["y"] == storageItem["y"] ) {
                        return true;
                    }
                }
                return false;
            },

            clearLocalStorage: function() {
                this.occupiedPoints.clear();
            },

            getBorder: function() {
                if( this.get("playerColor") === "red" ) {
                    return this.gameFieldBorderPoints["blue"];
                } else if( this.get("playerColor") === "blue" ) {
                    return this.gameFieldBorderPoints["red"];
                }
            },

            isPossibleToMove: function(next) {
                var isInTheGameFieldX = (0 <= next["x"] <= this.get("gameFieldSize"));
                var isInTheGameFieldY = (0 <= next["y"] <= this.get("gameFieldSize"));
                var isPossibleMoveOccupied = this.isElemInLocalStorage(this.occupiedPoints, next);
                var isForbiddenBorderPoint = this.isElemInArray(this.getBorder(), next);  
                return isInTheGameFieldX && isInTheGameFieldY && 
                       isPossibleMoveOccupied !== true && isForbiddenBorderPoint !== true;
            },
 
            getPossibleMove: function(current) {
                var states = ["left", "top", "right", "bottom"];
                for( var j = 0; j < states.length; j++ ) {
                    var next = this.getNextPoint(states[j], current);
                    if( this.isPossibleToMove(next) ) {
                        this.get("possibilities")[this.get("playerColor")][states[j]] = next;
                    } else {
                        this.get("possibilities")[this.get("playerColor")][states[j]] = forbiddenPointToMove;
                    }
                }
            },

            getOccupiedPointsFromStorageByColor: function(playerColor) {
                var points = [];
                var i = playerColor === "red" ? 0 : 1;

                for (; i < this.occupiedPoints.length; i = i + 2) {
                    points.push(JSON.parse(this.occupiedPoints.getItem(i)));
                }
                return points;
            }
        });
        
        var forbiddenPointToMove = {
            "x" : -1,
            "y" : -1
        };

        var differBetweenCurrentNeigbourCoord = {
            "left" : {
                "dx" : -1,
                "dy" : 0
            },

            "top" : {
                "dx" : 0,
                "dy" : -1
            },

            "right" : {
                "dx" : 1,
                "dy" : 0
            },

            "bottom" : {
                "dx" : 0,
                "dy" : 1
            }   
        };

        return Model;  
});

