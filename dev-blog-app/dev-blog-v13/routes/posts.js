const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const middleware = require('../middleware/index');



//CREATE POST

//1.GET the form
router.get('/posts/new', middleware.isLogin, (req, res) => {
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
          if(err){
              console.log(err)
          }else {
              res.redirect('/posts');
          }
      })
})

//FETCHINF ALL POSTS
router.get('/posts', middleware.isLogin, (req, res) => {
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
            
            res.render('posts/show.ejs', {post: postWithComments})
        }
    })
});

//Show more route Without comment

// router.get('/posts/:id', (req, res) => {
//     Post.findById(req.params.id, (err, foundpost) => {
//         if(err){
//             console.log(err)
//         }else {
//             res.render('posts/show.ejs', {post: foundpost})
//         }
//     })
// });

//DELETE
router.delete('/posts/:id', (req, res) => {
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

router.get('/posts/update/:id/new', (req, res) => {
    //Find the post and pass it to this template
    Post.findById(req.params.id, (err, foundPost) => {
        if(err){
            console.log(err)
        }else {
            res.render('posts/editPost.ejs', {post: foundPost})
        }
    })
});

//3.Update Logic

// router.put('/posts/update/:id', (req, res) => {
    
//     //find the post you want to update and then retrieve the data from the form you want to update. Because of that we will build the data coming from the edit form and pass it as a second arguemnt to findByIdAndUpdate,
//     let postToBeUpdate = {
//         title: req.body.title,
//         description: req.body.description
//     };

//     //Find the post you want to update
//     Post.findByIdAndUpdate(req.params.id, postToBeUpdate, (err, updatedPost) => {
//         if(err){
//             console.log(err)
//         }else {
//             res.send(updatedPost)
//         }
    

router.put('/posts/update/:id', (req, res) => {

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
})
module.exports = router;