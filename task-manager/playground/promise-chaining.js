require('../src/db/mongoose');
const User = require('../src/models//user')

//5c87461fab1cf1080f87555f
//Updating a user and count count all users who are at the age of 1

//  User.findByIdAndUpdate('5c87461fab1cf1080f87555f', {age: 1}).then((user) => {
//      console.log(user)
//      return User.countDocuments({age: 1})
//  }).then((result) => {
//      console.log(result)
//  }).catch((e) => {
//      console.log(e)
//  })



//Using async await
//Both id and age are asynchronous

const updateAgeCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age:age});
    const count = await User.countDocuments({age:age});
    return count
   }

   //Calling thr function
   updateAgeCount('5c879a0ae09bb503fbf3a0f8', 2).then((count) => {
       console.log(count)
   }).catch((e) => {
       console.log(e)
   })