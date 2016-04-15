define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/main');
        var user = require('models/User');
        var session = require('models/Session');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            template: tmpl,
            id: "main",
            
            user : new user(),
            session : new session(),

            events: {
                 'click #signup': 'handleSignup',
                 'click #login' : 'handleLogin',
                 'click #start' : 'handleStart'
            },

            handleStart: function(e) {
                e.preventDefault();
                this.trigger("start");
            },

            initialize: function() {
                this.user.on('invalid', function (model, error) {
                    alert(error);
                });

                this.session.on('invalid', function (model, error) {
                    alert(error);
                });
            },

            render: function () {
                // Backbone.Validation.bind(this, {
                //     invalid: function(view, attr, error, selector) {
                //         console.log(error);
                //         console.log(attr);
                //         //если поповер существует от предыдущей ошибки
                //         // if( typeof( view.$('#' + attr + 'Error').popover() ) != 'underfined' ) { 
                //         //     view.$('#' + attr + 'Error').popover('destroy'); //рушим его
                //         // }
                //         // view.$('#' + attr + 'Error').popover({
                //         //     content: error,
                //         //     trigger: "manual"
                //         // });
                //         // view.$('#' + attr + 'Error').popover('show');

                //     },
                //     // valid: function(view, attr, error, selector) {
                //     //     //alert('valid');
                //     //     view.$('#' + attr + 'Error').popover('hide');
                //     // } 
                // });

                this.$el.html(this.template());
                
                $('dl').on('mouseenter', 'dt', function() {
                    $(this)
                        .next()
                            .slideDown(200)
                            .siblings('dd')
                            .slideUp(200);
                });
                $( ".main__field" ).filter(function(index) {
                    return index !== 0;
                }).addClass( "main__field_hidden" );
                return this;
            },

            handleSignup: function(e) {
                e.preventDefault();

                data = {
                    "login" : this.$el.find( "#signupLogin" ).val(),
                    "email" : this.$el.find( "#signupEmail" ).val(),
                    "password" : this.$el.find( "#signupPassword" ).val()
                };

                this.user.save(data, {
                    success : function() {
                        alert('success signup');
                    },
                    error : function() {
                        alert('this user already exists');
                    }
                });
            },

            handleLogin: function(e) {
                e.preventDefault();

                data = {
                    "login" : this.$el.find( "#loginLogin" ).val(),
                    "password" : this.$el.find( "#loginPassword" ).val()
                };

                this.session.save(data, {
                    success : function() {
                        alert('success login');
                    },
                    error : function() {
                        alert("this user doesn't exists");
                    }
                });
            },

            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);

