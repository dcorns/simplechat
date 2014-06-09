/**
 * Created by dcorns on 6/9/14.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server Port: %d', port);
});

app.use(express.static(__dirname + '/app'));

var users = [];

io.on('connection',function(socket){
  socket.on('message', function(data){
   socket.broadcast.emit('message',{
     user: socket.user,
     msg: data
   });
  });
  socket.on('addclient', function(data){
    socket.user = data;
    users.push(data);
    socket.broadcast.emit('newuser', socket.user);
  });

  socket.on('typing', function () {
    socket.broadcast.emit('typing', socket.user);
  });

  socket.on('nottyping', function () {
    socket.broadcast.emit('nottyping', socket.username);
  });

  socket.on('disconnect', function () {
    if (users.contains(socket.user)) {
      users.splice(users.indexof(socket.user),1);
      socket.broadcast.emit('usergone', socket.user);
    }
  });

});