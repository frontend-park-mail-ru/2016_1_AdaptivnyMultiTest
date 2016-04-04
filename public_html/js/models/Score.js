define(
    function (require) {
        var Backbone = require('backbone');
        
        var Model = Backbone.Model.extend({
            defaults: {
            	id: '',
                login: '',
                score: 0
            },
            urlRoot: "api/scores",

            getCustomUrl: function (method) {
                switch (method) {
                    case 'read':
                        return this.urlRoot + this.id;
                }
            },
            sync: function (method, model, options) {
                options || (options = {});
                options.url = this.getCustomUrl(method.toLowerCase());
                return Backbone.sync.apply(this, arguments);
            },
        });
        return Model;  
});


