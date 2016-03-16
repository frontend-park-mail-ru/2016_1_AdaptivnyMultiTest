define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
    	defaults: {
			login: "",
			email: "",
			password: "",
		},
		validation: {
    		/*login: {
      			required: true,
      			minLength: 4,
      			msg: "Your login must have more than 4 characters"
    		},*/
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
      			minLength: 8,
      			msg: 'Your password must have more than 8 characters'
		    }
		},
		sendSignup: function() {
			$.ajax({
			  url:  "/api/user/",
			  type: "POST",
			  data: this.toJSON(),
			  dataType: 'json',
			  success: function() {
			  	alert("success signup");
			  },
			  error: function() {
			  	alert("error signup");
			  },
			});
		},
		sendLogin: function() {
			console.log(this.toJSON());
			$.ajax({
			  url:  "/api/session/",
			  type: "POST",
			  data: this.toJSON(),
			  dataType: 'json',
			  success: function() {
			  	alert("success login");
			  },
			  error: function() {
			  	alert("error login");
			  }
			});
		}
    });
    return Model;
});







