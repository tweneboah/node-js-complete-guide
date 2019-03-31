const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))



mongoose.connect('mongodb+srv://admin-emma:Paaputwu$2016@cluster0-g06za.mongodb.net/todo-app-DB', {    
   useNewUrlParser: true,     
   useCreateIndex: true,     
   useFindAndModify: false
}).then( () => {
   console.log('established connection to db successfully')
}).catch( (error) => {
   console.log('failed to establish connection to the db')
});

//TODO SCHEMMA
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Description cannot be empty'],
        min: 4
    }
});

//TOD MODEL

const Item = new mongoose.model('Item', itemSchema);

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


//Puting all the items in an array

const defaultItems = [item1, item2, item3, item4];

app.get('/', (req, res) => {

    let today = new Date();
 
    let options = {
         weekday: 'long',
         day: 'numeric',
         month: 'long'
    };
    let day  = today.toLocaleString('en-US', options)
    
    //Rendering to webpage

    Item.find({}, (err, foundItem) => {
        
        if(foundItem.length === 0) {
            //Inserting to db, we will usw insert many
            Item.insertMany(defaultItems, (err) => {
                if(err){
                    console.log(err);
                }else {
                    console.log('Item was successfully inserted into the database')
                }
            })
        }
        //Rendering to webpage
        res.render('list', {kindOfDay: day, newListItem: foundItem
   
        })
    })
  
})

//Creating todo
app.post('/', (req, res) => {
    const  itemName = req.body.newItem;
      const item = new Item ({
          name: itemName
      });

      item.save()

     res.redirect('/');
})

app.post('/delete', (req, res) => {
    const checkedItemId =  req.body.checkbox
    Item.findByIdAndRemove(checkedItemId, (err)=> {
        if(!err){
            console.log('Item was successfully deleted')
        }
    })
    res.redirect('/')
})

let port = process.env.PORT;
if(port == null || port ==  "") {
    port = 3000
}
app.listen(port)

app.listen(3000, (req, res) => {
    console.log('The server is running on port 3000')
})