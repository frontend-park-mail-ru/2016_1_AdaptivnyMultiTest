define(
    function (require) {
        
        var apiStatus = require("api/apiGameStatus");
        return( function() {
                    
            return {

                initConnection : function() {
                    var webSocket = new WebSocket('ws://127.0.0.1:8080/api/gameplay');
                    this.socket = webSocket;
                    this.bindEvents();
                },

                bindEvents: function() {
                    this.currentStatus = apiStatus;

                    this.socket.onopen = this.onOpen;
                    this.socket.onmessage = this.currentStatus.onMessage; 
                    //this.socket.onmessage = this.onMessage;
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
                    console.log("Socket has some problems");
                },

                /*onMessage: function(event) {
                    console.log(event.data);
                },*/

                isOpen: function() {
                    return (this.socket !== null);
                },

                send: function(data) {
                    this.socket.send(JSON.stringify(data));
                },

                close: function() {
                    try {
                        this.socket.close();
                    } catch(error) {
                        console.log(error.message);
                    } 
                }
            }
        })();
});




