define(
    function () {
     	require.config({
        	baseUrl: "../js",
        	paths: {
		        jquery: "lib/jquery",
		        underscore: "lib/underscore",
		        backbone: "lib/backbone"
    		},
		    shim: {
		        'backbone': {
		            deps: ['underscore', 'jquery'],
		            exports: 'Backbone'
		        },
		        'underscore': {
		            exports: '_'
		        },
		        'backbone_validation' : {
		            deps: ['backbone'],
		            exports: "BackboneValidation"
		        }
		    }
    	});

        var testModules = [
			"ourTests/collections/ScoresTests.js"
		];

		require(testModules, function(){
     		QUnit.load();
     		QUnit.start();
		});
    }
);




