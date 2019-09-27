const Post = require('../models/Post');
const middlewareObj = {}

middlewareObj.isLogin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }else {
        res.redirect('/users/login/new')
    }
    
};


middlewareObj.checkPostOwnership =   (req, res, next) => {
     //Check if the user is authenicated
     if(req.isAuthenticated()) {
        Post.findById(req.params.id, (err, foundPost) => {
            if(err){
                //If there is error redirect back
                res.redirect('back')
            }else {
         //If authenticated, does this user owns this post?. We can make the middleware to render edit always but it's advisable to move to the next in our code
            if(foundPost.author.id.equals(req.user._id)){
                // res.render('posts/editPost.ejs', {post: foundPost})
                next();
              }else {
         //If no return him back from where he is coming from
                res.redirect('back')
              }
            }
        })
    }else {
        //If not authenticated then redirect back to where the user was coming from
        res.redirect('back')
    }
}

module.exports = middlewareObj