define(
    function (require) {
        'use strict';
        var Backbone = require('backbone');
        var currentView = null;
        var View = Backbone.View.extend({
            addViews: function(views) {
                for (var i = 0; i < views.length; i++ ) {
                    $(document.body).append(views[i].el);
                    views[i].hide();
                    this.bindShowEvent(views[i]);
                }
            },
            
            bindShowEvent: function(view) {
                this.listenTo(view, 'show', function(newCurrentView) {
                     changeCurrentView(newCurrentView);
                });
            },
        });


        function changeCurrentView(newCurrentView) {
            if (currentView !== null) {
                currentView.hide();
            }
            currentView = newCurrentView;   
        }

        return new View();
    }
);


// define(
//     function (require) {
//         'use strict';
//         var Backbone = require('backbone');
//         var currentView = null;
//         var View = Backbone.View.extend({
//             addViews: function(views) {
//                 for (var i = 0; i < views.length; i++ ) {
//                     $(document.body).append(views[i].el);
//                     views[i].hide();
//                     this.bindShowEvent(views[i]);
//                 }
//             },
            
//             bindShowEvent: function(view) {
//                 this.listenTo(view, 'show', function(newCurrentView) {
//                      changeCurrentView(newCurrentView);
//                 });
//             }
//         });


//         function changeCurrentView(newCurrentView) {
//             if (currentView !== null) {
//                 currentView.hide();
//             }
//             currentView = newCurrentView;   
//         }

//         return new View();
//     }
// );

