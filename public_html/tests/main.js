require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        backbone_validation: "lib/backbone-validation"
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
            exports: 'backbone_validation'
        }
    }
});

var tests = [
     'collections/Scores.test',
     'views/viewManager.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});
