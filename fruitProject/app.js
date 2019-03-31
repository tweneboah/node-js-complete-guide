const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitProject', {    
   useNewUrlParser: true,     
   useCreateIndex: true,     
   useFindAndModify: false
}).then( () => {
   console.log('established connection to db successfully')
}).catch( (error) => {
   console.log('failed to establish connection to the db')
});


//SCHEMA/STRUCTURE/BUSSINESS LOGIC
const fruitSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'Please check your entry, name is not specifield']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//model
const Fruit = mongoose.model('Fruit', fruitSchema);

//Creating fruit document

const fruit = new Fruit ({
    name: '',
    rating: 2,
    review: ' Good'
})

//SAVING DOCUMENT
//fruit.save()


//DELETING

//Fruit.updateOne(({'5c9f518d1ced6d1b2917cda9'},))




















//PESRON SCHEMA

// const personSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// });

// const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//     name: 'Emmanuel',
//     age: 30
// });

//person.save()

//READ All fruits

// Fruit.find((err, fruits) => {
//    if(err){
//        console.log('Error occured');
//    }else {
//        fruits.forEach((fruit) =>{
//            console.log(fruit.name)  //Displays all the fruits names
//        })
//    }
// });

//Read all person

// Person.find((error, persons) => {
//     if(error) {
//         console.log(error);
//     }else {
//         console.log(persons)
//     }
// });

