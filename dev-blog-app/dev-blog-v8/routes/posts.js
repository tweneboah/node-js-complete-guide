const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();


//CREATE POST

//1.GET the form
router.get('/posts/new', (req, res) => {
    res.render('posts/createPost')
})



//POST LOGIC
router.post('/posts', (req, res) => {
    //Values from the form
      const title = req.body.title;
      const description = req.body.description;
      //build the values as object
      const newPost = {
          title: title,
          description: description
      } 
      //Create the post
      Post.create(newPost, (err, post) => {
          //At this point the post has created already and then we push to the user and then we re save the user with the post
          eval(require('locus'))
          if(err){
              console.log(err)
          }else {
              User.findOne({email: '80@gmail.com'}, (err, user) => {
                  if(err){
                      console.log(err)
                  }else {
                      //Push post into this user's array
                      user.posts.push(post)
                      //Save it
                      user.save((err, userWithPost) => {
                          if(err){
                              console.log(err)
                          }else {
                              res.send(userWithPost)
                              console.log(userWithPost);
                          }
                      })
                  }
              })
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
router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err)
        }else {
            res.render('posts/show.ejs', {post: foundpost})
        }
    })
});



module.exports = router;