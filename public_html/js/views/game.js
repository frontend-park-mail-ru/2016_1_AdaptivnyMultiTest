define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var session = require('models/Session');
        var View = Backbone.View.extend({
            template: tmpl,
            id: "game",

            model : new gameSession(),
            session : new session(),

            startForDraw :  {
                x : null,
                y : null
            },

            events : {
                'click canvas#gameCanvas' : 'handleDrawInitialPoints' 
            },

            handleDrawInitialPoints: function(e) {
                e.preventDefault();
                this.canvas.beginPath(); 
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.lineWidth = 5;
                scaleCoeff = 490  / 7;
                this.canvas.arc(this.model.get('redx') * scaleCoeff, this.model.get('redy') * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke(); 
                this.canvas.closePath();
                this.canvas.beginPath();
                this.canvas.strokeStyle = "#004DFF";
                this.canvas.arc(this.model.get('bluex') * scaleCoeff, this.model.get('bluey') * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke(); 
            },

            connectToGame: function() {
                self = this;       
                this.model.save({}, {
                    type : "put",
                    data: JSON.stringify({ login : this.session.toJSON()["login"]} ),
                    contentType: "application/json",

                    success: function() {
                        redData = {
                            x : self.model.get("redx"),
                            y : self.model.get("redy")
                        };

                        self.startForDraw.x =  self.model.get("bluex");
                        self.startForDraw.y =  self.model.get("bluey");

                        self.model.save(redData, { patch : true });
                    },

                    error: function() {
                        console.log("You didn't get the neighbour points for your initial point");
                    }              
                });           
            },

            isAuth : function() {
                deferred = $.Deferred();
                self = this;
                this.session.fetch({
                    success : function() {
                        deferred.resolve();
                    },

                    error : function() {
                        self.trigger("Unauthorized user");
                        deferred.reject();
                    }
                })
                return deferred.promise();
            },            

            initialize: function() {
                _.bindAll(this, 
                    'keyAction'
                );
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
                this.canvas.strokeStyle ="#004DFF";
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

            isFinishGame: function() {
                states = ['left', 'top', 'right', 'bottom']
                for( var i = 0; i < states.length; i++ ) {
                    if( self.model.get(states[i])["x"] !== -1 || self.model.get(states[i])["y"] !== -1 ) {
                            return false;
                    }
                }
                return true;
            },

            renderPath: function(state, isBluePlayer) {
                console.log("отсчет для рисования", this.startForDraw.x, this.startForDraw.y);

                scaleCoeff = 490 / 7;
                if( isBluePlayer ) {
                    color = "#004DFF";
                } else {
                    color = "#FF0000";
                }
               
                if( !this.isFinishGame() ) {
                    if( this.model.get(state)["x"] !== -1 && this.model.get(state)["y"] !== -1 ) {
                        this.drawLine(this.startForDraw.x * scaleCoeff, this.startForDraw.y * scaleCoeff, this.model.get(state)["x"] * scaleCoeff,  this.model.get(state)["y"] * scaleCoeff, color);
                    
                        this.startForDraw.x = this.model.get("x");
                        this.startForDraw.y = this.model.get("y");

                        data = {
                            x : this.model.get(state)["x"],
                            y : this.model.get(state)["y"]
                        };
                        this.model.save(data, {patch : true});
                    } else {
                        alert("Вы не можете так идти");
                    }  
                } else {
                    if( isBluePlayer == true ) {
                        alert("Победа красного игрока")
                    } else {
                        alert("Победа синего игрока");
                    }
                }
            },

            keyAction : function(e) {
                var code = e.keyCode || e.which;
                switch (code) {
                    case 37:
                        this.renderPath("left", true);           
                        break;
                    case 38:
                        this.renderPath("top", true);
                        break;
                    case 39:
                        this.renderPath("right", true);
                        break;
                    case 40:
                        this.renderPath("bottom", true);
                        break;

                    case 65:
                        this.renderPath("left",  false);
                        break;
                    case 87:
                        this.renderPath("top", false);
                        break;
                    case 68:
                        this.renderPath("right", false);
                        break;
                    case 83:
                        this.renderPath("bottom", false);      
                        break;                     
                }
            },
        
            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
                this.connectToGame();
                $(document).bind('keydown', this.keyAction);
            },
            
            hide: function () {
                this.$el.unbind('keydown', this.keyAction);
                this.model.destroy();
                this.$el.hide();
            }
        });
        return new View();
    }
);

