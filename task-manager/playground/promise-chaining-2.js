require('../src/db/mongoose');
const Task = require('../src/models/task')

//Deleting and list all incompleted task

//5c885e1955651b03c8a0e085

Task.findByIdAndDelete('5c89f2eca479d60a256176cb').then((task)=> {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

// //Using async await
// //Both id and age are asynchronous

// const updateAgeCount = async (id, age) => {
//  const user = await User
// }

