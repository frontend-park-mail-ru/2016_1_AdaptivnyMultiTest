define(
    ['backbone', 'nav_event'],
    function (Backbone, nav_event) {
        var View = Backbone.View.extend({
            
            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            },
            show: function () {
                $('#page').html(this.el); //добавляет обертку div style для шаблонов
                // Добавляет всем кнопкам вызов события 'navigate'
                // Внутри события передается id кнопки
                 this.$el.find('button').click(function (e) {
                     e.preventDefault(); //гасит встроенные обработчики формы 
                     nav_event.trigger('navigate', $(this).attr('id'));
                 });
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
                // Отключаем прослушку событий
                this.$el.off();
            }
        });
        return View;
    }
);