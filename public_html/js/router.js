define(
    [   'backbone',
        'views/main',
        'views/game',
        'views/login',
        'views/scoreboard',
        'nav_event'],
    function (Backbone, main, game, login, scoreboard, nav_event) {
        var Router = Backbone.Router.extend({
            routes: {
                'main': 'mainAction', //'хеш-тег': 'действие'
                'login': 'loginAction',
                'scoreboard': 'scoreBoardAction',
                'game': 'gameAction',
                '*default': 'defaultAction' 
            },

            initialize: function () { //срабатывает всегда, 
                this.currentView = main;
                //подписывается на событие смены роута
                //object.listenTo(other, event, callback)
                //Указывает объекту object прослушивать конкретное событие другого объекта other
                this.listenTo(nav_event, 'navigate', this.changeRoute);
            },
            serviceAction: function (view) { //вспомогательная функция для избежания дублирования строк
                this.currentView.hide(); //гасит текущий вид, hide() описана в BaseView, его наследуют
                //все остальные view
                view.show();
                this.currentView = view;
            },
            mainAction: function () {
                var view = main; //генерирует новый путь того, что нужно отобразить
                this.serviceAction(view);
            },
            loginAction: function () {
                var view = login; 
                this.serviceAction(view);
            },
            scoreBoardAction: function () {
                var view = scoreboard; 
                this.serviceAction(view);
            },
            gameAction: function () {
                var view = game; 
                this.serviceAction(view);
            },
            defaultAction: function () { //отрисовка главного меню во всех иных случаях
                //кнопки Back ссылаются на main
                var view = main;
                this.serviceAction(view);
            },
            changeRoute: function (route) { //меняет роут по результатам нажатия конкретной кнопки
                this.navigate(route, {trigger: true}); //event.trigger описан в  baseView
            }
        });
        return new Router();
    }
);