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

    //It's recommended to save the id of the logged in user as mongoDB ObjectId...

    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
   
});

module.exports = mongoose.model('Post', postSchema);