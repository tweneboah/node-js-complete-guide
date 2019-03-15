const express = require('express');
require('./db/mongoose');
const User = require('./models/user')
const Task = require('./models/task')

const app = express();
const port = process.env.PORT || 4000
app.use(express.json())

//Creating a user
app.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try{
       await user.save()
       res.status(201).send(user)
    }catch(e){
       res.status(400).send(e)
    }
    // user.save().then(()=> {
    //      res.status(400).send(user)
    // }).catch((error) => {
    //     res.status(400)
    //   res.send(error)
    // })
 }) 

//Reading /fectching data 

//find({}) returns all the users
app.get('/users', (req, res) => {
    User.find({}).then((users)=> {
         res.send(users)
    }).catch((e) => {
        res.status(400).send(error)
    })
})

//fetching individual user

app.get('/users/:id', (req, res) => {

     const _id = req.params.id
     User.findById(_id).then((user) => {
         if(!user) {
             return res.status(404).send()
         }
         res.send(user)
     }).catch((error) => {
  res.status(500).send()
     })

    
})

 //Creating a task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400)
        res.send(error)
    })
})

//Fetching individual task by id
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error) => {
 res.status(500).send()
    })

})

//Feching all task
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})