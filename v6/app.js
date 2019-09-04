
const express = require('express');
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
  price: String,
  date: {type: Date, default: Date.now()},
  isPublished: Boolean
});

//MODEL

const Course = mongoose.model('Course', courseSchema)


// CREATING AND SAVING TO DB

//USING ASYN FUNCTION
 const createCourse = async () => {
  const course = new Course({
    name: 'Express JS ',
    author: 'Tweneboah',
    price: 500,
    tags: ['Node', 'Backed'],
    isPublished: false
  });

  const result = await course.save();
  console.log(result)
};

//createCourse();


//===========
//QUERYING
//===============

//We use find() to do querying
//Since the return value from find() returns a query, we can chain it with more queries



  //Getting all courses

  
const getCourses1 =  async () => {
   const courses = await Course.find();
   console.log(courses)
}
//getCourses1()




//Getting all courses from Emmanuel

const getCourses2 =  async () => {
  const courses = await Course.find({author: 'Emmanuel'});
  console.log(courses)
}



//Getting all courses from Emmanuel and display number of items, sort and display certain properties

const getCourses3 =  async () => {
  const courses = await Course.find({author: 'Emmanuel'})
  .limit(10)
  .sort({name: -1}) //Ascending -1 descending order
  .select({author: 1, name: 1, price: 1}) //Selecting only author and name and sort them
   
  console.log(courses)
}
//getCourses3()


//===============
//COMPARISM OPERATORS
//================

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or  equal)
// lt (less than)
// lte (less than or equal)
// in
// nin (not in)


//Display courses greater than 100

const getCourses4 =  async () => {
  const courses = await Course.find({price: {$gt: 100}})
  .limit(10)
  .sort({name: -1}) //Ascending -1 descending order
  .select({author: 1, name: 1, price: 1}) //Selecting only author and name and sort them
   
  console.log('Greater than 100', courses)
}
//getCourses4()


//Display courses between  100 and  300

const getCourses5 =  async () => {
  const courses = await Course.find({price: {$gt: 100, $lt: 300}})
  .limit(10)
  .sort({name: -1}) //Ascending -1 descending order
  .select({author: 1, name: 1, price: 1}) //Selecting only author and name and sort them
   
  console.log(courses)
}
//getCourses5()

//Display courses between  Either 200 ,  400  or 100

const getCourses6 =  async () => {
  const courses = await Course.find({price: {$in : [200, 400, 100]}})
  .limit(10)
  .sort({name: -1}) //Ascending -1 descending order
  .select({author: 1, name: 1, price: 1}) //Selecting only author and name and sort them
   
  console.log(courses)
}
//getCourses6()




//===========
//LOGICAL OPERATORS
//===============

// or
// and

//Display courses that are published by Emmanuel or any course that has published and price less than 100

const getCourses7 =  async () => {
  const courses = await Course.find()
  .or([{author: 'Emmanuel'}, {isPublished: true}])


  console.log('Course', courses)
}
//getCourses7()


//===========
//REGULAR EXPRESSIONS
//===============


//Display courses that start with Node

const getCourses8 =  async () => {
  const courses = await Course.find({name: /^Node/})
  console.log('Course', courses)
}
//getCourses8()


//Display courses that ends with js

const getCourses9 =  async () => {
  const courses = await Course.find({name: /js$/i})
  console.log('Course', courses)
}
getCourses9()


//SERVER
app.listen(3000, () => {
  console.log(`The server is runing`)
})



