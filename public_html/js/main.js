require.config({ 
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        backbone_validation: "lib/backbone-validation",
        bootstrap: "lib/bootstrap"
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
        },
        "bootstrap" : { 
            deps :['jquery'] 
        }
    }
});

require([ 'bootstrap','router', 'app']);


