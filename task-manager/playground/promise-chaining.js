require('../src/db/mongoose');
const User = require('../src/models//user')

//5c87461fab1cf1080f87555f
//Updating a user and count count all users who are at the age of 1

 User.findByIdAndUpdate('5c87461fab1cf1080f87555f', {age: 1}).then((user) => {
     console.log(user)
     return User.countDocuments({age: 1})
 }).then((result) => {
     console.log(result)
 }).catch((e) => {
     console.log(e)
 })