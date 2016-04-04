define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/game');
        var gameSession = require('models/Game/GameSession');
        var playerAnswer = require('models/Game/PlayerAnswer');
        var newgameView = require('views/newgame');/////?????????

        var View = Backbone.View.extend({
            template: tmpl,
            model: new gameSession(),
            playerAnswer : new playerAnswer(),


           /*model : new gameSession(
        {
            id: 1,
            login: "Знаток",
            theme: 'География',
            gameScore: 5,
            questionsNum: 5,
            questions: [{id : 15, text : "Кто открыл Америку?", theme : "География",
                        answer1 : "Кук", answer2 : "Америго Веспуччи", answer3 : "Колумб", answer4: "Магеллан"},

                        {id : 17, text : "В каком году Магеллан совершил кругосветное плавание?", theme : "География",
                        answer1: "1521", answer2 : "1519", answer3 : "1522", answer4 :"1526"},

                        {id : 27, text : "Назовите 3-ю по территории государство мира?", theme : "География",
                        answer1: "Канада", answer2: "Китай", answer3: "Бразилия", answer4: "США"},

                        {id : 87, text : "Столица Уэльса?", theme : "География",
                        answer1: "Кардифф", answer2: "Дублин", answer3: "Белфаст", answer4: "Эдинбург"},

                        {id : 79, text : "Страна, в которой больше всего часовых поясов?", theme : "География",
                        answer1 : "США1111", answer2 : "Россия", answer3 : "Китай", answer4 : "Франция"}
                       ],
            //playerAnswers: [{question : 17, answer : "1522"}]
        }
        ),*/

            questionCounter: 0,

            events : {
                'click #next' : 'nextQuestion',
                'click #finish' : 'getResult'
            },

            getQuestion: function(index) {
                if( index >= 0 ) {
                    question = this.model.get("questions");
                    console.log(question, index);
                    question[index]["login"] = this.model.get("login");
                    question[index]["questionsNum"] = this.model.get("questionsNum");
                    question[index]["questionCounter"] = index;
                    return question[index];
                }
                return;
            },

            initialize: function() {
                $(document.body).append(this.$el); //обращемся к DOM-элементу тега body и добавляем к нему DOM - обертку нашей вьюхи
                self = this;
                newgameView.on("startGame", function() {
                    self.model.fetch({
                        success: function(response) {
                            self.render(self.questionCounter++);
                        }
                    });
                    
                });
            },

            render: function (index) {
                this.$el.html(this.template(this.getQuestion(index)));
                return this;
            },

            nextQuestion: function(e) {
                e.preventDefault();
                this.playerAnswer.set({
                    "question" : this.model.get("questions")[this.questionCounter - 1].id ,
                    "answer" : $('input[name="answer"]:checked').parent().text()
                })
                this.playerAnswer.save();
                this.render(this.questionCounter++);
            },

            getResult: function(e) {
                e.preventDefault();
                this.playerAnswer.set({
                    "question" : this.model.get("questions")[this.questionCounter - 1].id ,
                    "answer" : $('input[name="answer"]:checked').parent().text()
                })
                this.playerAnswer.save({
                    success : function() {
                        window.location.hash = "#finish";
                    }
                });
                //this.hide();
                //this.trigger("finishGame");
                //this.hide();
                //window.location.hash = "#finish";
                
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







