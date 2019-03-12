 const mongoose = require('mongoose')

 mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
   useNewUrlParser: true,
   useCreateIndex: true
 })

 //creating a model
 const User = mongoose.model('User', {
   name: {
        type: String,
        required: true
   },
   age: {
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
   }
 })

 //Creating instance of the model
 const me = new User({
     name: 'Emmanuel',
     age: -3
 })
 //Saving to database. This return a promise
 me.save().then((result)=> {
     console.log(result)
 })
 .catch((error)=> {
     console.log('Error', error)
 })

// const Task = mongoose.model('task', {
//     description: {
//         type: String,
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const task =  new Task ({
//     description: 'Learn the mongoose Library',
//     completed: false
// })

// task.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })