const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const middleware = require('../middleware/index');



//CREATE POST

//1.GET the form
router.get('/posts/new', middleware.isLogin, (req, res) => {
    console.log('AUTH USER', req.user)
    res.render('posts/createPost')
})





// CREATING POST LOGIC WITHOUT A USER

router.post('/posts', middleware.isLogin, (req, res) => {
     //Values from the form
      const title = req.body.title;
      const description = req.body.description;
      //build the values as object
      const newPost = {
          title: title,
          description: description

      };

      Post.create(newPost, (err, createdPost) => {
          
        //Attach the created post to the login user
        createdPost.author.id = req.user.id;
        createdPost.author.username = req.user.username;
        createdPost.save();

        console.log('I CREATED THIS', createdPost);
          if(err){
              console.log(err)
          }else {
              res.redirect('/posts');
          }
      })
})

//FETCHINF ALL POSTS
router.get('/posts', (req, res) => {
    Post.find({}, (err, allPosts) => {
        if(err){
            console.log(err)
        }else{
            res.render('posts/posts.ejs', {posts: allPosts})
        }
    })
});



//Show more route
//Remember that at this point there is a comment created for this so we have to populate this comment and display it

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).populate('comments').exec((err, postWithComments) => {
        if(err){
            console.log(err)
        }else{
            
            res.render('posts/show.ejs', {post: postWithComments, auth: req.user})
        }
    })
});



//DELETE
router.delete('/posts/:id', middleware.isLogin, middleware.checkPostOwnership, (req, res) => {
    console.log('deleted')
    Post.findByIdAndRemove(req.params.id, (err, foundPost) => {
        if(err){
            console.log(err)
        }else {
             res.redirect('/posts')
        }
    })
});


//EDIT POST

//1. Create the edit form

//2. Get the edit form and pass the post you want to edit to this form

router.get('/posts/update/:id/new', middleware.checkPostOwnership,  (req, res) => {

     //Check if the user is authenicated
    
        Post.findById(req.params.id, (err, foundPost) => {
            if(err){
                console.log(err)
            }else {
                res.render('posts/editPost.ejs', {post: foundPost})
            }
        })

});
//=================
//3.Update Logic
//=================

router.put('/posts/update/:id', middleware.checkPostOwnership, (req, res) => {

     //find the post you want to update and then retrieve the data from the form you want to update. Because of that we will build the data coming from the edit form and pass it as a second arguemnt to findByIdAndUpdate,

           let postToBeUpdate = {
        title: req.body.title,
        description: req.body.description
    };
    //Find the post you want to update
      Post.findByIdAndUpdate(req.params.id, postToBeUpdate, (err, updatedPost) => {
          if(err){
              console.log(err)
          }else {
            //res.send(updatedPost);
            res.redirect(`/posts/${updatedPost.id}`)
          }
      })
});



module.exports = router;