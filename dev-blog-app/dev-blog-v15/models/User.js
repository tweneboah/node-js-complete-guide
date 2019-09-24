const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    //Passport will create username and passport field automaticallly for us
    password: String,
    email: String,
    firstname: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ] 
});

userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('User', userSchema);