const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db)=>{
  if(err) {
     return console.log("Unable to connect Mongodb Server");
  }
  console.log("Connected to MongoDB server")

  db.collection('Todos').insertOne({
     text: "Something to do",
     completed: false
  }, (err, results) => {
    if(err) {
      return console.log('Unable to inert to do', err)
    }
    console.log(JSON.stringify(results.ops, undefined, 2));
  })

  db.close();
});