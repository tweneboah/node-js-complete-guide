const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const postRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');
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
    res.render('home.ejs')
})


app.use('/', postRoute);
app.use('/', usersRoute);
app.use('/', commentsRoute);



//SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`The Server is runing on port ${PORT}`)
});