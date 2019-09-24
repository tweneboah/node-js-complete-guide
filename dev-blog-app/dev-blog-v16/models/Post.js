const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    //embeding the login user who is creating this post

    author: {
        id: String,
        username: String
    }
   
});

module.exports = mongoose.model('Post', postSchema);