const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//DB CONNECTION
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/DB-Association-Reference-Method'


mongoose.connect( DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
}).then(() => console.log("DB Connected successfully"));

//======================
//EMBEDED ASSOCIATION
//======================

 //POST MODEL
const postSchema = new mongoose.Schema({
    title: String,
    text: String

 });
 const Post = mongoose.model('Post', postSchema);

// //USERS MODEL
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});
const User = mongoose.model('User', userSchema);


//A user creating a post which belong to that user

//First we will create a user and then we will search the user either by email and then

 //Creating a user
 const newUser = new User({
     email: "atom",
     name: "Emmanuel"
  });

newUser.save((err, user) => {
    console.log(user)
});


//Creating post and associate it to the user

Post.create({
    title: 'Worked',
    text: 'WOOOOOW'
}, (err, postCreated) => {
    if(err){
        console.log(err)
    }else {
        //Find the user
        User.findOne({email: 'atom'}, (err, foundUser) => {
            if(err){
                console.log(err)
            }else{
                //Push the post into user's post array
                foundUser.posts.push(postCreated);
                //save the user and it will save the post
                foundUser.save((err, postCreatedWitUser) => {
                    if(err){
                        console.log(err)
                    }else {
                        console.log(postCreatedWitUser)
                    }
                })
            }
        })
    }
})


//fetching post for a particular user
User.findOne({email: 'atom'}, (err, foundUser) => {
    if(err){
        console.log(err)
    }else {
        //The post here is what represent our post in the user's model
        foundUser.populate('posts').execPopulate((err, user) => {
            if(err){
                console.log(err)
            }else {
                console.log(user)
            }
        })
    }
})

//SERVER
const PORT = process.env.PORT || 8000
app.listen(PORT,() => {
    console.log(`The Server is runing on port ${PORT}`)
});

