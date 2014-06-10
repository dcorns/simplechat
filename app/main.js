/**
 * Created by dcorns on 6/9/14.
 */
'use strict';

$(function(){

  var users=[], user = '';
  var socket = io();

  function setUser() {
    user = $('#userinput').val().trim();
    $('#inputlabel').text('Enter message:');
    $('#btn').hide();
    socket.emit('addclient', user);
  }

  var chat = (function() {
    var msg = $('#userinput').val();
    socket.emit('message', msg);
  });






  socket.on('message', function(data){
    console.log('message'+data);
    $('.messages').append('data.user says, '+data.msg);
  });

  socket.on('newuser', function(data){
    console.log('newuser'+data);
    users.push(data);
    console.log(users);
    $('.userList').append(data);
  });

  socket.on('usergone', function(data){
    console.log('usergone'+data);
    $('.userList').replaceWith(data);
  });

});