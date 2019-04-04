console.log("Starting Notes.js");

const fs = require('fs');

var fetNotes = () => {
    try {
        var notesStrings = fs.readFileSync('notes-data.json');
         return JSON.parse(notesStrings);
      }catch(e) {
       return []
    }
};

var saveNotes = (notes) =>{
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var addNote = (title, body) => {
    var notes =  fetNotes();
    var note = {
        title,
        body
    };

     var duplicateNotes = notes.filter((note) => {
         return note.title === title;
     });

     if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
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
