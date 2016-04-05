define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/signup');
        var user = require('models/User');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            id: "signup",

            template: tmpl,
            model: new user(),
            events: {
                 'submit .form-signup': 'handleSubmit'
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
                
                this.model.set({
                    login : this.$el.find( "input[type=login]" ).val(),
                    email : this.$el.find( "input[name='email']" ).val(),
                    password : this.$el.find( "input[name='password']" ).val()
                });
              
                if( this.model.isValid(['login', 'password', 'email']) ) {
                    this.model.save({}, {     
                        success: function (model, response, options) {
                            alert("success signup")
                            console.log(response);//id user
                        },
                        error: function () {
                            alert("This user exists")
                        } 
                    });
                } 
            }
        });
        return new View();
    }
);

            