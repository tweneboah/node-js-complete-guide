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
  
 }) 

//Reading /fectching data 

//find({}) returns all the users
app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(500).send();
    }
})

//fetching individual user

app.get('/users/:id',  async (req, res) => {

     const _id = req.params.id
     try {
         const user = await User.findById(_id);
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
     } catch (error) {
         res.status(500).send()
     }   
})


//Updating user
app.patch('/users/:id', async (req, res) => {
    //Fields allowed to be updated
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Deleteing User
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//TASK MANAGER APP

 //Creating a task
app.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body);
        const newTask = await task.save();
        res.status(201).send(newTask)
    } catch (error) {
        res.status(500).send(error)
    }
   
})

//Fetching individual task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    
    try {
        const task = await Task.findById(_id);
        res.send(task)
        
    } catch (error) {
        res.status(500).send(error)
    }
 
    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error) => {
      res.status(500).send()
    })

})

//Feching all task
app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})


//UPDATING TASK
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(e)
    }
})

//Deleting Task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})