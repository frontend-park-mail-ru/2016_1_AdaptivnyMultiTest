define(
    function (require) {
        'use strict';    
        var apiStatus = require("api/gameStatus");
        var wsEvents = require('api/eventDispatcher');
        
        var URL_ORIGIN = window.location.origin.slice(7);
        console.log(URL_ORIGIN);
        
        return( function() {       
            return {
                initConnection : function() {
                    var webSocket = new WebSocket('ws://' + URL_ORIGIN + '/api/gameplay');
                    this.socket = webSocket;
                    this.bindEvents();
                },

                bindEvents: function() {
                    this.currentStatus = apiStatus;
                    this.socket.onopen = this.onOpen;
                    this.socket.onmessage = this.currentStatus.onMessage; 
                    this.socket.onclose = this.onClose;
                    this.socket.onerror = this.onError;
                },

                onOpen: function() {
                    console.log("Socket is opened");
                },

                onClose: function() {
                    console.log("Socket is closed");
                },
                
                onError:function() {
                    wsEvents.trigger("ConnectionFailed");
                    console.log("Socket has some problems");
                },

                isOpen: function() {
                    return (this.socket !== null);
                },

                send: function(data) {
                    this.socket.send(JSON.stringify(data));
                },

                close: function() {
                    try {
                        this.socket.close();
                    } catch (error) {
                        console.log(error.message);
                    }; 
                }
            }
        })();
});




