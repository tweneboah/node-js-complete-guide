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


  //BROADCASTING  EVENTS
  //When a user is connected or disconnected message

  //When broadcasting events we send notification to everyone except the client who is just connected/disconnected



  io.on('connection', (socket) => {
    //Broadcasting event
      socket.broadcast.emit('message', 'A new user has joined')

      //When user is disconnected
      socket.on('disconnect', () => {
        io.emit('message', 'A User has left')
      })
  })




  sever.listen(3000, (req, res) => {
  console.log('Server is runing right')
  })