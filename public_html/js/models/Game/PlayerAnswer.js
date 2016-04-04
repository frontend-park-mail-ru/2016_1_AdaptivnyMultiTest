define(
    function (require) {
        var Backbone = require('backbone');
        
        var Model = Backbone.Model.extend({
	    	defaults: {
	    		question: '',
	    		answer: ''
	    	},
	    	urlRoot : "api/game",
		
			getCustomUrl: function (method) {
		        switch (method) {
		            case 'create': 
		                return this.urlRoot;
		                break;
		            case 'update':
		            	return this.urlRoot;
		        }
	    	},
	    	sync: function (method, model, options) {
	    		if( method === "update" ) 
	    			method = "create";
	        	options || (options = {});
	        	options.url = this.getCustomUrl(method.toLowerCase());
	        	return Backbone.sync.apply(this, arguments);
	    	}
	    });
	    return Model;  
});


