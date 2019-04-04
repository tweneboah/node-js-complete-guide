
console.log('Starting app.js');
const fs = require('fs');
const notes = require('./notes.js');
const yargs = require('yargs'); //Yargs work same as process yargs.argv = process.argv 

const argv = yargs.argv
let command = process.argv[2]; //our input which falls on third array
console.log(process.argv)// This hold all our command input

console.log('Command', command);
console.log("Process", process.argv);
console.log("yargs", argv) //This gives our output an object so to access any property you need to use argv.something, the something will come from the user/terminal

if(command === 'add') {
    //console.log('Adding notes');
    let note = notes.addNote(argv.title, argv.body)
    if(note) {
        console.log('Note created')
        console.log('--');
        console.log(`Title: ${note.title}`)
        console.log(`Body: ${note.body}`)
    }else{
         console.log('Note title taken');
       
    }
}else if(command === "list") {
    notes.getAll();
}else if (command === "remove") {
    notes.removeNote(argv.title)  
}else if(command === "read") {
    notes.getNote(argv.title)
}
else{
    console.log("command note recognised");
}