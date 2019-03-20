const express = require('express');

const app = express();

//bringing routes
const postRoutes = require('./routes/post.js')

app.get('/', postRoutes.getPosts);



app.listen(8080);