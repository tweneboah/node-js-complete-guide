const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.set('view engine', 'ejs');

//REQUIRING EXPRESS SESION AND USE IT
//The function requires an object secret which is use to decode and encode sessions
//All these properties are built in
app.use(require('express-session')({
    secret: 'my name is emma',
    resave: false,
    saveUninitialized: false
}));

//REQUIRING USER MODEL
const User = require('./models/users');

//==============
//CONFIGURING EXPRESS
//==================

//TELLING EXPRESS TO USE PASSPORT
//We need these anytime we use passport
app.use(passport.initialize());
app.use(passport.session());

//BODY PARSER
app.use(bodyParser.urlencoded({extended: true}));


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //decoding user
passport.deserializeUser(User.deserializeUser()); //Encoding user

//CONNECTING TO DATABASE

mongoose.connect('mongodb://127.0.0.1:27017/Athentication', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });

//ROUTES

//HOME
app.get('/', (req, res) => {
    res.render('home')
})




//AUTH ROUTES

//SHOW SIGN UP FORM
app.get('/register', (req, res) => {
  res.render('register')
})

//HANDLING USER SING UP
//Since the form directed us to this form we can access all the input field under req.body

//Here we have to create instance of the user model and save it DB

//We have to configure body-parser above so that we can access the input field under req.body

//User.register(), The user is the model and the register is the function for passport
//.register() takes in the instance of the the 1. Usermodel/ user object and we pass in the username only because we don't save password into database. at this point is not save into database yet 2. The password field as the second argument to user.register() and this will take username and password and hash it and save it into the database  3. callback function. When everything goes well the callback function will return the user with username and hashed password

//When everything went well then it will move to passport.authenticate() for authentication and if everything goes well it will move to the desire page

//When everything goes well it save into Database
app.post('/register' ,(req, res) => { 
     req.body.username
     req.body.password 
     User.register( new User({username: req.body.username}), req.body.password, (err, user) => {
         if(err) {
             console.log(err)
             return res.render('register');
         }
         passport.authenticate('local')(req, res, ()=> {
             res.redirect('/secret')
         })
     })
})


//=======
//LOGIN ROUTE
//==========

//Render login form
app.get('/login', (req, res) => {
    res.render('login')
})

//Login logic

app.post('/login',passport.authenticate('local', { 
     successRedirect: '/secret',
     failureRedirect: '/login'
     
 }),(req, res) => {
   
})

//LOGOUT
//This simple. It doesnt new a form  what it need is a link

app.get('/logout', (req, res) => {
    req.logOut() //This only closes user sessions this means after logging out you can still visit some pages so to avoid this we have to add our own middleware. So we have to do it on the page we want to avoid to visit after logging out
    res.redirect('/')
})

//Middleware function - isLoggedIn after that we pass this to the secret page route
const isLoggedIn = (req, res, next)=> {
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect('/login')
}

//Secret Route
app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret')
})



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})