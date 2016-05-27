define(
    'views/viewManager',['require','backbone'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var currentView = null;
        var View = Backbone.View.extend({
            addViews: function(views) {
                for (var i = 0; i < views.length; i++ ) {
                    $(document.body).append(views[i].el);
                    views[i].hide();
                    this.bindShowEvent(views[i]);
                }
            },
            
            bindShowEvent: function(view) {
                this.listenTo(view, 'show', function(newCurrentView) {
                     changeCurrentView(newCurrentView);
                });
            },
        });

        function changeCurrentView(newCurrentView) {
            if (currentView !== null) {
                currentView.hide();
            }
            currentView = newCurrentView;   
        }

        return new View();
    }
);


define('tmpl/main',[],function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}__fest_buf+=("<div class=\"main\"><dl class=\"main__menu js-main__menu\"><dt class=\"main__stripe js-main__stripe\">Multi Game</dt><dd class=\"main__field js-main__field\"><a class=\"main__btn btn\" href=\"#game\">Start</a></dd><dt class=\"main__stripe js-main__stripe\">Single Game</dt><dd class=\"main__field js-main__field\"><a class=\"main__btn btn\" href=\"#singleGame\">Start</a></dd><dt class=\"main__stripe js-main__stripe\">Scoreboard</dt><dd class=\"main__field js-main__field\"><a class=\"main__btn btn\" href=\"#scoreboard\">Top scores</a></dd><dt class=\"main__stripe js-main__stripe js-logout-header\">Log out</dt><dd class=\"main__field js-main__field\"><a class=\"main__btn btn js-main__btn_logout\">Logout</a></dd><dt class=\"main__stripe js-main__stripe js-login-header\">Login</dt><dd class=\"main__field js-main__field\"><form class=\"main__form js-main__form_login\"><div class=\"input-field\"><label class=\"input-field__label\" for=\"username\">Login</label><div><input class=\"input-field__input form-control js-input_login_login\" type=\"text\" name=\"username\" placeholder=\"Your login\"/></div></div><div class=\"input-field\"><label class=\"input-field__label\" for=\"password\">Password</label><div><input class=\"input-field__input form-control js-input_login_password\" type=\"password\" name=\"password\" placeholder=\"Your password\"/></div></div><div><button class=\"main__btn btn\" type=\"submit\">Login!</button></div></form></dd><dt class=\"main__stripe js-main__stripe js-signup-header\">Sign up</dt><dd class=\"main__field js-main__field\"><form class=\"main__form js-main__form_signup\"><div class=\"input-field\"><label class=\"input-field__label\" for=\"email\">Email</label><div><input class=\"input-field__input form-control js-input_signup_email\" type=\"text\" name=\"signupEmail\" placeholder=\"Your email\"/></div></div><div class=\"input-field\"><label class=\"input-field__label\" for=\"username\">Login</label><div><input class=\"input-field__input form-control js-input_signup_login\" type=\"text\" name=\"signupLogin\" placeholder=\"Your login\"/></div></div><div class=\"input-field\"><label class=\"input-field__label\" for=\"password\">Password</label><div><input class=\"input-field__input form-control js-input_signup_password\" type=\"password\" name=\"signupPassword\" placeholder=\"Your password\"/></div></div><div><button class=\"btn\" type=\"submit\">Sign up!</button></div></form></dd></dl></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });
define('models/User',['backbone'], function(Backbone) {
    'use strict';
    var Backbone = require('backbone');
    var Model = Backbone.Model.extend({
        defaults: {
            login: "",
            email: "",
            password: "",
        },
        
        urlRoot : "api/user",
       
        sync: function (method, model, options) {
            if (method === "create") {
                method = "update";
            }
            options || (options = {});
            options.url = this.urlRoot;
            arguments[0] = method;

            return Backbone.sync.apply(this, arguments);
        },
    
        validate: function(attrs, options) {
            var errors = {};

            if (!attrs.login) {
                errors["loginError"] = "Please, input your login";
            } else if (/[^a-zA-Z0-9]/.test(attrs.login)) {
                errors["loginError"] = 'Your login must consist of only letters and digits';
            } else {
                errors["loginError"] = '';
            }
            
            
            if (!attrs.email) {
                errors["emailError"] = "Please, input your email";
            } else if (!attrs.email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{1,}\.[a-z]{2,}$/i)) {
                errors["emailError"] = "Please, input a valid email";
            } else {
                errors["emailError"] = "";
            }

            if (!attrs.password) {
                errors["passwordError"] = "Please, input your password";
            } else if (attrs.password.length < 5) {
                errors["passwordError"] = 'Your password must have more than 5 characters';
            } else {
                errors["passwordError"] = '';
            }
        
            return errors;
        }
    });
    return Model;
});

