//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const encrypt = require('mongoose-encryption');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const app = express();

console.log(process.env.SECRET)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');



//CONNECTING TO DATABASE

mongoose.connect('mongodb://127.0.0.1:27017/users-DB', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });



//USER SCHEMA
const userShema = mongoose.Schema({
    password: {
        type: String,
    },
    email: {
        type: String
    }
});

//MOMGOOSE ENCRYPTION

//Mongoose will encrypt when you call save and decrypt when you call find
// const secret= 'ThisIsMyLittleSecret'; //This is use to encrypt the password
// userShema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});


//MODEL
const User = mongoose.model('User', userShema);



app.get('/', (req, res) => {
    res.render('home');
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, (error, hash)=> {
            //Creating a user
    const newUser = new User ({
        email: req.body.username,
        password: hash
    })
   //Saving to the DB
   newUser.save ((err, saved) => {
       if(err) {
           console.log(err)
       }else {
           console.log(saved)
           res.render('secrets')
       }
   })
     
    });

})

//Login ROUTE
app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username}, (err, foundUser) => {
        if(err) {
            console.log(err)
        }else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password, (error, results) => {
                   if(results === true){
                   
                   }
                })
                   
                res.render('secrets')  
            }
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('The server is runnning on port 3000')
});



const studentsSchema = mongoose.Schema({
    firstName: {
        type: String
    }
})