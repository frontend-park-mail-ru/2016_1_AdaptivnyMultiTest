define(
    function () {
    
         var methodMap = {
            'create': 'POST',
            'update': 'PUT',
            'patch':  'PATCH',
            'delete': 'DELETE',
            'read':   'GET'
        };


        return  function(method, model, options) {
            var type = methodMap[method];
            var params = {type: type, dataType: 'json'};
            if (!options.url) {
                params.url = _.result(model, 'url') || urlError();
            }
            options = _.extend(options, params)
            //return $ajax(_.extend(params, options));
        }
});

/*
if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.call(options.context, xhr, textStatus, errorThrown);
    };

var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
*/