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
                 'submit form#signup': 'handleSignup',
                 'submit form#login' : 'handleLogin'
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
                    alert("You need log in if you'd like to play multiplayer"); //будет заменен на всплывающее окно с сообщением
                });

                $(document).on("suggestionToPlay", function (evt) {
                    alert(evt.message);
                });
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
                        "login" : this.$el.find( "#signupLogin" ).val(),
                        "email" : this.$el.find( "#signupEmail" ).val(),
                        "password" : this.$el.find( "#signupPassword" ).val()
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
                this.session.save(
                    {
                        "login" : this.$el.find( "#loginLogin" ).val(),
                        "password" : this.$el.find( "#loginPassword" ).val()
                    }, {
                    success : function() {
                        alert('success login');
                    },
                    error : function(model, xhr, options) {
                        if (xhr.status === 400) {
                            alert("this user doesn't exists");
                        }
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
                this.$(".js-main__menu").off("mouseenter");
            }
        });
        return new View();
    }
);



