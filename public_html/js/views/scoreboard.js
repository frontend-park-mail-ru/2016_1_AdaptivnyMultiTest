define(
    ['views/baseView','tmpl/scoreboard'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);