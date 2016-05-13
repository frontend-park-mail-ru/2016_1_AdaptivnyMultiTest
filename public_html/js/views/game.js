define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var session = require('models/Session'); 
        var api = require('api/apiWS');

        var View = Backbone.View.extend({
            template: tmpl,
            id: "game",

            model : new gameSession(),
            session : new session(),

            events : {
                'click canvas#gameCanvas' : 'handleDrawInitialPoints' 
            },
            
            handleDrawInitialPoints: function(e) {
                e.preventDefault();
                this.canvas.beginPath(); 
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.lineWidth = 5;
                scaleCoeff = 490  / 7;
                this.canvas.arc(this.model.get("firstRed")["x"] * scaleCoeff, this.model.get("firstRed")["y"] * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke(); 
                this.canvas.closePath();
                this.canvas.beginPath();
                this.canvas.strokeStyle = "#004DFF";
                this.canvas.arc(this.model.get("firstBlue")["x"] * scaleCoeff, this.model.get("firstBlue")["y"] * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke();
                this.delete_event("click canvas#gameCanvas");
            },

            delete_event: function(e_name) {
                delete this.events[e_name];
                this.delegateEvents();
            },

            isAuth : function() {
                deferred = $.Deferred();
                self = this;
                this.session.fetch({
                    success : function() {
                        deferred.resolve(self.isOffline);
                    }, error : function(model, xhr, options) {
                        if( xhr.status === 401 ) {
                            self.trigger("Unauthorized user");
                        } 
                        deferred.reject();
                    }
                });
                return deferred.promise();
            },            

            initialize: function() {
                _.bindAll(this,'keyAction', 'renderPath', 'handleDrawInitialPoints');

                self = this;
                this.listenTo(this.model, 'turnOnKeyboard', function() {
                    self.drawEnemyPath();
                    this.$el.bind('keydown', this.keyAction);
                });

                this.listenTo(this.model, 'turnOffKeyboard', function() {
                    this.$el.unbind('keydown', this.keyAction);
                });

                this.listenTo(this.model, "EnemyExit", function() {
                    alert("Ваш противник вышел из игры");
                });

                this.listenTo(this.model, "Winner was determined", function() {
                    if( self.model.get("win") === true ) {
                        alert("Вы выиграли!");
                    } else if( self.model.get("win") === false ) {
                        alert("Вы проиграли!");
                    }
                });

                this.isOffline = false;
                $(document).on("suggestionToPlay", function (evt) {
                    self.isOffline = true;
                });
            },

            render: function () {  
                this.$el.html(this.template());
                this.canvas = this.$el.find("#gameCanvas")[0].getContext("2d");
             
                this.canvas.beginPath();
                this.canvas.lineWidth = 4;
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.moveTo(0, 490);
                this.canvas.lineTo(0, 0);
                this.canvas.lineTo(490, 0);
                this.canvas.stroke();
                
                this.canvas.beginPath();
                this.canvas.lineWidth = 4;
                this.canvas.strokeStyle = "#004DFF";
                this.canvas.moveTo(490, 0);
                this.canvas.lineTo(490, 490);
                this.canvas.lineTo(0, 490);
                this.canvas.stroke();

                this.canvas.beginPath();
                this.canvas.lineWidth = 1;
                this.canvas.strokeStyle = "#000000";
                for( var i = 0; i < 8; i++ ) {
                    this.canvas.moveTo(70 * i, 0);
                    this.canvas.lineTo(70 * i, 490);
                    this.canvas.moveTo(0, 70 * i);
                    this.canvas.lineTo(490, 70 * i);
                }
                this.canvas.stroke();
            },

            drawLine: function(xStart, yStart, xEnd, yEnd, color) {
                this.canvas.beginPath();
                this.canvas.lineWidth = 6;
                this.canvas.strokeStyle = color;
                this.canvas.moveTo(xStart, yStart);
                this.canvas.lineTo(xEnd, yEnd);
                this.canvas.stroke();
            },

            drawEnemyPath: function() {
                scaleCoeff = 490 / 7;
                console.log(this.model.get("color"));
                if( this.model.get("color") === "#FF0000" ) {
                    this.drawLine(this.model.get("firstBlue")["x"] * scaleCoeff, this.model.get("firstBlue")["y"] * scaleCoeff, this.model.get("enemyMove")["x"] * scaleCoeff, this.model.get("enemyMove")["y"] * scaleCoeff, "#004DFF");
                    this.model.get("firstBlue")["x"] = this.model.get("enemyMove")["x"];
                    this.model.get("firstBlue")["y"] = this.model.get("enemyMove")["y"];
                } else if( this.model.get("color") === "#004DFF" ) {
                    this.drawLine(this.model.get("firstRed")["x"] * scaleCoeff, this.model.get("firstRed")["y"] * scaleCoeff, this.model.get("enemyMove")["x"] * scaleCoeff, this.model.get("enemyMove")["y"] * scaleCoeff, "#FF0000");
                    this.model.get("firstRed")["x"] = this.model.get("enemyMove")["x"];
                    this.model.get("firstRed")["y"] = this.model.get("enemyMove")["y"]; 
                }
            },
            
            renderPath: function(state) {
                scaleCoeff = 490 / 7;
                if( this.model.get("win") === null ) {
                    if( this.model.get(state)["x"] !== -1 && this.model.get(state)["y"] !== -1 ) {
                        if( this.model.get("color") === "#FF0000" ) { 
                            this.drawLine(this.model.get("firstRed")["x"] * scaleCoeff, this.model.get("firstRed")["y"] * scaleCoeff, this.model.get(state)["x"] * scaleCoeff, this.model.get(state)["y"] * scaleCoeff, "#FF0000");
                            this.model.get("firstRed")["x"] = this.model.get(state)["x"];
                            this.model.get("firstRed")["y"] = this.model.get(state)["y"];
                            this.model.sendCoord(this.model.get("firstRed")["x"], this.model.get("firstRed")["y"]);
                        } else if( this.model.get("color") === "#004DFF" ) {
                            this.drawLine(this.model.get("firstBlue")["x"] * scaleCoeff, this.model.get("firstBlue")["y"] * scaleCoeff, this.model.get(state)["x"] * scaleCoeff, this.model.get(state)["y"] * scaleCoeff, "#004DFF");
                            this.model.get("firstBlue")["x"] = this.model.get(state)["x"];
                            this.model.get("firstBlue")["y"] = this.model.get(state)["y"];
                            this.model.sendCoord(this.model.get("firstBlue")["x"], this.model.get("firstBlue")["y"]);
                        }
                    } else {
                        alert("Вы так не может идти!");
                    }
                } 
            },

            keyAction : function(e) {
                var code = e.keyCode || e.which;
                switch (code) {
                    case 37:
                        this.renderPath("left");          
                        break;
                    case 38:
                        this.renderPath("top");
                        break;
                    case 39:
                        this.renderPath("right");
                        break;
                    case 40:
                        this.renderPath("bottom");
                        break;                   
                }
            },
        
            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
                api.initConnection();
            },
            
            hide: function () {
                this.$el.unbind('keydown', this.keyAction);
                api.close();
                this.$el.hide();
            }
        });
        return new View();
    }
);






