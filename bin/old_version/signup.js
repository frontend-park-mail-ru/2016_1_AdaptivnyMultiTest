define(['backbone', 'tmpl/signup', 'models/User', 'backbone_validation'], function (Backbone, tmpl, user, BackboneValidation) {
        var View = Backbone.View.extend({
           //el: '#page',
            template: tmpl,
            //model: new user(),
            events: {
                 'click button #login123': 'toLogin'
                 //'click #login-form': 'handleSubmit'
            },
            initialize: function() {
                this.render();
                // Backbone.Validation.bind(this, {invalid: function(view, attr, error, selector) {
                //         alert(error);
                //     }
                // });
            },
            render: function () {
                this.$el.html(this.template());
            },
            toLogin: function(e) {
                console.log("hidd");
                //e.preventDefault();
                event.originalEvent.defaultPrevented();
                window.location.hash = "main";
            }
            // toMenu: function(e) {
            //     e.preventDefault();
            //     window.location.hash = "main";
            // },
            // handleSubmit: function(e) {
            //     e.preventDefault();

            //     this.model.set({
            //         login : $( ":text" ).val(),
            //         password: $( ":password" ).val(),
            //     });
            //     if( this.model.isValid(['login', 'password']) ) {
            //         e.currentTarget.submit();
            //         this.model.sendLogin();
            //     } else {
            //         this.model.destroy();
            //     }
            // },
        });
        return new View();
    }
);

