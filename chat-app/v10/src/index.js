  const path = require('path');
  const express = require('express');
  const socketio = require('socket.io');
  const http = require('http');

  const app = express();
  const sever = http.createServer(app)
  //CONFIG SOCKET
  const io = socketio(sever)//Socket requires to pass the core http sever
  const publicDirectoryPath = path.join(__dirname, '../public/')
  app.use(express.static(publicDirectoryPath))




  io.on('connection', (socket) => {
    //CREATING WELCOME MESSAGE
    socket.emit('welcomeMessage', 'You are welcome to our chat')

    //EVENT WHEN A NEW USER JOIN THE CHAT
    socket.broadcast.emit('alertMessageWhenUserJoin', 'A new user has joined');


    //EVENT WHEN A USER IS DISCONNECTED
    socket.on('disconnect', () => {
      io.emit('disconnectedMessage', 'A User has left')
    })


    //RECEIVING EVENT FROM CLIENT
    socket.on('sendLocation', (coords) => {
      //sending back the response to all the connected clients
      io.emit('myLocation',  `Location: https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
     
    });



    //For acknowledgement, we pass a second argument as a callback to socket.io
    socket.on('sendMessage', (message, callback) => {
      //Sending the message back to all users
      io.emit('messageFromForm', message)
      callback('Was delivered') //Sending acknowledgemt. You can also pass data to the callback
      
    })
  })




//SERVER
  sever.listen(3000, (req, res) => {
  console.log('Server is runing right')
  })