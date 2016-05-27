define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var tmpl = require('tmpl/main');
        var user = require('models/User');
        var session = require('models/Session');
        var game = require('views/game');

        var View = Backbone.View.extend({
            template: tmpl,
      
            user : new user(),
            session : new session(),

            events: {
                 'submit form.js-main__form_signup': 'handleSignup',
                 'submit form.js-main__form_login' : 'handleLogin',
                 'click a.js-main__btn_logout' : 'handleLogout'
            },

            initialize: function() {
                self = this;
                this.user.on('invalid', function (model, error) {
                   console.log(error["emailError"]);
                });

                this.session.on('invalid', function (model, error) {
                    console.log(error["passwordError"]);
                    console.log(error["loginError"]);
                });

                this.listenTo(game, 'UnauthorizedUser', function() {
                    alert("You need log in if you'd like to play multiplayer"); //будет заменен на всплывающее окно с сообщением
                });

        
                this.session.on('change:isLogged', function() {
                    if (self.session.get("isLogged")) {
                        self.viewForLoggedUser();
                    } else {
                       self.viewForUnloggedUser();
                    }
                });
            },

            handleLogout: function(e) {
                e.preventDefault();
                this.session.set({"isLogged" : false});
                this.session.removeSessionStorage(this.session.get("id"));
                this.session.destroy();
                this.viewForUnloggedUser();
            },

            viewForLoggedUser: function() {
                this.$(".js-signup-header").addClass("main__stripe_hidden");
                this.$(".js-login-header").addClass("main__stripe_hidden");
                this.$(".js-logout-header").removeClass("main__stripe_hidden");
            },

            viewForUnloggedUser: function() {
                this.$(".js-signup-header").removeClass("main__stripe_hidden");
                this.$(".js-login-header").removeClass("main__stripe_hidden");
                this.$(".js-logout-header").addClass("main__stripe_hidden");           
            },

            render: function () {
                this.$el.html(this.template());
                this.$('.js-main__menu').on('mouseenter', '.js-main__stripe', function() {
                    $(this)
                        .next()
                            .slideDown(200)
                            .siblings('.js-main__field')
                            .slideUp(200);
                });

                this.$(".js-main__field").filter(function(index) {
                    return index !== 0;
                }).addClass("main__field_hidden");

                return this;
            },

            handleSignup: function(e) {
                e.preventDefault();
                this.user.save(
                    {
                        "login" : this.$( ".js-input_signup_login" ).val(),
                        "email" : this.$( ".js-input_signup_email" ).val(),
                        "password" : this.$( ".js-input_signup_password" ).val()
                    }, {
                    success : function() {
                        alert('success signup');
                    },
                    error : function(model, xhr, options) {
                        if (xhr.status === 403) {
                            alert('this user already exists');
                        }
                    }
                });
            },

            handleLogin: function(e) {
                e.preventDefault();
                var self = this;
                this.session.save(
                    {
                        "login" : this.$(".js-input_login_login").val(),
                        "password" : this.$(".js-input_login_password").val()
                    }, {
                    success : function(model, response, options) {
                        self.session.set({"isLogged" : true});
                        self.session.putInSessionStorage(model.get("id"), model.get("login"));
                        alert('success login');
                    },
                    error : function(model, xhr, options) {
                        if (xhr.status === 400) {
                            alert("this user doesn't exists");
                        }
                        console.log("ANOTHER ERROR");
                    }
                });
            },

            show: function () {
                var self = this;
                this.render();
                this.trigger("show", this);
                this.$el.show();
                this.$(".js-logout-header").addClass("main__stripe_hidden");
                this.session.checkUserLogged().done(function() {
                    self.viewForLoggedUser();
                }).fail(function(){
                    self.viewForUnloggedUser();
                });
            },

            hide: function () {
                this.$el.hide();
                this.$(".js-main__menu").off("mouseenter");
            }
        });
        return new View();
    }
);

