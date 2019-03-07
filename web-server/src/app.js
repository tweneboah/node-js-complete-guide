const path = require('path');
const express = require('express');//This is a function

const publicDirectory = path.join(__dirname,'../public/')

const app = express();

//hbs 
app.set('view engine', 'hbs')

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emmanuel'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Emmanuel'
    })
})
app.get('/weather', (req, res) => {
    res.send({
        forcast: 'it is raining',
        location: 'Kumasi'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Do you have any problem? we are here to help'
    })
})

app.listen(3000, () => {
    console.log('The server is up and running')
})
