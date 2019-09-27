const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
    //We will save the user who has logged in username and id to this comment object
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      username: String
    },
    
    text: String
});

module.exports = mongoose.model('Comment', commentSchema);