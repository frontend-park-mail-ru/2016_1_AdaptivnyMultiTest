define(
    ['views/baseView','tmpl/main'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);