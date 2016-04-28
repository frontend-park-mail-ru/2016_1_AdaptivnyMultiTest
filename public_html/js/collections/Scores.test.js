define(
    function (require) {
        var Backbone = require('backbone');
        var Scores =  require("collections/Scores");
    
        QUnit.module("collections/Scores", { 
            setup: function () {
                var testData = new Scores();
                testData.add([
                    {login: "Мудрец4", score: 1},
                    {login: "Мудрец2", score: 3},
                    {login: "Мудрец1", score: 4},
                    {login: "Мудрец3", score: 2}
                ]);
                this.list = testData;
            },

        });
        QUnit.test("test ordering of player's scores in static massive", function () {
            var expected = ['Мудрец1','Мудрец2','Мудрец3','Мудрец4'];
            var actual = _.pluck(this.list.toJSON(), 'login');
            QUnit.deepEqual(expected, actual, "Comparator of Scores works properly");
        });
    }
);
