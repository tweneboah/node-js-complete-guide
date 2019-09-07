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

let count = 7

//PRINTING MESSAGE WHEN A USER CONNECT. 
//Before doing this we need to load the client side sever
//Next we have to create our own client side js file load it and use. This file connect the client and sever side server


//This accept a function and the argument represent the information about the new connection

//If there are 10 connections this function will run 10 times

io.on('connection', (socket) => {

 //INSIDE THIS WE EMIT AND RECEIVE EVENTS

 console.log('New user connected');
 console.log('Another user')
 //Sending data to the newly connected user
 //countUpdated is the name of our events emiting by the server

 //When sending event we use emit but when receiving /displaying the event we use on
 socket.emit('countUpdated', count)

 //RECEIVING EVENTS FROM CLIENT SIDE
 socket.on('increment', () => {
  count++
  //Receiving the event from client and the server sending back another event to the client

  //NOTE:
  //When using socket.emit  (socket.emit('countUpdated', count ))to send event, it's only the particular user who se the update but if you want to show the update to all connected we use io.emit
  
  io.emit('countUpdated', count)
  console.log('from client', count)
})

})

sever.listen(3000, (req, res) => {
console.log('Server is runing right')
})