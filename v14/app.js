const express = require('express');


const app = express();

//MIDDLEWARE
app.use(express.json())



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

//===========================
//ROUTES PARAMETERS
//==================

//1. This is use when you want a detail about a particular object to perform any function on it

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

//Query parameter is use to provide additional data to the backend services  and we use req.params to require values
//We don't create a separate route for handling req.query

//Sample route for query strings
//localhost/post/2019/2?sortBy=name




//=========================================================
//ENVIRONMENT VARRIABLES
//==========================================================

//1. Setting up environment variable ->  export PORT=5000

//SERVER

app.listen(3000, () => {
  console.log(`The server is runing`)
})



