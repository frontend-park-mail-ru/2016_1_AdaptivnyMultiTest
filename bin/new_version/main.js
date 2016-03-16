define(['superview', 'tmpl/main'], function (superview, tmpl) {
        var View = superview.extend({
            template: tmpl,
            events: {
                'click button#scoreboard' : 'toScoreboard',
                'click button#game' : 'toGame',
                'click button#login' : 'toLogin',
            },
            toScoreboard: function(e) {
                e.preventDefault();
                console.log('to scoreboard');
                window.location.hash = "scoreboard";
            },
            toGame: function(e) {
                e.preventDefault();
                window.location.hash = "game";
            },
            toLogin: function(e) {
                e.preventDefault();
                window.location.hash = "login";
            }
        });
        return new View();
    }
);

