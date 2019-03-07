const express = require('express');//This is a function

const app = express();

app.get('', (req, res) =>{
    res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
    res.send(
        [{
        name: 'Emmanuel',
        age: 30
        }, {
        name: 'Tweneboah',
        age: 29
        }
     ])
});

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
});

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'it is raining',
        location: 'Kumasi'
    })
})

app.listen(3000, () => {
    console.log('The server is up and running')
})
