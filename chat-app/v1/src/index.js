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




//PRINTING MESSAGE WHEN A USER CONNECT. 
//Before doing this we need to load the client side sever
//Next we have to create our own client side js file load it and use. This file connect the client and sever side server

io.on('connection', () => {
 console.log('New user connected')
})

sever.listen(3000, (req, res) => {
console.log('Server is runing right')
})