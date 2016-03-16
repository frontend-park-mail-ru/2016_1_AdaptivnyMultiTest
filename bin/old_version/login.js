define(['backbone', 'tmpl/login', 'models/User', 'backbone_validation'], function (Backbone, tmpl, user, BackboneValidation) {
        var View = Backbone.View.extend({
            //el: '#page',
            template: tmpl,
            model: new user(),
            events: {
                'click button#main': 'toMenu',
                'click button#submitId': 'handleSubmit',
                'click #signup': 'toSignup'
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
                console.log('in the submit');
                this.model.set({
                    login : $( ":text" ).val(),
                    password: $( ":password" ).val(),
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
            },
            /*
            show: function() {
                $('#page').append(this.el);
                $(this.el).show();
            },
            hide: function() {
                this.$el.hide();
                //this.$el.off();
            }*/
        });
        return new View();
    }
);

