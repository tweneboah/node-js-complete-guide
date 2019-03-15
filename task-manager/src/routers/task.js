const express = require('express');
const router = new express.Router();
const Task = require('../models/task')

//TASK MANAGER APP

 //Creating a task
 router.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body);
        const newTask = await task.save();
        res.status(201).send(newTask)
    } catch (error) {
        res.status(500).send(error)
    }
   
})

//Fetching individual task by id
router.get('/tasks/:id', async (req, res) => {
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
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})


//UPDATING TASK
router.patch('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;

