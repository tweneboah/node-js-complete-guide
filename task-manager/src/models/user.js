const mongoose = require('mongoose')
const validator = require('validator')

//creating a model
 const User = mongoose.model('User', {
   name: {
        type: String,
        required: true,
        trim: true
   },
   email: {
       type:String,
       required: true,
       trim: true,
       lowercase: true,
       validate(value) {
           if(!validator.isEmail(value)) {
               throw new Error('Email is invalid')
           }
       }
   },
   password: {
     type: String,
     required: true,
     minlength: 7,
     trim: true,
     validate(value){
         if(value.toLowerCase().includes('password')) {
             throw new Error('Password cannot contain password')
         }
     }
   },
   age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
   }
 })

 //Creating instance of the model
 const me = new User({
     name: 'Akosua',
     //age: -3,
     email: 'twentekghana@gmail.com',
     password: '987asswordoi'
 })
// Saving to database. This return a promise
 me.save().then((result)=> {
     console.log(result)
 })
 .catch((error)=> {
     console.log('Error', error)
 })

 module.exports = User;