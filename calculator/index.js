const express  = require('express');
const bodyParser = require('body-parser');

const app  = express();
app.use(bodyParser.urlencoded({extended:true})) //it has thses methods .text, .json


//Body parser can go to any of your route to tap req.body
//This contains all the object body . If it is a form it contains all the fields of the form

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    // console.log(req.body.num1) //This means it will display a value from a form field that has a name num1

    var value1 = Number(req.body.num1)
    var value2 = Number(req.body.num2)
    let results = value1 + value2;
    res.send( 'The results si ' + results)
})

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000')
});