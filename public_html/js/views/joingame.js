define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/joingame');

        var View = Backbone.View.extend({
            template: tmpl,

            initialize: function() {
                $(document.body).append(this.$el); //обращемся к DOM-элементу тега body и добавляем к нему DOM - обертку нашей вьюхи
                this.render();
                this.hide();
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            },

            show: function () {
                this.trigger("show");
                this.$el.show();
            },
            
            hide: function () {
                this.$el.hide();
            }
        });
        return new View();
    }
);







