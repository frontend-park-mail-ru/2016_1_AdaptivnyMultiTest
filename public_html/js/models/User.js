define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
    	defaults: {
    	    id: "",
	    login: "",
	    email: "",
	    password: "",
	},
	urlRoot : "../api/user/",
	getCustomUrl: function (method) {
	switch (method) {
	    case 'read':
	        return this.urlRoot + this.id;
	    case 'update': //создание юзера в БД
	        return this.urlRoot + this.id;
	        break;
	    case 'create':
	        return this.urlRoot;
	    case 'delete': //удаление юзера из БД
	        return this.urlRoot + this.id;
	        break;
	    }
    	},
    	sync: function (method, model, options) {
    	    if (method == "update") 
    	        method = "create"
            options || (options = {});
            options.url = this.getCustomUrl(method.toLowerCase());
            return Backbone.sync.apply(this, arguments);
    	},
	validation: {
    	    login: function(value, attr, computedState) {
	        if( /[^a-zA-Z0-9]/.test(value) ) {
		    return 'Your login must consist of only letters and digits';
		}
		if( value.length === 0 ) {
		    return 'Input your login';
		}
	    },
	    email: {
	        required: true,
	        pattern: 'email',
	        msg: 'Please enter a valid email'
	    },
	    password: {
	        required: true,
      	        minLength: 5,
      	        msg: 'Your password must have more than 5 characters'
	    }
        }
    });
    return Model;
});



