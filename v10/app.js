const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const User = require('./models/User');
const mongoose = require('mongoose');
const app = express();

//Passport Config
const passport = require('passport');
const LocalStrategy = require('passport-local');

app.use(require('express-session')({
  secret: 'ThisIsMyScreteCode',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))



//DB
const url = 'mongodb://localhost/PassportAuthentication'
mongoose.connect( url, {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify: false
})
.then(() => console.log("DB Connected successfully"));


//======
//HOME
//=====

app.get('/', (req, res) => {
  res.render('home')
})



//REGISTRATION

//1.Get the form
app.get('/users/register/new', (req, res) => {
   res.render('register')
})

//RTEGISTRATION LOGIC

app.post('/users/register', (req, res) => {
  //Geting values from form
  let username = req.body.username;
  let password = req.body.password;

  User.register({username:username}, password, (err, user) => {
    if(err){
      console.log(err)
    }else {
     passport.authenticate('local')(req, res, () => {
       console.log(user)
         res.render('registrationSuccess')
     })
    }
  })
 
});

//SECRET PAGE
app.get('/users/secret', (req, res) => {
  res.render('secretPage')
});


//LOGIN FAILED PAGE
app.get('/users/failed', (req, res) => {
  res.render('errorPage')
})


//=======
//LOGIN
//=====

//1. Get the login form
app.get('/users/login/new', (req, res) => {
   res.render('login');
})


//  `LOGIN LOGIC
app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/users/secret',
  failureRedirect: '/users/failed'
}), (req, res) => {
   res.send('login777');
})


//LOGOUT
app.get('/logout', (req, res) => {
   req.logOut();
   res.redirect('/')
})


//SEVER
app.listen(3000, () => {
 console.log(`The server is up and runing`);
})