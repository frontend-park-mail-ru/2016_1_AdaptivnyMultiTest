define( //!запускает backbone event, который позже уйдет на trigger роута по кнопкам
	//смотри BaseView и initialise в router
    ['underscore','backbone'] ,
    function (_, Backbone) {
        return _.extend({}, Backbone.Events);
    }
);