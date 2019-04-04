
//Loading a module
const logger = require('./logger.js');
logger.log("Hi am noding")

const path = require("path");
const os = require("os");
const fs = require("fs");

const EventEmitter  = require("events");
const emitter = new EventEmitter();

//Register a listener
emitter.on("messageLogged", (eventArg) => {
    console.log("Listener called", eventArg)
})
emitter.emit("messageLogged", {id: 1, url: 'http://'})


let files = fs.readdirSync("./");
//NOTE: Always use async methods, all async takes a callback function

// fs.readdir("./", (err, files) => {
//     if(err) console.log("Error", err);
//     else console.log("Results" , files)
// })
let pathObj = path.parse(__filename)
let freeMemory = os.freemem(); //free memory
let totalMemory = os.totalmem();

//console.log(files);
// console.log(`Your total memory is ${totalMemory} and your free memory is ${freeMemory}. You have used ${totalMemory - freeMemory} `)
// console.log(pathObj)