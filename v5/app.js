
const Joi = require('@hapi/joi');
const morgan = require('morgan');
const express = require('express');
const middleware = require('./middleware/auth');
const mongoose = require('mongoose');

const app = express();

//DB
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
.then(() => {
  console.log('DB Connected')
})
.catch(() => {
  console.log('error occured')
})


//SCHEMA
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tages: [ String],
  date: {type: Date, default: Date.now()},
  isPublished: Boolean
});

//MODEL

const Course = mongoose.model('Course', courseSchema)



//SAVING TO DB
const course = new Course({
  name: 'Node js course',
  author: 'Emmanuel',
  tags: ['Node', 'Backed'],
  isPublished: true
});

//SAVING TO DB
//  course.save((err, created) => {
//    console.log('Created', created)
// })

//USING ASYN FUNCTION
 const createCourse = async () => {
  const course = new Course({
    name: 'React js course 2',
    author: 'Emmanuel',
    tags: ['Node', 'Backed2'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result)
};

createCourse();


//======================
//MIDDLEWARE
//=====================

//This is a funtion that accept request object as argument and either returns a results to the client or it pass to another middleware function

//Any route takes in a middleware  function because the second argument pass to a route is a function and that function accept req object as argument

//Any request goes through a request processing pipline and this has one or more middleware functions

//NOTE
//app.use() it's a universal route does get/post/delete/put so to activate a middleware which you want to pass to any route in your application you pass it to the app.use()

//But if you want a particular route you will a module / separate file, require it and pass it to the route you want that middleware 


//============
//BUILT IN MIDDLEWARE

app.use(express.json())//This helps to pass the request as json and can be found in the req.body

app.use(express.urlencoded({extended: true}))
app.use(express.static('public')) //Serving static files


//You can display the file in the public as localhost:3000/homepage.html

//===============
//CREATING CUSTOM MIDDLEWARE
//======================

app.use(function(req, res, next) {
  console.log('Logging you in....');
  next()
});

app.use(function(req, res, next) {
  console.log('You are Welcome');
  next()
});


//============================
//ENVIRONMENT VARIABLE
//===========================

//1. How to create environment variable -> exports NODE_ENV=production

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('Morgan enabled')
}



const courses = [
 {id: 1, name: 'Node Js'},
 {id: 2, name: 'React Js'},
 {id: 3, name: 'Express Js'},
 {id: 4, name: 'GraphQl Js'}
]


//=================================
//ROUTES
//=============================
app.get('/', (req, res) => {
 res.send('Hello Node Js')
} )
 

//Get all Courses

app.get('/api/courses', middleware.auth, (req, res) => {
 res.send(courses)
})


//Get a single Course

app.get('/api/courses/:courseId', (req, res) => {
  const course = courses.find((course) => course.id === parseInt(req.params.courseId))
  if(!course){
   //return 404
   res.status(404).send('The course with the given ID is not found')
  }else {
   res.send(course)
  }
})

//POST  course
app.post('/api/courses', (req, res) => {
  //Validation using Joi
  const schema = {
    name: Joi.string().min(4).required()
  }

  const result = Joi.validate(req.body, schema)
  console.log(result.error)
  if(result.error){
   //res.status(400).send(result.error);
   res.status(400).send(result.error.details[0].message);
   return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course)
})



//=========
//UPDATE
//=============

app.put('/api/courses/:id', (req, res) => {
   //Look up the course
   const course = courses.find((course) => course.id === parseInt(req.params.courseId))
   if(!course){
    //If not existing, return 404
    res.status(404).send('The course with the given ID is not found')
   }
  
   //Validate
    //Validation using Joi
  const schema = {
    name: Joi.string().min(4).required()
  }
  const result = Joi.validate(req.body, schema);


   //If invalid, return 400 - Bad request
   if(result.error){
    //res.status(400).send(result.error);
    res.status(400).send(result.error.details[0].message);
    return;
   }

   //Update course

   course.name = req.body.name
   //Return the updated course
   res.send(course)

})


//=================
//VALIDATION FUNCTION
//===================
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(4).required()
  }
 return Joi.validate(req.body, schema);
}



//===========================
//ROUTES PARAMETERS
//==================

//1. This is use when you want a detail about a particular object to perform any function on it


//================
//QUERY STRINGS
//================

//Query parameter is use to provide additional data to the backend services  and we use req.params to require values
//We don't create a separate route for handling req.query

//Sample route for query strings
//localhost/post/2019/2?sortBy=name






//SERVER

app.listen(3000, () => {
  console.log(`The server is runing`)
})



