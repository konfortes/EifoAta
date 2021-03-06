(function(updater) {
   var socketio = require('socket.io');
   var _ = require('underscore');
   var connectedUsers = [];
   var connectedSockets = [];
   updater.init = function(server) {
      var io = socketio.listen(server);
      io.on('connection', function(socket) {
         console.log('socket ' + socket.id + ' has just connected');
         connectedSockets.push(socket);

         socket.on('disconnect', function() {
            console.log('socket ' + socket.id + ' disconnected');
            connectedSockets.splice(connectedSockets.indexOf(socket), 1);
         });

         socket.on('location update', function(location) {
            console.log('the user ' + location.userName + ' has just updated location');
            if (connectedUsers.indexOf(location.userName) == -1) {
               connectedUsers.push(location.userName);
            }
            //io.emit('location update', location);
            socket.broadcast.emit('location update', location);
         });

         socket.on('message', function(msg) {
            console.log('the user ' + msg.userName + ' has just sent the message:' + msg.text);
            io.emit('message', msg);
         });
      });
   };
})(module.exports);



