const express  = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/' , (req, res) => {
    res.sendFile(__dirname  + '/index.html')
})

app.post('/', (req, res) => {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    let BMI =weight + height;

  res.send('Your BMI Weight is ' + BMI )
})
app.listen(3000, (req, res) => {
    console.log('The Server is running on port 3000')
})