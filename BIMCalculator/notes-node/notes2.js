console.log('Startinn Notes.js')


var addNote = (title, body) => {
    console.log('Adding notes', title, body);
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
    deleteAll
};














// module.exports.addNote = () => {
//     console.log('AddNote')

//     return 'New note'
// }


// module.exports.add = (a, b) => {
//     return a + b;
// }