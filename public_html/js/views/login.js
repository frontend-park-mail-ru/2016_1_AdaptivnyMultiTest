define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/login');
        var session = require('models/Session');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            id : "login",

            template: tmpl,
            model: new session(),
            events: {
                'submit .form-login' : 'handleSubmit'
            },

            initialize: function() {
                Backbone.Validation.bind(this, {invalid: function(view, attr, error, selector) {
                        //alert(error);
                    }
                });
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            },

            show: function () {
                this.render();
                this.trigger("show", this);
                this.$el.show();
            },

            hide: function () {
                this.$el.hide();
            },

            handleSubmit: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.model.set({
                    login : this.$el.find( "input[name='login']" ).val(),
                    password : this.$el.find( ":password" ).val(),
                });

            
                if( this.model.isValid(['login', 'password']) ) {
                    this.model.save({}, {     
                        success: function (model, response, options) {
                            alert("success login")
                        },
                        error: function () {
                            alert("This user doesn't exist")
                        } 
                    });
                }
            }
        });
        return new View();
    }
);

