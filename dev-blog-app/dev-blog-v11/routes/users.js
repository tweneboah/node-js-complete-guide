const express = require('express');
const User = require('../models/User');
const router = express.Router();




//===========
//USERS
//==========

//Register

//1. Get the form
router.get('/users/new', (req, res) => {
    res.render('users/register.ejs')
});

//2. Registration Logic
router.post('/users', (req, res) => {
    //values from the form
    let firstname = req.body.firstname;
    let email = req.body.email;
    User.create({firstname, email}, (err, user) => {
        if(err){
            console.log(err)
        }else{
            console.log(user)
        }
    })
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
})


module.exports = router;