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


  //SHARING LOCATION


  io.on('connection', (socket) => {
    //RECEIVING EVENT FROM CLIENT
    socket.on('sendLocation', (coords) => {
      //sending back the response to all the connected clients
      io.emit('myLocation',  `Location: https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
     
    })
  })



//SERVER
  sever.listen(3000, (req, res) => {
  console.log('Server is runing right')
  })