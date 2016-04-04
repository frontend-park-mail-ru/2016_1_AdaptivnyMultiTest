define(
    function (require) {
        var Backbone = require('backbone');
        
        var Model = Backbone.Model.extend({
	    	defaults: {
	    		id: '',
	    		login: '',
	    		theme: '',
	    		gameScore: 0,
	    		questionsNum: 0,
				questions: [],
				//playerAnswers: []
	    	},
	    	urlRoot : "api/game",
		
			getCustomUrl: function (method) {
		        switch (method) {
		            case 'read': 
		                return this.urlRoot;
		                break;
		            case 'update':
		            	return this.urlRoot;
		            	break;
		        }
	    	},
	    	sync: function (method, model, options) {
	    		if( method === "patch" ) 
	    			method = "update"
	        	options || (options = {});
	        	options.url = this.getCustomUrl(method.toLowerCase());
	        	return Backbone.sync.apply(this, arguments);
	    	},
	    });

        /*var gameSessionModel = new Model(
        {
        	idGameSession: 1,
	    	login: "Знаток",
	    	theme: 'География',
	    	gameScore: 5,
	    	questionNum: 5,
	    	questions: [{id : 15, title : "Кто открыл Америку?", 
	    				options : ["Кук", "Америго Веспуччи", "Колумб", "Магеллан"]},

	    				{id : 17, title : "В каком году Магеллан совершил кругосветное плавание?", 
	    				options : ["1521", "1519", "1522", "1526"]},

	    				{id : 27, title : "Назовите 3-ю по территории государство мира?", 
	    				options : ["Канада", "Китай", "Бразилия", "США"]},

	    				{id : 87, title : "Столица Уэльса?", 
	    				options : ["Кардифф", "Дублин", "Белфаст", "Эдинбург"]},

	    				{id : 79, title : "Страна, в которой больше всего часовых поясов?", 
	    				options : ["США", "Россия", "Китай", "Франция"]}
	    			   ],
			playerAnswers: [{id : 17, answer : "1522"}]
        });
       
        return gameSessionModel;*/
        /*var gameSessionModel = new Model(
        {
        	id: 1,
	    	login: "Знаток",
	    	theme: 'География',
	    	gameScore: 5,
	    	questionsNum: 5,
	    	questions: [{id : 15, text : "Кто открыл Америку?", theme : "География",
	    				answer1 : "Кук", answer2 : "Америго Веспуччи", answer3 : "Колумб", answer4: "Магеллан"},

	    				{id : 17, text : "В каком году Магеллан совершил кругосветное плавание?", theme : "География",
	    				answer1: "1521", answer2 : "1519", answer3 : "1522", answer4 :"1526"},

	    				{id : 27, text : "Назовите 3-ю по территории государство мира?", theme : "География",
	    				answer1: "Канада", answer2: "Китай", answer3: "Бразилия", answer4: "США"},

	    				{id : 87, text : "Столица Уэльса?", theme : "География",
	    				answer1: "Кардифф", answer2: "Дублин", answer3: "Белфаст", answer4: "Эдинбург"},

	    				{id : 79, text : "Страна, в которой больше всего часовых поясов?", theme : "География",
	    				answer1 : "США1111", answer2 : "Россия", answer3 : "Китай", answer4 : "Франция"}
	    			   ],
			playerAnswers: [{question : 17, answer : "1522"}]
        });
       
        return gameSessionModel;*/
	    return Model;  
});


