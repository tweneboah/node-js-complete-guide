const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

//passport-local-mongoose has a lot of methods we use on our data, so to do this we has add it to userSchema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//ADDING passport-local-mongoose TO USER SCHEMA
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);