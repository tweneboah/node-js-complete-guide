const express = require('express');
const bodyParser = require('body-parser');


const app = express();
let items = ['Learn Node js', 'Going for Dinner', 'Prepare my Lesson plan'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))


app.get('/', (req, res) => {
    let today = new Date();
 
    let options = {
         weekday: 'long',
         day: 'numeric',
         month: 'long'
    };
    let day  = today.toLocaleString('en-US', options)
    res.render('list', {
         kindOfDay: day,
         newListItem: items

     });
})

//Creating todo
app.post('/', (req, res) => {
    item = req.body.newItem;
    items.push(item)

     res.redirect('/');
})


app.listen(3000, (req, res) => {
    console.log('The server is running on port 3000')
})