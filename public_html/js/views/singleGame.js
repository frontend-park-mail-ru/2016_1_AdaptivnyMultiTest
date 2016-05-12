define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var container = require('models/Game/SingleGame')

        var View = Backbone.View.extend({
            template: tmpl,
            id: "game",

            model : new container(),

            events : {
                'click canvas#gameCanvas' : 'handleDrawInitialPoints' 
            },
            

            getRandomValueFromArray: function(array) {
                rand = 0 - 0.5 + Math.random() * ((array.length - 1) - 0 + 1)
                rand = Math.round(rand);
                return array[rand];
            },

            //рисуем первые точки
            handleDrawInitialPoints: function(e) {
                e.preventDefault();
                this.canvas.beginPath(); 
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.lineWidth = 5;
                scaleCoeff = 490  / 7;
                this.canvas.arc(this.model.get("current")["red"]["x"] * scaleCoeff, this.model.get("current")["red"]["y"] * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke(); 
                this.canvas.closePath();
                this.canvas.beginPath();
                this.canvas.strokeStyle = "#004DFF";
                this.canvas.arc(this.model.get("current")["blue"]["x"] * scaleCoeff, this.model.get("current")["blue"]["y"] * scaleCoeff, 5, 0, Math.PI*2, false);
                this.canvas.stroke();
                this.delete_event("click canvas#gameCanvas");
            },

            delete_event: function(e_name) {
                delete this.events[e_name];
                this.delegateEvents();
            },

                    

            initialize: function() {
                _.bindAll(this,'keyAction', 'renderPath', 'handleDrawInitialPoints');

                //определение значение первоначальных точек
                redx = this.getRandomValueFromArray([1, 2, 3, 4, 5, 6]);
                redy = this.getRandomValueFromArray([1, 2, 3, 4, 5, 6]);
                firstRed = {
                    "x" : redx,
                    "y" : redy
                }

                bluex = redx;
                while( bluex === redx ) {
                    bluex = this.getRandomValueFromArray([1, 2, 3, 4, 5, 6]);
                }
                bluey = redy;
                while( bluey === redy ) {
                    bluey = this.getRandomValueFromArray([1, 2, 3, 4, 5, 6]);
                }
                firstBlue = {
                    "x" : bluex,
                    "y" : bluey
                }

                current = {
                    "red" : firstRed,
                    "blue" : firstBlue
                }

                this.model.set({"current" : current});
                
                //записали текущие точки в контейнер
                this.model.pushPointInContainer(this.model.get("current")["red"]);
                this.model.pushPointInContainer(this.model.get("current")["blue"]);

                //включаем клавиатуру для человека
                //$(document).bind('keydown', this.keyAction);
                this.$el.bind('keydown', this.keyAction);
            },

            render: function () {  
                this.$el.html(this.template());
                this.canvas = this.$el.find("#gameCanvas")[0].getContext("2d");
             
                //строим красные границы - левая и верхняя стороны
                this.canvas.beginPath();
                this.canvas.lineWidth = 4;
                this.canvas.strokeStyle = "#FF0000";
                this.canvas.moveTo(0, 490);
                this.canvas.lineTo(0, 0);
                this.canvas.lineTo(490, 0);
                this.canvas.stroke();
                
                //строим синие границы - правая и нижняя стороны
                this.canvas.beginPath();
                this.canvas.lineWidth = 4;
                this.canvas.strokeStyle = "#004DFF";
                this.canvas.moveTo(490, 0);
                this.canvas.lineTo(490, 490);
                this.canvas.lineTo(0, 490);
                this.canvas.stroke();

                //сетка
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
               
            },

            isFinishGame: function(color) {
                for( state in ["left", "top", "right", "bottom"] ) {
                    if( this.model.get("possibilities")[color][state] !== {"x" : -1, "y" : -1} ) {
                        return false;
                    }
                }
                return true;
            },
            
            renderPath: function(state) {

                scaleCoeff = 490 / 7;
                this.model.getPossibleMove(this.model.get("current")["red"]);

                if( this.isFinishGame("red") !== true ) {
                    if( this.model.get("possibilities")["red"][state] !== {"x" : -1, "y" : -1} ) {
                    this.drawLine( this.model.get("current")["red"]["x"] * scaleCoeff, 
                                   this.model.get("current")["red"]["y"] * scaleCoeff,
                                   this.model.get("possibilities")["red"][state]["x"] * scaleCoeff,
                                   this.model.get("possibilities")["red"][state]["y"] * scaleCoeff );
                    this.model.get("current")["red"] = this.model.get("possibilities")["red"][state];
                    } else {
                        alert("Вы не можете так идти!");
                    }
                } else if( this.isFinishGame("red") !== false ) {
                    alert("Вы проиграли");
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
            },
            
            hide: function () {
                // $(document).unbind('keydown', this.keyAction);
                this.$el.unbind('keydown', this.keyAction);
                this.$el.hide();
            }
        });
        return new View();
    }
);






