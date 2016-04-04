define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/newgame');
        var themes = require('models/Game/Themes');
        var userSession = require('models/Session');
        var gameSession = require('models/Game/GameSession');

        var View = Backbone.View.extend({
            model: new themes(),
            userSession: new userSession(),
            gameSession: new gameSession(),
           

            template: tmpl,

            events : {
                "change #themes" : "selectTheme",
                "change #questionsNum" : "selectQuestionsNum",
                'click #createGame' : 'createGame'
            },

            initialize: function() {
                $(document.body).append(this.$el);
                this.userSession.fetch({
                    success : function(model, response, options) {
                        //this.gameSession.set({'login' : response.login });//Раскомментить+++++++++++++++++++++
                    }
                });
                this.model.bind('sync', this.render, this);
                this.model.fetch();
                //this.render();
                this.hide(); 
            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            selectTheme: function(e) {
                e.preventDefault();
                this.gameSession.set({
                    "theme" : $("#themes").val()
                })
            },
            selectQuestionsNum: function(e) {
                e.preventDefault();
                this.gameSession.set({
                    "questionsNum" : $("#questionsNum").val()
                })
            },
            createGame: function(e) {
                e.preventDefault();
                this.gameSession.set({
                    "login" : "admin" //////////+++++++++++++++++++=
                })
                this.gameSession.save({patch:true});
                window.location.hash = "#game";
                this.trigger("startGame");
            },
            show: function () {
                this.trigger("show");
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);



