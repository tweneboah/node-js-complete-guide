console.log("Starting Notes.js");

const fs = require('fs');

var addNote = (title, body) => {
    var notes =  [];
    var note = {
        title,
        body
    };

    try {
        var notesStrings = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesStrings);
    }catch(e) {
       
    }


     var duplicateNotes = notes.filter((note) => {
         return note.title === title;
     });



     if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes))
    }
  
};





var getAll = () => {
  console.log('Getting all notes')
};

let deleteAll = () => {
  console.log('Delete All')
}

var getNote = (title) => {
  console.log('Getting note', title)
};
 var removeNote = (title) => {
     console.log('Removing note', title)
 }
module.exports = {
    addNote: addNote,
    getAll: getAll,
    removeNote: removeNote,
    getNote: getNote
    
};
