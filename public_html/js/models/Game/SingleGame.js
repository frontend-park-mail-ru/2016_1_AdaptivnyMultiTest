define(
    function (require) {
        var Backbone = require('backbone');
        
        var Model = Backbone.Model.extend({
            defaults: {
                playerColor : "red", //цвет игрока, кто начинает

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
                this.common = [];
                this.border = {"blue" : [], "red" : []}
                
                //заполнение точек границ
                for( i = 0; i <= 7; i++ ) {
                    this.border["red"].push({"x" : i, "y" : 7});
                    this.border["blue"].push({"x" : i, "y" : 0});
                    this.border["red"].push({"x" : 7, "y" : i});
                    this.border["blue"].push({"x" : 0, "y" : i});
                }
            },

            pushPointInContainer: function(point) {
                this.common.push(point);
            },

            getNextPoint: function(state, current) {
                switch(state) {
                    case "left":
                        next = {
                            "x" : current["x"] - 1,
                            "y" : current["y"]
                        }
                        return next;
                        break;
                    case "top":
                        next = {
                            "x" : current["x"],
                            "y" : current["y"] - 1
                        }
                        return next;
                        break;
                    case "right":
                        next = {
                            "x" : current["x"] + 1,
                            "y" : current["y"]
                        }
                        return next;
                        break;
                    case "bottom":
                        next = {
                            "x" : current["x"],
                            "y" : current["y"] + 1
                        }
                        return next;
                        break;
                }
            },

            isElemInArray: function(array, elem) {
                for( i = 0; i < array.length; i++ ) {
                    if( elem["x"] === array[i]["x"] && elem["y"] === array[i]["y"]  ) {
                        return true;
                    }
                }
                return false;
            },

            getBorder: function() {
                if( this.get("playerColor") === "red" ) {
                    return this.border["blue"];
                } else if( this.get("playerColor") === "blue" ) {
                    return this.border["red"];
                }
            },
 
            getPossibleMove: function(current) {
                states = ["left", "top", "right", "bottom"];

                for( j = 0; j < states.length; j++ ) {
                    next = this.getNextPoint(states[j], current);
                    if( 0 <= next["x"] <= 7 &&
                        0 <= next["y"] <= 7 &&
                        this.isElemInArray(this.common, next) !== true &&
                        this.isElemInArray(this.getBorder(), next) !== true) {
                        this.get("possibilities")[this.get("playerColor")][states[j]] = next; 
                    } else {
                        this.get("possibilities")[this.get("playerColor")][states[j]] = {"x" : -1, "y" : -1}; 
                    }
                }


                console.log(this.get("possibilities")[this.get("playerColor")]["left"]);
                console.log(this.get("possibilities")[this.get("playerColor")]["top"]);
                console.log(this.get("possibilities")[this.get("playerColor")]["right"]);
                console.log(this.get("possibilities")[this.get("playerColor")]["bottom"]);
                console.log("____________");
            }
        });

        return Model;  
});