define('models/Session',['backbone'], function(Backbone) {
    'use strict';
    var Backbone = require('backbone');
    var Model = Backbone.Model.extend({
        defaults: {
            id : "",
            login: "",
            password: "",
            isLogged : false
        },
        
        urlRoot : "api/session",
        
        sync: function (method, model, options) {
            if (method === "create") {
                method = "update";
            }
            options || (options = {});
            options.url = this.urlRoot;
            arguments[0] = method;

            return Backbone.sync.apply(this, arguments);
        },

        validate: function(attrs, options) {
            var errors = {};
            if (!attrs.login) {
                errors['loginError'] = "Please, input your login";
            } else if (/[^a-zA-Z0-9]/.test(attrs.login)) {
                errors['loginError'] = 'Your login must consist of only letters and digits';
            } else {
                errors['loginError'] = '';
            }

            if (!attrs.password) {
                errors['passwordError'] = "Please, input your password";
            } else if (attrs.password.length < 5) {
                errors['passwordError'] = 'Your password must have more than 5 characters';
            } else {
                errors['passwordError'] = '';
            }
            
            return errors;
        }
    });

    return Model;
});

define('tmpl/game',[],function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}__fest_buf+=("<div class=\"preloader\"><div class=\"preloader__stripe\"><div class=\"preloader__round\"><img class=\"preloader__logo\" src=\"static\/snake_logo.png\"/></div></div><h2 class=\"preloader__text\">Поиск соперника</h2><div class=\"preloader__left-curtain\"></div><div class=\"preloader__right-curtain\"></div></div><div class=\"main-game\"><div class=\"main-game__main-area main main_game\"><canvas class=\"main-game__canvas\" id=\"gameCanvas\" width=\"490\" height=\"490\"></canvas></div><a class=\"main-game__btn btn  js-btn\" href=\"#main\">Quit</a></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });
define(
    'api/eventDispatcher',['require','backbone'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        return _.clone(Backbone.Events);
});

define(
    'api/gameStatus',['require','backbone','api/eventDispatcher'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var wsEvents = require('api/eventDispatcher');
        var statusMap = {
            'start' : 'GameStart',
            'move' : 'MakeMove',
            'wait' : "Wait",
            'finish' : "Finish",
            'unexpectedEnemyExit' : 'EnemyExit'
        };
       
        return( function() {
            return {
                onMessage: function(event) {
                    var data = JSON.parse(event.data);
                    wsEvents.trigger(statusMap[data.status], data);
                }   
            }
        })(); 
    }
);


define(
    'api/web-sockets',['require','api/gameStatus','api/eventDispatcher'],function (require) {
        'use strict';
        var apiStatus = require("api/gameStatus");
        var wsEvents = require('api/eventDispatcher');
        
        var PREFIX = window.location.port ? ":" : "";  
        var URL_ORIGIN = window.location.hostname + PREFIX + window.location.port;
    
        return( function() {
            return {
                initConnection : function() {
                    var webSocket = new WebSocket('ws://' + URL_ORIGIN + '/api/gameplay');
                    this.socket = webSocket;
                    this.bindEvents();
                },

                bindEvents: function() {
                    this.currentStatus = apiStatus;
                    this.socket.onopen = this.onOpen;
                    this.socket.onmessage = this.currentStatus.onMessage; 
                    this.socket.onclose = this.onClose;
                    this.socket.onerror = this.onError;
                },

                onOpen: function() {
                    console.log("Socket is opened");
                },

                onClose: function() {
                    console.log("Socket is closed");
                },
                
                onError:function() {
                    wsEvents.trigger("ConnectionFailed");
                    console.log("Socket has some problems");
                },

                isOpen: function() {
                    return (this.socket !== null);
                },

                send: function(data) {
                    this.socket.send(JSON.stringify(data));
                },

                close: function() {
                    try {
                        this.socket.close();
                    } catch (error) {
                        console.log(error.message);
                    }; 
                }
            }
        })();
    }
);


define(
    'models/Game/GameSession',['require','backbone','api/web-sockets','api/gameStatus','api/eventDispatcher'],function (require) {
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


define(
    'views/game',['require','backbone','tmpl/game','models/Game/GameSession','models/Session','api/web-sockets','api/eventDispatcher'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var session = require('models/Session'); 
        var api = require('api/web-sockets');
        var wsEvents = require('api/eventDispatcher'); 
        var scaleCoeff;
        var playerLineWidth = 6;
        var timeToWaitEnemy = 5000;
        var isEnemyFound = false;

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
 
            handleDrawInitialPoints: function(e) {
                var radius = 5 / scaleCoeff;
                var circleLineWidth = 5;
                var xRed = this.model.get("red")["x"];
                var yRed = this.model.get("red")["y"];
                var xBlue = this.model.get("blue")["x"];
                var yBlue = this.model.get("blue")["y"];

                drawCircle(this.canvas, scaleCoeff, xRed, yRed, radius, colorMap["red"], circleLineWidth);
                drawCircle(this.canvas, scaleCoeff, xBlue, yBlue, radius, colorMap["blue"], circleLineWidth);
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
                    alert("Ваш противник вышел из игры");
                });

                this.listenTo(this.model, "Winner was determined", function() {
                    if (self.model.get("win")) {
                        alert("Вы выиграли!");
                    } else {
                        alert("Вы проиграли!");
                    }
                });

                this.listenTo(wsEvents, "ConnectionFailed", function() {
                    alert("К сожалению связь с сервером не установлена. Вы можете сыграть в одиночную игру");
                });

                this.listenTo(wsEvents, "GameStart", function() {
                    isEnemyFound = true;
                    self.removePreloader();
                    self.handleDrawInitialPoints(); //HEY!
                });

                this.listenTo(this, "EnemyNotFound", function() {
                    self.removePreloader();
                    alert("Соперник не найден");
                });
            },

            timeCounter: function() {
                var self = this;
                setTimeout(function() { 
                    if (!isEnemyFound) {
                        self.trigger("EnemyNotFound");
                    }
                }, timeToWaitEnemy);
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

                drawLine(this.canvas, scaleCoeff, startX, startY, endX, endY, colorMap[enemyCurrent], playerLineWidth);
                
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
                    drawLine(this.canvas, scaleCoeff, startX, startY, endX, endY, colorMap[color], playerLineWidth)
                    this.model.get(color)["x"] = this.model.get(state)["x"];
                    this.model.get(color)["y"] = this.model.get(state)["y"];
                    this.model.sendCoord(this.model.get(color)["x"], this.model.get(color)["y"]);
                } else {
                    alert("Вы не можете так идти!");
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


define(
    'views/main',['require','backbone','tmpl/main','models/User','models/Session','views/game'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/main');
        var user = require('models/User');
        var session = require('models/Session');
        var game = require('views/game');

        var View = Backbone.View.extend({
            template: tmpl,
      
            user : new user(),
            session : new session(),

            events: {
                 'submit form.js-main__form_signup': 'handleSignup',
                 'submit form.js-main__form_login' : 'handleLogin',
                 'click a.js-main__btn_logout' : 'handleLogout'
            },

            initialize: function() {
                self = this;
                this.user.on('invalid', function (model, error) {
                    // console.log(error["passwordError"]);
                    // console.log(error["loginError"]);
            
                    //if (!errors["emailError"]) {
                    //     console.log("ошибки в email нет")
                    // } else {
                    //     console.log(error["emailError"]);
                    // }
                });

                this.session.on('invalid', function (model, error) {
                    console.log(error["passwordError"]);
                    console.log(error["loginError"]);
                });

                this.listenTo(game, 'UnauthorizedUser', function() {
                    alert("You need log in if you'd like to play multiplayer"); //будет заменен на всплывающее окно с сообщением
                });

        
                this.session.on('change:isLogged', function() {
                    if (self.session.get("isLogged")) {
                        self.viewForLoggedUser();
                    } else {
                       self.viewForUnloggedUser();
                    }
                });
            },

            handleLogout: function(e) {
                e.preventDefault();
                this.session.set({"isLogged" : false});
                this.session.destroy();
            },

            viewForLoggedUser: function() {
                this.$(".js-signup-header").addClass("main__stripe_hidden");
                this.$(".js-login-header").addClass("main__stripe_hidden");
                this.$(".js-logout-header").removeClass("main__stripe_hidden");
            },

            viewForUnloggedUser: function() {
                this.$(".js-signup-header").removeClass("main__stripe_hidden");
                this.$(".js-login-header").removeClass("main__stripe_hidden");
                this.$(".js-logout-header").addClass("main__stripe_hidden");           
            },

            render: function () {
                this.$el.html(this.template());
                this.$('.js-main__menu').on('mouseenter', '.js-main__stripe', function() {
                    $(this)
                        .next()
                            .slideDown(200)
                            .siblings('.js-main__field')
                            .slideUp(200);
                });

                this.$(".js-main__field").filter(function(index) {
                    return index !== 0;
                }).addClass("main__field_hidden");

                return this;
            },

            handleSignup: function(e) {
                e.preventDefault();
                this.user.save(
                    {
                        "login" : this.$( ".js-input_signup_login" ).val(),
                        "email" : this.$( ".js-input_signup_email" ).val(),
                        "password" : this.$( ".js-input_signup_password" ).val()
                    }, {
                    success : function() {
                        alert('success signup');
                    },
                    error : function(model, xhr, options) {
                        if (xhr.status === 403) {
                            alert('this user already exists');
                        }
                    }
                });
            },

            handleLogin: function(e) {
                e.preventDefault();
                var self = this;
                console.log("IN THE LOGIN");
                this.session.save(
                    {
                        "login" : this.$(".js-input_login_login").val(),
                        "password" : this.$(".js-input_login_password").val()
                    }, {
                    success : function() {
                        self.session.set({"isLogged" : true});
                        alert('success login');
                    },
                    error : function(model, xhr, options) {
                        if (xhr.status === 400) {
                            alert("this user doesn't exists");
                        }
                        console.log("ANOTHER ERROR");
                    }
                });
            },

            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
                this.$(".js-logout-header").addClass("main__stripe_hidden");
            },

            hide: function () {
                this.$el.hide();
                this.$(".js-main__menu").off("mouseenter");
            }
        });
        return new View();
    }
);


define('tmpl/scoreboard',[],function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;__fest_buf+=("<div class=\"help\"></div><div class=\"main\"><dl class=\"main__menu\"><dt class=\"main__stripe js-main__stripe\">ScoreBoard</dt><dd class=\"main__field\"><ul class=\"scoreboard\">");var i,v,__fest_to0,__fest_iterator0;try{__fest_iterator0=json || [];__fest_to0=__fest_iterator0.length;}catch(e){__fest_iterator0=[];__fest_to0=0;__fest_log_error(e.message);}for(i=0;i<__fest_to0;i++){v=__fest_iterator0[i];__fest_buf+=("<li class=\"scoreboard__row\"><span class=\"scoreboard__user-login\">");try{__fest_buf+=(v.login)}catch(e){__fest_log_error(e.message + "15");}__fest_buf+=("</span><em class=\"scoreboard__user-score\">");try{__fest_buf+=(__fest_escapeHTML(v.score))}catch(e){__fest_log_error(e.message + "20");}__fest_buf+=("</em></li><hr class=\"scoreboard__border-line\"/>");}__fest_buf+=("</ul><a href=\"#main\" class=\"main-game__btn btn\">Back</a></dd></dl></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });
define(
    'models/Score',['require','backbone'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var Model = Backbone.Model.extend({
            defaults: {
                id: '',
                login: '',
                score: 0
            },

            urlRoot: "api/scores",        
        });
        
        return Model;  
    }
);

define(
    'collections/Scores',['require','backbone','models/Score'],function (require) {
        'use srtict';
        var Backbone = require('backbone');
        var score = require('models/Score');

        var Collection = Backbone.Collection.extend({
            model: score,
            
            url: 'api/scores',

            comparator: function(score) {
                return -score.get('score');
            }
        });
        return Collection;
});


define(
    'views/scoreboard',['require','backbone','tmpl/scoreboard','collections/Scores'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/scoreboard');
        var scores = require('collections/Scores');

        var View = Backbone.View.extend({

            collection: new scores(),
            template: tmpl,

            initialize: function() {
                this.collection.bind('sync', this.render, this);
            },
            
            render: function () {
                this.$el.html(this.template(this.collection.toJSON()));  
                return this;
            },

            show: function () {
                this.collection.fetch();
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },
            
            hide: function () {
                $( ".js-btn" ).off("mouseenter mouseleave");
                this.$el.hide();
            }
        });
        return new View();
    }
);


define('tmpl/singleGame',[],function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}__fest_buf+=("<div class=\"main-game\"><div class=\"main-game__main-area main main_game\"><canvas class=\"main-game__canvas\" id=\"gameCanvas\" width=\"490\" height=\"490\"></canvas></div><a class=\"main-game__btn btn  js-btn\" id=\"Quit\">Quit</a></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });
define(
    'models/Game/SingleGame',['require','backbone'],function (require) {
        'use strict';
        var Backbone = require('backbone');
      
        var Model = Backbone.Model.extend({
            defaults: {
                gameFieldSize : 7,

                playerColor : "red",

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
    }
);


define(
    'views/singleGame',['require','backbone','tmpl/singleGame','models/Game/SingleGame'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/singleGame');
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
                'click #Quit' : 'handleQuit'
            },

            handleQuit: function() {
                this.model.clearLocalStorage();
                this.trigger("QuitTheSingleGame");
            },

            drawInitialPoints: function() {
                var radius = 5 / scaleCoeff;
                var circleLineWidth = 5;
                var xRed = this.model.get("current")["red"]["x"];
                var yRed = this.model.get("current")["red"]["y"];
                var xBlue = this.model.get("current")["blue"]["x"];
                var yBlue = this.model.get("current")["blue"]["y"];             
        
                drawCircle(this.canvas, scaleCoeff, xRed, yRed, radius, colorMap["red"], circleLineWidth);
                drawCircle(this.canvas, scaleCoeff, xBlue, yBlue, radius, colorMap["blue"], circleLineWidth);
            },

            defineRandomInitialPoints: function() {
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
                _.bindAll(this,'keyAction', 'renderPath');
                this.isUserRefreshedThePage = false; 
            },

            resumeGameAfterPageReload: function() {
                var redPoints = this.model.getOccupiedPointsFromStorageByColor("red");
                var bluePoints = this.model.getOccupiedPointsFromStorageByColor("blue");

                this.resetDrawPoints(redPoints, "red");
                this.resetDrawPoints(bluePoints, "blue");
                this.model.get("current")["red"] = redPoints[redPoints.length - 1];
                this.model.get("current")["blue"] = bluePoints[bluePoints.length - 1];
            },

            resetDrawPoints: function(playerPoints, playerColor) {
                var radius = 5 / scaleCoeff;
                var circleLineWidth = 5;
                var startX = playerPoints[0]["x"];
                var startY = playerPoints[0]["y"];
                var endX;
                var endY;
                
                drawCircle(this.canvas, scaleCoeff, startX, startY, radius, playerColor, circleLineWidth);
                for( var i = 0; i < playerPoints.length - 1; i++ ) {
                    startX = playerPoints[i]["x"];
                    startY = playerPoints[i]["y"];
                    endX = playerPoints[i + 1]["x"];
                    endY = playerPoints[i + 1]["y"];
                    drawLine(this.canvas, scaleCoeff, startX, startY, endX, endY, playerColor, playerLineWidth);
                }
            },

            render: function() {  
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
                return this.model.get("possibilities")[playerColor][state]["x"] !== -1 && this.model.get("possibilities")[playerColor][state]["y"] !== -1  
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
            
            getInitialPoints: function() {
                this.model.set({"current" : this.defineRandomInitialPoints()});
                this.model.pushInContainerOcuppiedPoints(this.model.get("current")["red"]);
                this.model.pushInContainerOcuppiedPoints(this.model.get("current")["blue"]);
            },

            show: function (previousUrl) {
                this.isUserRefreshedThePage = previousUrl === window.location.href;
                
                this.render();
                this.trigger("show", this);
                this.$el.show();

                if (this.isUserRefreshedThePage) {
                    this.resumeGameAfterPageReload();
                } else {
                    this.getInitialPoints(); 
                    this.drawInitialPoints();
                }
                $(document).bind('keydown', this.keyAction);
            },
            
            hide: function () {
                $(document).unbind('keydown', this.keyAction);
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


define(
    'router',['require','backbone','views/viewManager','views/main','views/scoreboard','views/game','views/main','views/singleGame'],function (require) {
        'use strict';
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');
        
        var main = require('views/main');
        var scoreboard = require('views/scoreboard');
        var game = require('views/game');
        var main = require('views/main');
        var singleGame = require('views/singleGame');
        
        var urlHistory = window.sessionStorage;

        viewManager.addViews([
            main,
            scoreboard,
            game,
            singleGame
        ]);

        var Router = Backbone.Router.extend({
            routes: {
                'main': 'concreteAction', 
                'scoreboard': 'concreteAction',
                'game': 'gameAction',
                'singleGame' : 'singleGameAction',

                '*default': 'defaultAction'
            },
           
            initialize: function() {
                var self = this;
                Backbone.history.start();
                this.listenTo(singleGame, "QuitTheSingleGame", function() {
                    self.navigate("main", {trigger : true});
                });
                return this;
            },

            gameAction: function() {
                var self = this;
                game.isAuth().done(function() {
                    urlHistory.setItem(urlHistory.length + 1, window.location.href);
                    game.show();
                }).fail(function() {
                    self.navigate("main");
                }); 
            },

            concreteAction: function() {
                urlHistory.setItem(urlHistory.length + 1, window.location.href);
                var view = require('views/'+ Backbone.history.getFragment());
                view.show();
            },

            singleGameAction: function() {
                urlHistory.setItem(urlHistory.length + 1, window.location.href);
                var previousUrl = urlHistory.getItem(urlHistory.length - 1);
                singleGame.show(previousUrl);
            },

            defaultAction: function() {
                urlHistory.setItem(urlHistory.length + 1, window.location.href);
                main.show();
            },
            
        });
        return new Router();
    }
);






require.config({ 
    baseUrl: "js",
    paths: {
        jquery: [
                "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min", 
                "lib/jquery"
        ],
        underscore: [
                "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min", 
                "lib/underscore"
        ],
        backbone: [
                "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
                "lib/backbone"
        ],
        bootstrap: [
                "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min",
                "lib/bootstrap"
        ]
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "bootstrap" : { 
            deps :['jquery'] 
        }
    }
});

require([ 'bootstrap','router'/*, 'app'*/]);








define("main", function(){});

