define(['backbone'], function(Backbone) {
    'use strict';
    var Backbone = require('backbone');
    var Model = Backbone.Model.extend({
        defaults: {
            login: "",
            email: "",
            password: "",
        },
        
        urlRoot : "api/user",
       
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
            var errors = [];
            if (/[^a-zA-Z0-9]/.test(attrs.login)) {
                errors.push('Your login must consist of only letters and digits');
            }
            if (!attrs.login) {
                errors.push("Please, input your login");
            }
            if (!attrs.email) {
                errors.push("Please, input your email");
            }
            if (!attrs.password) {
                errors.push("Please, input your password");
            }
            if (attrs.password.length < 5) {
                errors.push('Your password must have more than 5 characters');
            }
            if (!attrs.email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{1,}\.[a-z]{2,}$/i)) {
                errors.push("Please, input a valid email");
            }

            return errors.length > 0 ? errors : false;
        }
    });

    return Model;
});