define(
    function (require) {
        var Backbone = require('backbone');
        
        var Model = Backbone.Model.extend({
            defaults: {
                playerColor : null,

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


            getPossibleMove: function(current, color) {
                this.set({"playerColor" : color});
                states = ["left", "top", "right", "bottom"]
                for( i = 0; i < states.length; i++ ) {
                    next = this.getNextPoint(states[i], current);
                    if( 0 <= next["x"] <= 7 &&
                        0 <= next["y"] <= 7 &&
                        this.common.indexOf(next) === -1 && 
                        this.border[this.playerColor].indexOf(next) === -1 ) {
                        this.possibilities[this.playerColor][states[i]] = next; 
                    } else {
                        this.possibilities[this.playerColor][states[i]] = {"x" : -1, "y" : -1}; 
                    }
                }
            }
        });

        return Model;  
});


