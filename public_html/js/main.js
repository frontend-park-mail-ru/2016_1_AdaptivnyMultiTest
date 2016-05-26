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

require([ 'bootstrap','router'/*, 'app'*/]);


// require.config({ 
//     baseUrl: "js",
//     paths: {
//         jquery: [
//                 //"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min", 
//                 "lib/jquery"
//         ],
//         underscore: [
//                 //"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min", 
//                 "lib/underscore"
//         ],
//         backbone: [
//                 //"https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
//                 "lib/backbone"
//         ],
//         bootstrap: [
//                 //"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min",
//                 "lib/bootstrap"
//         ]
//     },
//     shim: {
//         'backbone': {
//             deps: ['underscore', 'jquery'],
//             exports: 'Backbone'
//         },
//         'underscore': {
//             exports: '_'
//         },
//         "bootstrap" : { 
//             deps :['jquery'] 
//         }
//     }
// });

// require([ 'bootstrap','router'/*, 'app'*/]);






