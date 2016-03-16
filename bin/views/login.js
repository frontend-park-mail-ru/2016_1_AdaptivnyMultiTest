define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/login');
        var user = require('models/User');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            template: tmpl,
            model: new user(),
            events: {
                'click button#loginTomain': 'toMenu',
                'click button#submitLogin': 'handleSubmit',
                'click button#loginTosignup': 'toSignup'
            },
            initialize: function() {
                this.render();
                Backbone.Validation.bind(this, {invalid: function(view, attr, error, selector) {
                        alert(error);
                    }
                });
            },
            render: function () {
                this.$el.html(this.template());
            },
            toMenu: function(e) {
                e.preventDefault();
                window.location.hash = "main";
            },
            handleSubmit: function(e) {
                e.preventDefault();
                this.model.set({
                    login : $( ":text" ).val(),
                    password : $( ":password" ).val(),
                });
                if( this.model.isValid(['login', 'password']) ) {
                    //e.currentTarget.submit();
                    this.model.sendLogin();
                } else {
                    this.model.destroy();
                }
            },
            toSignup: function(e) {
                e.preventDefault();
                window.location.hash = "signup";
            }
        });
        return new View();
    }
);

