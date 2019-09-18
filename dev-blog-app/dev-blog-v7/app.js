const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const app = express();



 
// DB CONNECTION
  const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/Dev-Blog'

  mongoose.connect( DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
    })
    .then(() => console.log("DB Connected successfully"));

    //MIDDLEWARE
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//Serving static files
app.use(express.static(__dirname + "/public"));


//ROUTES
app.get('/', (req, res) => {
    res.send('App')
})


//CREATE POST

//1.GET the form
app.get('/posts/new', (req, res) => {
    res.render('posts/createPost')
})



//POST LOGIC
app.post('/posts', (req, res) => {
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
app.get('/posts', (req, res) => {
    Post.find({}, (err, allPosts) => {
        if(err){
            console.log(err)
        }else{
            res.render('posts/posts.ejs', {posts: allPosts})
        }
    })
});


//Show more route
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundpost) => {
        if(err){
            console.log(err)
        }else {
            res.render('posts/show.ejs', {post: foundpost})
        }
    })
});



//===========
//USERS
//==========

//Register

//1. Get the form
app.get('/users/new', (req, res) => {
    res.render('users/register.ejs')
});

//2. Registration Logic
app.post('/users', (req, res) => {
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
 app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).populate('posts').exec((err, userWithPost) => {
        if(err){
            console.log(err)
        }else {
            res.send(userWithPost)
        }
    })
})



//SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`The Server is runing on port ${PORT}`)
});