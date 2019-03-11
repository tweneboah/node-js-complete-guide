const path = require('path');
const express = require('express');//This is a function
const forcast = require('./utils/forcast');
const geocode = require('./utils/geocode');

const app = express();
const hbs = require('hbs');

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//hbs 
app.set('view engine', 'hbs')
//customising hbs
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//public directory
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
    if(!req.query.address){
       return res.send({
            error: 'You must provide your address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
       if(error) {
           return res.send({
               error: error
           })
       }
       forcast(latitude,longitude, location, (error, forcastData )=> {
           if(error){
               return res.send({
                   error: error
               })
           }
           res.send({
               forcast: forcastData,
               location: location,
               address: req.query.address
           })
       })
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Do you have any problem? we are here to help'
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search'
            
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('404 page not found')
})

app.listen(3000, () => {
    console.log('The server is up and running')
})
