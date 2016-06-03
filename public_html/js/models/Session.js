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

        initialize: function() {
            this.userSession = window.sessionStorage;
        },
        
        putInSessionStorage: function(sessionIdUser, userName) {
            this.userSession.setItem(sessionIdUser, userName);
        },

        getAllSessionStorage: function() {
            return this.userSession;
        },

        getSessionStorageById: function(sessionIdUser) {
            return this.userSession.getItem(sessionIdUser);
        },

        removeSessionStorage: function(sessionIdUser) {
            this.userSession.removeItem(sessionIdUser);
        },

        checkUserLogged: function() {
            var deferred = $.Deferred();
            var self = this;
            this.fetch({
                success : function() {
                    deferred.resolve();
                }, error : function(model, xhr, options) {    
                    deferred.reject();
                }
            });
            return deferred.promise();
        },


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
            } 

            if (!attrs.password) {
                errors['passwordError'] = "Please, input your password";
            } else if (attrs.password.length < 5) {
                errors['passwordError'] = 'Your password must have more than 5 characters';
            } 
            return _.isEmpty(errors) ? false : errors;
        }
    });

    return Model;
});
