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


  //EVENT ACKNOWLEDGEMT

  //This is a message send to the only connected user that his/her message has been sent
  //NOTE:
  // When server emit an event and the client received, then the client will send acknowledgement to the server that the event was received and vice-versa

  //The emit functions takes in 3 arguements; 
  //1.The name of the event
  //The data sending
  //A function that sends acknowledgement


  io.on('connection', (socket) => {
    //RECEIVING EVENT FROM CLIENT
    socket.on('sendLocation', (coords) => {
      //sending back the response to all the connected clients
      io.emit('myLocation',  `Location: https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
     
    });

    //For acknowledgement, we pass a second argument as a callback to socket.io
    socket.on('sendMessage', (message, callback) => {
      //Sending the message back to all users
      io.emit('message', message)
      callback('Was delivered') //Sending acknowledgemt. You can also pass data to the callback
      
    })
  })



//SERVER
  sever.listen(3000, (req, res) => {
  console.log('Server is runing right')
  })