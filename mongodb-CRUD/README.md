# KEY POINTS / STEPS FOR THIS PROJECT

## STEP 1
1. I required all the moduls i needed for this project
```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
```
## STEP 2 - Connecting to MOnogoDB
1. Firts i coonected to the momgoDB Server using this path
```javascript
/users/emmanuel/mongodb/bin/mongod --dbpath=/users/emmanuel/mongodb-data
```

## STEP 3 - Connect to the DB and Node JS
1. Firts i coonected to the momgoDB Server using this path

2. This connect and Create todo-app-DB
```javascript
mongoose.connect('mongodb://127.0.0.1:27017/todo-app-DB', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });
```

## STEP 4 CREATED MY BUSSINESS LOGIC / TODO SCHEMA
1. This defines the structure of my application

```javascript
//TODO SCHEMMA
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Description cannot be empty'],
        min: 4
    }
});
```

## STEP 5 I CREATED MY TODO MODEL
1. This is used to create the instance of the todo

```javascript
const Item = new mongoose.model('Item', itemSchema);
```

## STEP 6 CREATING THE REAL TODO USING THE MODEL
1. To create real todo, create instance of the model

```javascript
//Creating items
const item1 = new Item ({
    name: 'Going Home'
})

const item2 = new Item ({
    name: 'Learning'
})

const item3 = new Item ({
    name: 'Dinner'
})


const item4 = new Item ({
    name: 'lesson plan'
})
```
