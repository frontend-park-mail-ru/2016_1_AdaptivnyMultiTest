define(
    function (require) {
        var Backbone = require('backbone');
        var tmpl = require('tmpl/main');

        var View = Backbone.View.extend({
            template: tmpl,
        
            initialize: function() {
                $(document.body).append(this.$el);
                this.render();
                this.hide(); //если его не будет, то вначале будут загружаться эти страницы перед загрузкой требуемой
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

