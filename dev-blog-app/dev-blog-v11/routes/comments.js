const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const router = express.Router();


//CREATE Comment

//1.GET the  comment form
router.get('/posts/:id/comments/new', (req, res) => {
    //We have to pass a single  post whose id is the url to this template so that we can get dynamuc access to individual post id
    Post.findById(req.params.id, (err, foundPost) => {
     
        if(err){
            console.log(err)
        }else {
            res.render('comments/createComment.ejs', {post: foundPost})
        }
    })
   
});


//COMMENT LOGIC
router.post('/posts/:id/comments', (req, res) => {
    //Values from the form
      const author = req.body.author;
      const text = req.body.text;
      //build the values as object
      const newComment = {
          author: author,
          text: text
      } 
     //Create the comment and save it
     Comment.create(newComment, (err, cretedComment) => {
      //At this point the comment has been created and save
      //So next we have to take this comment and find the post in the url and attach this comment to it and resave the post
         if(err){
             console.log(err)
         }else {
            Post.findById(req.params.id, (err, foundPost) => {
                
                if(err){
                    console.log(err)
                }else {
                    foundPost.comments.push(cretedComment);
                    //Resave the post so that the comment can be assigned to it
                    foundPost.save();
                  
                    //Redirect to the post
                    res.redirect(`/posts/${foundPost.id}`)
                }
            })
         }
     }) 
    })







module.exports = router;