define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/login');
        var session = require('models/Session');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            template: tmpl,
            model: new session(),
            events: {
                'submit .form-login' : 'handleSubmit'
            },

            initialize: function() {
                $(document.body).append(this.$el);
                this.render();
                Backbone.Validation.bind(this, {invalid: function(view, attr, error, selector) {
                        alert(error);
                    }
                });
                this.hide();
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            },

            show: function () {
                this.trigger("show");
                this.$el.show();
            },

            hide: function () {
                this.$el.hide();
            },

            handleSubmit: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.model.set({
                    login : $( "input[name='login']" ).val(),
                    password : $( ":password" ).val(),
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

