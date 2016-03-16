define(
    function (require) {
        var Scores =  require("collections/Scores");
    
        //определяем модуль
        QUnit.module("collections/Scores", { 
            setup: function () {
                //здесь описыватся callback, который запуститься до выполнения теста
                var testData = [

                {login: "Мудрец4", score: 1},
                {login: "Мудрец2", score: 3},
                {login: "Мудрец1", score: 4},
                {login: "Мудрец3", score: 2}

                ]
                this.list = new Scores(testData);
            },
            teardown: function () {
                //здесь описыватся callback, который запуститься после выполнения теста
            }
        });

        //выполнение теста
        QUnit.test("test ordering of player's scores", function () {
            var expected = ['Мудрец1','Мудрец2','Мудрец3','Мудрец4'];
            var actual = _.pluck(this.list.toJSON(), 'login');
            QUnit.deepEqual(expected, actual, "Comparator of Scores works properly");
        });
    }
);

