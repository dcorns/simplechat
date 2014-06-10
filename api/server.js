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

app.use(express.static(__dirname + '/../app'));

var users = [];

io.on('connection',function(socket){
  console.log('client connected');
  socket.on('message', function(data){
    console.dir(data);
   socket.broadcast.emit('message',data);
    socket.emit('message',data);
  });
  socket.on('addclient', function(data){
    socket.user = data;
    users.push(data);
    console.log(users);
    socket.broadcast.emit('newuser', users);
    socket.emit('newuser',users);
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
    if (users.indexOf(socket.user)) {
      users.splice(users.indexOf(socket.user),1);
      socket.broadcast.emit('usergone', users);
    }
  });

});