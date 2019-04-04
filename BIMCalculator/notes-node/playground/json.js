
// let obj = {
//     name: 'Emmanuel'
// };

// let stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// let personString = '{"name" : "Emmanuel", "age": 30}'

// let person = JSON.parse(personString);
// console.log(person.name)

const fs = require('fs');

let originalNote = {
    title: 'Some title',
    body: 'Some body'
};

// originalNoteString
// let originalNoteString = JSON.stringify(originalNote);

// fs.writeFileSync('notes.json', originalNoteString);

// let notesString = fs.readFileSync('notes.json');
// //Note
// let note = JSON.parse(notesString);
// console.log(typeof note);
// console.log(note.body)

const originalNames = {
    title: 'Tweneboah',
    phone: 12037373
}

const originalNamesString = JSON.stringify(originalNames)

fs.writeFileSync('names.json', originalNamesString)

let nameString = fs.readFileSync('names.json');

let names = JSON.parse(nameString);



console.log(originalNames)
console.log(originalNamesString)
console.log(names.phone)