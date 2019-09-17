const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//DB CONNECTION
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/DB-Association-embed-Method'


mongoose.connect( DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
}).then(() => console.log("DB Connected successfully"));

//======================
//EMBEDED ASSOCIATION
//======================

// //USERS MODEL
const postSchema = new mongoose.Schema({
    title: String,
    text: String

                                                });
 const Post = mongoose.model('Post', postSchema);

// //USERS MODEL
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});
const User = mongoose.model('User', userSchema);


//A user creating a post which belong to that user

//First we will create a user and then we will search the user either by email and then

 //Creating a user
 const newUser = new User({
     email: "atom",
     name: "Emmanuel"
  });

// newUser.save((err, user) => {
//     console.log(user)
// });




 //Find user and create post Method 1

//For this style of creating notes posts for the user, the post we are creating won't get save into the post model but it will save into the user post array

User.findOne({email:'atom'}, (err, user) => {
    if(err){
        console.log(err)
    }else{
       user.posts.push({
        title: "3 Things I really hate9999",
         text: "Voldemort.  Voldemort. Voldemort999"
        
       }, (err, data) => {
           if(err){
               console.log(err)
           }else{
            user.save((err, userWithPost) => {
                if(err){
                    console.log(err)
                }else {
                    userWithPost.save();
                    console.log(userWithPost)
                }
            })
           }
       })

    }
});



 //Find user and create post Method 2

//For this stle of creating notes posts for the user, the post we are creating will get save into the post model and the user's post object as well


Post.create({
    title: "How to cook the best burger pt. 4BBBBB",
    text: "AKLSJDLAKSJDBBBBB"
  }, function(err, post){
      User.findOne({email: "atom"}, function(err, foundUser){
          if(err){
              console.log(err);
          } else {
              foundUser.posts.push(post);
              foundUser.save(function(err, data){
                  if(err){
                      console.log(err);
                  } else {
                      
                      console.log(data);
                  }
              });
          }
      });
  });



//Fetching user with it's post
User.findOne({email: 'atom'}, (err, userWithPost) => {
    if(err){
        console.log(err)
    }else {
        console.log('User with Post', userWithPost)
    }
})



//SERVER
const PORT = process.env.PORT || 8000
app.listen(PORT,() => {
    console.log(`The Server is runing on port ${PORT}`)
});

