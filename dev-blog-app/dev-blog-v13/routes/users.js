const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();



//===========
// AUTH ROUTES USERS
//==========

//Register

//1. Get the form
router.get('/users/register/new', (req, res) => {
    res.render('users/register.ejs')
});

//=================
//Registration Logic
//================

router.post('/users', (req, res) => {
    //let newUser = new User({username: req.body.username});
    //eval(require('locus'))
    //req.body contains all the data from the form. We can save the password in our DB incase someone loose his password we can check since we don't have password reset features
  
 //This does not include password
  
    let firstname = req.body.firstname;
    let email = req.body.email;
    //These fields are from passport
    let username = req.body.username;
    let password = req.body.password

    //Build an object for these fields
    const newUser = {
        firstname: firstname,
        email: email,
        username: username,
       
    }
  
    //NOTE THE WHOLE OF newUser contains the user model
    User.register(newUser, password, (err, user) => {
      
      console.log('New user created', newUser)
        if(err){
            console.log('Registration Error', err.message);
            return res.render('/users/register/new')
        }else {
          console.log(user)
            passport.authenticate('local')(req, res, () =>{
               res.redirect('/posts')
            });
        }
    })
  })


  

//Login form
router.get('/users/login/new', (req, res) => {
 
    res.render('users/login.ejs')
   
  })
  
  //Login logic
  router.post('/users/login',passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/'
  }) , (req, res) => {
    
  });
  

  //logout route
  
  router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })



 //Fetching Data for a particular user
 router.get('/users/:id', (req, res) => {
    User.findById(req.params.id).populate('posts').exec((err, userWithPost) => {
        if(err){
            console.log(err)
        }else {
            res.send(userWithPost)
        }
    })
});

//MIDDLEWARE

module.exports = router;