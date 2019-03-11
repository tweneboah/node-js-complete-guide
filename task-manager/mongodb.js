//CRUD
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

//connecting
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
   if(error) {
     return  console.log('Unable to connect to database')
   }
  
   const db = client.db(databaseName)

   db.collection('users').findOne({name:'Emmanuel'}, (error, results)=> {
     if(error) {
       return console.log('Unable to fetch data')
     }
     console.log(results)
   })
   db.collection('users').find({age:30}).count((error, users) => {
     console.log(users)
   })
   //Searching for imcompleted task
   db.collection('tasks').find({completed:false}).toArray((error, task) => {
     console.log(task)
   })
});