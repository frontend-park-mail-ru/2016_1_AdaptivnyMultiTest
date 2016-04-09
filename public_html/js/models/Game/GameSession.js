define(
    function (require) {
        var Backbone = require('backbone');
        
        var Model = Backbone.Model.extend({
            
            defaults: {
                left : {
                    x : null,
                    y : null
                },
                right : {
                    x : null,
                    y : null
                },
                top : {
                    x : null,
                    y : null
                },
                bottom : {
                    x : null,
                    y : null
                },

                x : null,
                y : null,
                
                redx : null,
                redy : null,
                bluex : null,
                bluey : null                    
            },

            urlRoot: "api/game",
            
            getCustomUrl: function (method) {
                switch (method) {
                    case 'create': //POST -> 
                        return this.urlRoot;
                    case 'update': //PUT -> POST
                        return this.urlRoot;
                    case 'delete': //DELETE
                        return this.urlRoot;
                    case 'patch':
                        return this.urlRoot;
                }
            },
            sync: function (method, model, options) {
                if( method == 'patch' ) {
                    method = "create";
                }
                options || (options = {});
                options.url = this.getCustomUrl(method.toLowerCase());
                return Backbone.sync.apply(this, arguments);
            }
        });
        return Model;  
});


