
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


//Connectiing to DB
mongoose.connect('mongodb://127.0.0.1:27017/Contact-Manager-DB', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });


//PERSONS SCHEMA
const personSchema = mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    marriage: {
        type: Boolean
    }
});

//PERSONS MODEL
const Persons = new mongoose.model('Contact', personSchema);

//Creating real person
const EmmanuelDetails = new Persons({
    name: 'Emmanuel Twenebaoh',
    age: 30,
    marriage: false
});


const PrincelDetails = new Persons({
    name: 'Prince Tweneboah',
    age: 34,
    marriage: true
});


const ThomaslDetails = new Persons({
    name: 'Thomas Tweneboah',
    age: 32,
    marriage: true
});

const AgnesDetails = new Persons({
    name: 'Agens Twenebaoh',
    age: 30,
    marriage: false
});
//Saving to DB
//EmmanuelDetails.save()
// PrincelDetails.save();
// ThomaslDetails.save();
// ThomaslDetails.save();
// AgnesDetails.save();

app.get('/', (req, res) => {
    
    let today = new Date();
 
    let options = {
         weekday: 'long',
         day: 'numeric',
         month: 'long'
    };
    let day  = today.toLocaleString('en-US', options);

    res.render('contacts', {kindOfDay: day})
    
});





app.listen(3000, (req, res) => {
    console.log('The server is running on port 3000')
})