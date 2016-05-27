define(['backbone'], function(Backbone) {
    'use strict';
    var Backbone = require('backbone');
    var Model = Backbone.Model.extend({
        defaults: {
            id : "",
            login: "",
            password: "",
            isLogged : false
        },
        
        urlRoot : "api/session",
        
        sync: function (method, model, options) {
            if (method === "create") {
                method = "update";
            }
            options || (options = {});
            options.url = this.urlRoot;
            arguments[0] = method;

            return Backbone.sync.apply(this, arguments);
        },

        validate: function(attrs, options) {
            var errors = {};
            if (!attrs.login) {
                errors['loginError'] = "Please, input your login";
            } else if (/[^a-zA-Z0-9]/.test(attrs.login)) {
                errors['loginError'] = 'Your login must consist of only letters and digits';
            } else {
                errors['loginError'] = '';
            }

            if (!attrs.password) {
                errors['passwordError'] = "Please, input your password";
            } else if (attrs.password.length < 5) {
                errors['passwordError'] = 'Your password must have more than 5 characters';
            } else {
                errors['passwordError'] = '';
            }
            
            return errors;
        }
    });

    return Model;
});
