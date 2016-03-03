define(
    ['views/baseView','tmpl/game'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);