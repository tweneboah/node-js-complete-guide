const express = require('express');
const mongoose = require('mongoose')

const users = require('./routes/api/users');
const profile = require('./routes/api/profiles')
const posts = require('./routes/api/posts')

mongoose.connect('mongodb://127.0.0.1:27017/devConnector', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
});


const app = express();


app.get('/', (req, res) => {
 res.send('Hello')
});

//ROUTES
app.use('/api/users', users);
app.use('/api/profiles', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
}) 