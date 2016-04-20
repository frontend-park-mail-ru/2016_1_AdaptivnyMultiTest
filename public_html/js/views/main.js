define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/main');
        var user = require('models/User');
        var session = require('models/Session');
        var game = require('views/game');

        var View = Backbone.View.extend({
            template: tmpl,
            id: "main",
            
            user : new user(),
            session : new session(),

            events: {
                 'click button#signup': 'handleSignup',
                 'click button#login' : 'handleLogin'
            },

            initialize: function() {
                self = this;
                this.user.on('invalid', function (model, error) {
                    alert(error);
                });

                this.session.on('invalid', function (model, error) {
                    alert(error);
                });

                this.listenTo(game, 'Unauthorized user', function() {
                    alert("Вам нужно авторизоваться"); //будет заменен на всплывающее окно с сообщением
                });
            },

            render: function () {
                this.$el.html(this.template());

                $('dl').on('mouseenter', 'dt', function() {
                    $(this)
                        .next()
                            .slideDown(200)
                            .siblings('dd')
                            .slideUp(200);
                });
                
                $( ".js-main__field" ).filter(function(index) {
                    return index !== 0;
                }).addClass( "js-main__field_hidden" );

                $( ".js-main__stripe" ).hover(
                    function() {
                        $( this ).addClass( "js-main__stripe_hover" );
                    }, 
                    function() {
                        $( this ).removeClass( "js-main__stripe_hover" );
                    }
                );

                $( ".js-btn" ).hover(
                    function() {
                        $( this ).addClass( "js-btn_hover" );
                    }, 
                    function() {
                        $( this ).removeClass( "js-btn_hover" );
                    }
                );

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

