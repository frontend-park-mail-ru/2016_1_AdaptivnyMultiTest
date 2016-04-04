define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/signup');
        var user = require('models/User');
        var BackboneValidation = require('backbone_validation');

        var View = Backbone.View.extend({
            template: tmpl,
            model: new user(),
            events: {
                 'submit .form-signup': 'handleSubmit'
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
                    login : $( "input[type=login]" ).val(),
                    email : $( "input[name='email']" ).val(),
                    password : $( "input[name='password']" ).val()
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

            