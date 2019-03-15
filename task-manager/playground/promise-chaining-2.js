require('../src/db/mongoose');
const Task = require('../src/models/task')

//Deleting and list all incompleted task

//5c885e1955651b03c8a0e085

// Task.findByIdAndDelete('5c89f2eca479d60a256176cb').then((task)=> {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// //Using async await
// //Both id and age are asynchronous

const deleteTaskAndCount = async (id) => {
 const task = await Task.findByIdAndDelete(id);
 const count = await Task.countDocuments({completed: false});
 return count
}

//Calling the function

deleteTaskAndCount('5c87296905fb0205e1b415df').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

