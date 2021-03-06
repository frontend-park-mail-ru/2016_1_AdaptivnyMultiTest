define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var session = require('models/Session'); 
        var api = require('api/web-sockets');
        var wsEvents = require('api/eventDispatcher'); 
        var scaleCoeff;
        
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

            model : new gameSession(),
            session : new session(),
            
            playerLineWidth : 6,
            timeToWaitEnemy : 5000,
            isEnemyFound : false,            
            
            events : {
                'click canvas#gameCanvas' : 'handleDrawInitialPoints' 
            },
           
            handleDrawInitialPoints: function(e) {
                e.preventDefault();
                var radius = 5 / scaleCoeff;
                var circleLineWidth = 5;
                var xRed = this.model.get("red")["x"];
                var yRed = this.model.get("red")["y"];
                var xBlue = this.model.get("blue")["x"];
                var yBlue = this.model.get("blue")["y"];

                drawCircle(this.canvas, scaleCoeff, xRed, yRed, radius, colorMap["red"], circleLineWidth);
                drawCircle(this.canvas, scaleCoeff, xBlue, yBlue, radius, colorMap["blue"], circleLineWidth);

                this.delete_event("click canvas#gameCanvas");
            },

            delete_event: function(eventName) {
                delete this.events[eventName];
                this.delegateEvents();
            },

            isAuth : function() {
                var deferred = $.Deferred();
                var self = this;
                this.session.fetch({
                    success : function() {
                        deferred.resolve();
                    }, error : function(model, xhr, options) {
                        if( xhr.status === 401 ) {
                            self.trigger("UnauthorizedUser");
                            deferred.reject();
                        } else {
                            deferred.resolve();
                        }
                    }
                });

                return deferred.promise();
            },            

            initialize: function() {
                _.bindAll(this,'keyAction', 'renderPath', 'handleDrawInitialPoints');

                var self = this;
                this.listenTo(this.model, 'turnOnKeyboard', function() {
                    self.drawEnemyPath();
                    $(document).bind('keydown', self.keyAction);
                });

                this.listenTo(this.model, 'turnOffKeyboard', function() {
                    $(document).unbind('keydown', self.keyAction);
                });

                this.listenTo(this.model, "EnemyExit", function() {
                    $('.js-modal-enemy-exit').modal('show');
                });

                this.listenTo(this.model, "Winner was determined", function() {
                    if (self.model.get("win")) {
                        $('.js-modal-player-won').modal('show');
                    } else {
                        $('.js-modal-player-loose').modal('show');
                    }
                });

                this.listenTo(wsEvents, "ConnectionFailed", function() {
                    $('.js-modal-no-response-from-server').modal('show');
                });

                this.listenTo(wsEvents, "GameStart", function() {
                    self.isEnemyFound = true;
                    self.removePreloader();
                });

                this.listenTo(this, "EnemyNotFound", function() {
                    self.removePreloader();
                });
            },

            timeCounter: function() {
                var self = this;
                setTimeout(function() { 
                    if (!isEnemyFound) {
                        self.removePreloader();
                        $('.js-modal-no-enemy').modal('show');
                    } 
                }, self.timeToWaitEnemy);
            },
 
            addPreloader: function() {
                $('body').removeClass('js-body_loaded');
            },

            removePreloader: function() {
                $('body').addClass('js-body_loaded');
            },

            render: function () {

                this.$el.html(this.template());
                var borderLineWidth = 5;
                var meshesLineWidth = 1;
                var canvasTag = this.$el.find("#gameCanvas")[0];
                var canvasSize = canvasTag.width;

                scaleCoeff =  canvasSize / this.model.get("gameFieldSize");
                this.canvas = canvasTag.getContext("2d");

                drawLine(this.canvas, 1, 0, 0, canvasSize, 0, colorMap["red"], borderLineWidth);
                drawLine(this.canvas, 1, 0, 0, 0, canvasSize, colorMap["red"], borderLineWidth);
                drawLine(this.canvas, 1, 0, 490, canvasSize, canvasSize, colorMap["blue"], borderLineWidth);
                drawLine(this.canvas, 1, canvasSize, 0, canvasSize, canvasSize, colorMap["blue"], borderLineWidth);
             
                for( var i = 0; i <= this.model.get("gameFieldSize"); i++ ) {
                    drawLine(this.canvas, scaleCoeff, i, 0, i, canvasSize, colorMap["black"], meshesLineWidth);
                    drawLine(this.canvas, scaleCoeff, 0, i, canvasSize, i, colorMap["black"], meshesLineWidth);
                }
            },
    
            drawEnemyPath: function() {
                var color = this.model.get("color");
                var enemyCurrent = color === "red" ? "blue" : "red";
                var startX = this.model.get(enemyCurrent)["x"]; 
                var startY = this.model.get(enemyCurrent)["y"]; 
                var endX = this.model.get("enemyMove")["x"];
                var endY = this.model.get("enemyMove")["y"];

                drawLine(this.canvas, scaleCoeff, startX, startY, endX, endY, colorMap[enemyCurrent], this.playerLineWidth);
                
                this.model.get(enemyCurrent)["x"] = this.model.get("enemyMove")["x"];
                this.model.get(enemyCurrent)["y"] = this.model.get("enemyMove")["y"]; 
            },

            isPossibleToMove: function(state) {
                return this.model.get(state)["x"] !== -1 && 
                       this.model.get(state)["y"] !== -1
            },
            
            renderPath: function(state) {
                if (this.isPossibleToMove(state)) {
                    var color = this.model.get("color");
                    var startX = this.model.get(color)["x"];
                    var startY = this.model.get(color)["y"];
                    var endX = this.model.get(state)["x"];
                    var endY = this.model.get(state)["y"]
                    drawLine(this.canvas, scaleCoeff, startX, startY, endX, endY, colorMap[color], this.playerLineWidth)
                    this.model.get(color)["x"] = this.model.get(state)["x"];
                    this.model.get(color)["y"] = this.model.get(state)["y"];
                    this.model.sendCoord(this.model.get(color)["x"], this.model.get(color)["y"]);
                } else {
                    $('.js-modal-wrong-way').modal('show');
                }
            },

            
            keyAction : function(e) {
                var code = e.keyCode || e.which;
                this.renderPath(keyCodeMap[String(code)])
            },
        
            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
                api.initConnection();
                this.timeCounter();
            },
            
            hide: function () {
                this.addPreloader();
                $(document).unbind('keydown', this.keyAction);
                api.close();
                this.$el.hide();
            }
        });

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
            canvas.arc(xCenter * scaleCoeff, yCenter * scaleCoeff, radius * scaleCoeff, 0, Math.PI*2)
            canvas.stroke();
        }

        return new View();
    }
);