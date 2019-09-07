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


  //SOCKET EVENTS

  const message = 'welcome guest'
  let numberOfUsers = 0

  io.on('connection', (socket) => {

  numberOfUsers++
  console.log(`The total number of users are ${numberOfUsers}`)

  //Responding to event from the client
  socket.on('sendMessage', (message) => {
    console.log('woow', message)

    //sending back the results to all users
    io.emit('message', message )
  })

  })

  sever.listen(3000, (req, res) => {
  console.log('Server is runing right')
  })