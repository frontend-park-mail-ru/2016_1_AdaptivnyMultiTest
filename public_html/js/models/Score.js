define(
    function (require) {
        var Backbone = require('backbone');
        var apiSync = require('api/sync');
        
        var Model = Backbone.Model.extend({
	    	defaults: {
	    		login: '',
	    		score: 0
	    	},
    		url: 'api/scores', //url коллекции, где хранятся модели
    		sync: apiSync,

	    	//GET /scores/:id
	    	fetch: function() {
	    		var self = this;
	    		var method = 'read';
	    		var options = {
                	data: JSON.stringify({id : this.id}),
                	success: function(data, textStatus, jqXHR) { // data - данные, который пришли с сервера в формате dataType
                		if(jqXHR.status === 200) {
                			self.set(data); //обновляем данные
                		}
                		self.trigger('sync');
                	},
                	error: function(jqXHR, textStatus, errorThrown) {
                		if(jqXHR.status === 400) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "неверные входные данные");
                		}
                		if(jqXHR.status === 404) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "модель с указанным id не найдена");
                		}
                		self.trigger('error');
                	}
            	}
            	this.sync(method, this, options);
	    	},

	    	//POST /scores
	    	save: function() {
	    		var self = this;
	    		var method = 'create';
	    		var options = {
	    			data: {},//???????????Данные нужно брать из формы?
	    			success: function(data, textStatus, jqXHR) {
	    				if(jqXHR.status === 200) {
                			//to do
                		}
                		self.trigger('sync');
	    			},
	    			error: function(jqXHR, textStatus, errorThrown) {
                		if(jqXHR.status === 400) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "неверные входные данные");
                		}
                		self.trigger('error');
                	}
	    		}
	    		this.sync(method, this, options);
	    	},

	    	//DELETE /scores/:id
	    	destroy: function() {
	    		var self = this;
	    		var method = 'delete';
	    		var options = {
	    			data: JSON.stringify({id : this.id}),
	    			success: function(data, textStatus, jqXHR) {
	    				if(jqXHR.status === 200) {
                			//to do Отправили delete запрос на сервер, получили статус - ОК, как теперь удалить данные  модели на стороне клиента?
                		}
                		self.trigger('sync');
	    			},
	    			error: function(jqXHR, textStatus, errorThrown) {
                		if(jqXHR.status === 400) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "неверные входные данные");
                		}
                		if(jqXHR.status === 404) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "модель с указанным id не найдена");
                		}
                		self.trigger('error');
                	}
	    		}
	    		this.sync(method, this, options);
	    	},

	    	//PUT /scores/:id
	    	update: function() {
	    		var self = this;
	    		var method = 'update';
	    		var options = {
	    			data : {},//??????????????
	    			success: function(data, textStatus, jqXHR) {
	    				if(jqXHR.status === 200) {
                			//to do 
                		}
                		self.trigger('sync');
	    			},
	    			error: function(jqXHR, textStatus, errorThrown) {
                		if(jqXHR.status === 400) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "неверные входные данные");
                		}
                		if(jqXHR.status === 404) {
                			alert(jqXHR.status + " : " + jqXHR.textStatus + " - " + "модель с указанным id не найдена");
                		}
                		self.trigger('error');
                	}
	    		}
	    		this.sync(method, this, options);
	    	}

	    });
	    return Model;  
});

