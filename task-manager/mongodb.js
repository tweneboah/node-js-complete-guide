//CRUD
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient

//using destructure
const {MongoClient, ObjectID} = require('mongodb');

//connecting
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
   if(error) {
     return  console.log('Unable to connect to database')
   }
  
   const db = client.db(databaseName)

  //Deleting
  //this remove all data the meet the criteria
  db.collection('users').deleteMany({
    age: 54
  }).then((results) => {
    console.log(results)
  }).catch((error) => {
    console.log(error)
  })

  db.collection('tasks')
  .deleteOne({
    description: 'Learning node js'
  }).then((results)=>{
    console.log(results)
  }).catch((error) =>{
    console.log(error)
  })
});