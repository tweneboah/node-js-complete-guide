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
 //console.log('New user connected');

 //Sending data to the newly connected user
 //countUpdated is the name of our events emiting by the server
 socket.emit('countUpdated', count)
})

sever.listen(3000, (req, res) => {
console.log('Server is runing right')
})