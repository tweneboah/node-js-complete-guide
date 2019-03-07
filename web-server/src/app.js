const path = require('path');
const express = require('express');//This is a function

const publicDirectory = path.join(__dirname,'../public/')

const app = express();

app.use(express.static(publicDirectory));


app.get('/weather', (req, res) => {
    res.send({
        forcast: 'it is raining',
        location: 'Kumasi'
    })
})

app.listen(3000, () => {
    console.log('The server is up and running')
})
