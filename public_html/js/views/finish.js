define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/finish');
        var gameSession = require('models/Game/GameSession');
        var gameView = require('views/game');

        var View = Backbone.View.extend({
            id : "finish",
            model : new gameSession({
                id: 1,
                login: "Знаток",
                theme: 'География',
                gameScore: 5,
                questionsNum: 5,
                questions: [
		    {id : 15, text : "Кто открыл Америку?", theme : "География",
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
                playerAnswers: [{question : 17, answer : "1522"}]
            }),

            template: tmpl,

            initialize: function() {},
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);

