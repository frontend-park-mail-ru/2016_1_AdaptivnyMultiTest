define(['views/superview', 'tmpl/game'], function (superview, tmpl) {
        var View = superview.extend({
            template: tmpl
        });
        return new View();
    }
);

