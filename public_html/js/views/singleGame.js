define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var singleGameSession = require('models/Game/SingleGame');
        var scaleCoeff;
        var playerLineWidth = 6;
    
        var colorMap = {
            "red" : "#FF0000",
            "blue" : "#004DFF",
            "black" : "#000000"
        };

        var keyCodeMap = {
            "37" : "left",
            "38" : "top",
            "39" : "right",
            "40" : "bottom"
        };

        var View = Backbone.View.extend({
            template: tmpl,
       
            model : new singleGameSession(),

            events : {
                'click canvas#gameCanvas' : 'handleDrawInitialPoints' 
            },
            
            //рисуем первые точки
            handleDrawInitialPoints: function(e) {
                e.preventDefault();
                var radius = 5 / scaleCoeff;
                var circleLineWidth = 5;
                var xRed = this.model.get("current")["red"]["x"];
                var yRed = this.model.get("current")["red"]["y"];
                var xBlue = this.model.get("current")["blue"]["x"];
                var yBlue = this.model.get("current")["blue"]["y"];              

                drawCircle(this.canvas, scaleCoeff, xRed, yRed, radius, colorMap["red"], circleLineWidth);
                drawCircle(this.canvas, scaleCoeff, xBlue, yBlue, radius, colorMap["blue"], circleLineWidth);

                this.delete_event("click canvas#gameCanvas");
            },

            delete_event: function(eventName) {
                delete this.events[eventName];
                this.delegateEvents();
            },

            defineRandomInitialPoints: function() {
                //select from max size rectangle which not contains the borders
                var gameFieldSize = this.model.get("gameFieldSize");
                var firstRed = {
                    "x" : getRandomIntValueInRange(1, gameFieldSize - 1), 
                    "y" : getRandomIntValueInRange(1, gameFieldSize - 1)
                };

                var firstBlue = {
                    "x" : getRandomIntValueInRange(1, gameFieldSize - 1, firstRed["x"]),
                    "y" : getRandomIntValueInRange(1, gameFieldSize - 1, firstRed["y"])
                };

                var firstPoints = {
                    "red" : firstRed,
                    "blue" : firstBlue
                };

                return firstPoints;
            },

            initialize: function() {
                _.bindAll(this,'keyAction', 'renderPath', 'handleDrawInitialPoints');
                
                //определение значение первоначальных точек
                this.model.set({"current" : this.defineRandomInitialPoints()});
                
                //записали текущие точки в контейнер
                this.model.pushInContainerOcuppiedPoints(this.model.get("current")["red"]);
                this.model.pushInContainerOcuppiedPoints(this.model.get("current")["blue"]);
            },

            render: function() {  
                this.$el.html(this.template());
                var borderLineWidth = 5;
                var meshesLineWidth = 1;
                var canvasTag = this.$el.find("#gameCanvas")[0];
                var canvasSize = canvasTag.width;
                
                scaleCoeff =  canvasSize / this.model.get("gameFieldSize");
                this.canvas = canvasTag.getContext("2d");
                
                //строим красные границы - левая и верхняя стороны
                //строим синие границы - нижняя и правая сторона
                drawLine(this.canvas, 1, 0, 0, canvasSize, 0, colorMap["red"], borderLineWidth);
                drawLine(this.canvas, 1, 0, 0, 0, canvasSize, colorMap["red"], borderLineWidth);
                drawLine(this.canvas, 1, 0, 490, canvasSize, canvasSize, colorMap["blue"], borderLineWidth);
                drawLine(this.canvas, 1, canvasSize, 0, canvasSize, canvasSize, colorMap["blue"], borderLineWidth);
             
                //сетка
                for( var i = 0; i <= this.model.get("gameFieldSize"); i++ ) {
                    drawLine(this.canvas, scaleCoeff, i, 0, i, canvasSize, colorMap["black"], meshesLineWidth);
                    drawLine(this.canvas, scaleCoeff, 0, i, canvasSize, i, colorMap["black"], meshesLineWidth);
                }
            },
    

            determinePossibleEnemyState: function() {
                var states = ["left", "top", "right", "bottom"];
                var possibleStates = [];
                for( var j = 0; j < states.length; j++ ) {
                    if (this.isPossibleToMove(states[j], "blue")) {
                        possibleStates.push(states[j]);
                    }
                }

                if( possibleStates.length === 0 ) {
                    return null;
                } else {
                    var randomIndex = getRandomIntValueInRange(0, possibleStates.length - 1);
                    return possibleStates[randomIndex];
                }
            },

            drawEnemyPath: function() {
                this.model.set({"playerColor" : "blue"});
                this.model.getPossibleMove(this.model.get("current")["blue"]);

                var state = this.determinePossibleEnemyState();

                if( state === null ) {
                    alert("Вы выиграли!");
                } else {
                    var startX = this.model.get("current")["blue"]["x"];
                    var startY = this.model.get("current")["blue"]["y"];
                    var endX = this.model.get("possibilities")["blue"][state]["x"];
                    var endY = this.model.get("possibilities")["blue"][state]["y"];
                    drawLine(this.canvas, scaleCoeff, startX, startY, endX, endY, colorMap["blue"], playerLineWidth);
                    this.model.get("current")["blue"] = this.model.get("possibilities")["blue"][state];
                    this.model.pushInContainerOcuppiedPoints(this.model.get("current")["blue"]);
                }
                //включаем клаву для человека
                $(document).bind('keydown', this.keyAction);
            },

            isFinishGame: function(playerColor) {
                var states = ["left", "top", "right", "bottom"];
                for( var j = 0; j < states.length; j++ ) {
                    if( this.isPossibleToMove(states[j], playerColor) ) {
                        return false;
                    }
                }
                return true;
            },
            
            isPossibleToMove: function(state, playerColor) {
              return this.model.get("possibilities")[playerColor][state]["x"] !== -1 && 
                     this.model.get("possibilities")[playerColor][state]["y"] !== -1  
            },

            renderPath: function(state) {
                this.model.set({"playerColor" : "red"});
                this.model.getPossibleMove(this.model.get("current")["red"]);

                if (!this.isFinishGame("red")) {
                    if (this.isPossibleToMove(state, "red")) {
                        var startX = this.model.get("current")["red"]["x"];
                        var startY = this.model.get("current")["red"]["y"];
                        var endX = this.model.get("possibilities")["red"][state]["x"];
                        var endY = this.model.get("possibilities")["red"][state]["y"];
                        drawLine( this.canvas, scaleCoeff, startX, startY, endX, endY, colorMap["red"], playerLineWidth);
                        this.model.get("current")["red"] = this.model.get("possibilities")["red"][state];
                        this.model.pushInContainerOcuppiedPoints(this.model.get("current")["red"]);
                        //отключаем клаву для человека
                        $(document).unbind('keydown', this.keyAction);
                        this.drawEnemyPath();
                    } else {
                        alert("Вы не можете так идти!");
                    }
                } else {
                    alert("Вы проиграли");
                }
            },

            
            keyAction : function(e) {
                var code = e.keyCode || e.which;
                this.renderPath(keyCodeMap[String(code)]);
            },
        
            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
                $(document).bind('keydown', this.keyAction);
            },
            
            hide: function () {
                $(document).unbind('keydown', this.keyAction);
                //this.$el.unbind('keydown', this.keyAction);
                this.$el.hide();
            }
        });

        function getRandomIntValueInRange(min, max, except) {
            var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
            if (except) {
                while (randomValue === except) {
                    randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
                }
                return randomValue;
            }
            return randomValue;
        }

        function drawLine(canvas, scaleCoeff, xStart, yStart, xEnd, yEnd, color, lineWidth) {
            canvas.beginPath();
            canvas.lineWidth = lineWidth;
            canvas.strokeStyle = color;
            canvas.moveTo(scaleCoeff * xStart, scaleCoeff * yStart);
            canvas.lineTo(scaleCoeff * xEnd, scaleCoeff * yEnd);
            canvas.stroke();
        }

        function drawCircle(canvas, scaleCoeff, xCenter, yCenter, radius, color, lineWidth) {
            canvas.beginPath();
            canvas.lineWidth = lineWidth;
            canvas.strokeStyle = color;
            canvas.arc(xCenter * scaleCoeff, yCenter * scaleCoeff, radius * scaleCoeff, 0, Math.PI*2);
            canvas.stroke();
        }

        return new View();
    }
);








