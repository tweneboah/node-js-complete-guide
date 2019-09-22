const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: String, //This will refer to authenticated user but now let's use a string
    text: String
});

module.exports = mongoose.model('Comment', commentSchema);