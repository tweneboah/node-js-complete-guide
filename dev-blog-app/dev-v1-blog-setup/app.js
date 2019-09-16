const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//Serving static files
app.use(express.static(__dirname + "/public"));

 
// DB CONNECTION
  const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/Dev-Blog'

  mongoose.connect( DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
    })
    .then(() => console.log("DB Connected successfully"));


//ROUTES
app.get('/', (req, res) => {
    res.send('App')
})


//SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`The Server is runing on port ${PORT}`)
});