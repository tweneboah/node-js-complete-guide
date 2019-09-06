

//=======================
//FILE SYSTEM
//=======================

const express = require('express');
const app = express();
const fs = require('fs');

//=======================
//FILE SYSTEM
//=======================

//Reading file from text file. This is asynchronous
const data1 = fs.readFileSync(__dirname + '/docs/data.txt', 'utf8');
console.log('From data1', data1);


//Reading file synchronously. To make it asynchronous we pass a callback as a second argument;
 fs.readFile(__dirname + '/docs/data.txt', 'utf8' ,(err, doc) => {
   console.log(`From data2 ${doc}`)
});


//Sometimes the files to read will be large and this can affect performance so to avoid this we use streams and buffers

//==========
//BUFFERS & STREAMS
//==========

/*  
  This is a temporal storage of data either in a chunck/bulk or bit by bit to improve performace but for fs.readfileSync  it displays the data at once so in case there are large files this can affect performance
 */

//===========
//READING FILES USING BUFFERS 
//============

const myReaderbleStreams =  fs.createReadStream(__dirname + '/docs/bigData.txt', {encoding: 'utf8'});
//The data variable is required and all the files read will be stored into dataChunck
myReaderbleStreams.on('data', (dataChunck) => {
  console.log('Chunck received',dataChunck)
})


//=================
//CREATING A FILE AND PUT/COPY THE DATA GOT FROM myReaderbleStreams
//=================

 const myReaderbleStreams2 =  fs.createReadStream(__dirname + '/docs/bigData.txt', {encoding: 'utf8'});

//copying information from this file and paste it itno another file
const myWriterbleStream = fs.createWriteStream(__dirname + '/docs/copiedFile1.txt');

 myReaderbleStreams2.on('data', (dataChunck) => {
  myWriterbleStream.write(dataChunck)
   console.log('Chunck received',dataChunck);

 })


 //=============
 //PIPE
 //===========

/*
   This is use to connect  multiple streams together. One of the most common example is to pipe the read and write stream together for the transfer of data from one file to the other. 

    Attachimg readerbleStream to WritableStream
*/

//============
//REFACTORING THE ABOVE CODE USING PIPE
//==========

//STEPS

//1. Create the the readerbale stream
const myReaderbleStreams3 = fs.createReadStream(__dirname + '/docs/bigData.txt', {encoding: 'utf8'});

//2. Creating the writableStream 
const myWriterbleStream3 = fs.createWriteStream(__dirname + '/docs/copiedFile2.txt');

//2. Piping the two

myReaderbleStreams3.pipe(myWriterbleStream3)









app.listen(3000, () => {
 console.log(`The server is up and runing`);
})