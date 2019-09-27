const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment')
const router = express.Router();
const middleware = require('../middleware/index');


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
router.post('/posts/:id/comments', middleware.isLogin, (req, res) => {
    //Values from the form
      //const author = req.body.author;
      const text = req.body.text;
      //build the values as object
      const newComment = {
          text: text
      } 

     //Create the comment and save it
     Comment.create(newComment, (err, cretedComment) => {
      //At this point the comment has been created and save
      //So next we have to take this comment and find the post in the url and attach this comment to it and resave the post

      //Adding the login user's details to this newly created comment
      cretedComment.author.username = req.user.username;
      cretedComment.author.id = req.user.id
      cretedComment.save();
      console.log(cretedComment)
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