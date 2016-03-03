define(
    ['views/baseView','tmpl/login'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);