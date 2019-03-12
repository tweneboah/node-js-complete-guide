 const mongoose = require('mongoose')

 mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
   useNewUrlParser: true,
   useCreateIndex: true
 })

 //creating a model
 const User = mongoose.model('User', {
   name: {
        type: String
   },
   age: {
        type: Number
   }
 })

 //Creating instance of the model
 const me = new User({
     name: 'Emmanuel',
     age: 30
 })
 //Saving to database. This return a promise
 me.save().then((result)=> {
     console.log(result)
 })
 .catch((error)=> {
     console.log('Error', error)
 })