const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Post');
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
    res.render('createPost')
})

//POST LOGIC
app.post('/posts', (req, res) => {
    //Values from the form
    let title = req.body.title;
    let description = req.body.description;
    const newPost = {title: title, description: description};
    Post.create(newPost, (err, newlyCreatedPost) => {
        if(err){
            console.log(err)
        }else{
            res.send(newlyCreatedPost)
        }
    })

})


//SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`The Server is runing on port ${PORT}`)
});