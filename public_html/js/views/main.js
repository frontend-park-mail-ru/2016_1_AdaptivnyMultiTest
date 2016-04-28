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
                    alert("Вам нужно авторизоваться");
                });
                this.$el.html(this.template());
            },

            render: function () {
                this.$el.html(this.template());

                $('.js-main__menu').on('mouseenter', '.js-main__stripe', function() {
                    $(this)
                        .next()
                            .slideDown(200)
                            .siblings('.js-main__field')
                            .slideUp(200);
                });

                $(".js-main__field").filter(function(index) {
                    return index !== 0;
                }).addClass("js-main__field_hidden");

                $( ".js-main__stripe" ).hover(
                    function() {
                        $(this).addClass("js-main__stripe_hover");
                    }, 
                    function() {
                        $(this).removeClass("js-main__stripe_hover");
                    }
                );

                $(".js-btn").hover(
                    function() {
                        $(this).addClass("js-btn_hover");
                    }, 
                    function() {
                        $(this).removeClass("js-btn_hover");
                    }
                );
                return this;
            },

            handleSignup: function(e) {
                e.preventDefault();
                this.user.save(
                    {
                        "login" : this.$el.find( "#signupLogin" ).val(),
                        "email" : this.$el.find( "#signupEmail" ).val(),
                        "password" : this.$el.find( "#signupPassword" ).val()
                    }, {
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
                this.session.save(
                    {
                        "login" : this.$el.find( "#loginLogin" ).val(),
                        "password" : this.$el.find( "#loginPassword" ).val()
                    }, {
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
                $(".js-main__menu").off("mouseenter");
                $(".js-main__stripe").off("mouseenter mouseleave");
                $(".js-btn").off("mouseenter mouseleave");
            }
        });
        return new View();
    }
);

