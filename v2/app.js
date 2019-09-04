const Joi = require('@hapi/joi')
const express = require('express');

const app = express();

//MIDDLEWARE

app.use(express.json())//This helps to pass the request as json and can be found in the req.body



const courses = [
 {id: 1, name: 'Node Js'},
 {id: 2, name: 'React Js'},
 {id: 3, name: 'Express Js'},
 {id: 4, name: 'GraphQl Js'}
]


//====================================================
//ROUTES
//====================================================
app.get('/', (req, res) => {
 res.send('Hello Node Js')
} )


//Get all Courses

app.get('/api/courses', (req, res) => {
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




// ===================================================
//ENVIRONMENT VARRIABLES
//=====================================================

//1. Setting up environment variable ->  export PORT=5000



//SERVER

app.listen(3000, () => {
  console.log(`The server is runing`)
})



