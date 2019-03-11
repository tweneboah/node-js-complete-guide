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
   //SEARCHING FOR A USER
   //1. Determine the collection you want to search
   //2. Use findOne api. This accept two arguement; object which determines our search critera and a callback function

   //3. findOne returns only one document
   const db = client.db(databaseName)

   db.collection('users').findOne({name:'Emmanuel'}, (error, results)=> {
     if(error) {
       return console.log('Unable to fetch data')
     }
     console.log(results)
   })
    

});