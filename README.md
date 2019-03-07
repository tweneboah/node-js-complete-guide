# Creating servers
```javascript
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
});
# serving static page

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

```
This contains all my node js projects as my learning journey

# http Request with Express js

```javascript
const request = require('request');

const geocode = require('./utils/geocode.js')

const url = 'https://api.darksky.net/forecast/d12e64382b046e0501b2cb27c73d69fd/37.8267,-122.4233?lang=en';

request({url:url, json: true}, (error, response) => {
  //console.log(response.body.currently.time)
  if(error){
    console.log('Unable to connect to the service')
  }else if(response.body.code){
    console.log('The given location is invalid.')
  }else{
        console.log(`It's currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipIntensity} % chance of rain`)

  console.log('============================');
  console.log(response.body.daily.data[0].summary)
  }
});


const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A';

request({url:geocode, json:true}, (error, response)=>{

  if(error){
    console.log('Unable to connect to the service');
  }else if(response.body.features.lenght === 0){
    console.log('Unable to find location. Try another search')
  }else {
    const latitude = response.body.features[3].center[0];
    const longtidude = response.body.features[3].center[1]
    console.log('Latidude', latitude)
    console.log('Longtidude', longtidude)
    console.log(error)
  }

 
})


const geocode = (callback) =>{
  setTimeout(()=>{
    request({url:geocode, json:true}, (error, response)=>{

      if(error){
        console.log('Unable to connect to the service');
      }else if(response.body.features.lenght === 0){
        console.log('Unable to find location. Try another search')
      }else {
        const latitude = response.body.features[3].center[0];
        const longtidude = response.body.features[3].center[1]
        console.log('Latidude', latitude)
        console.log('Longtidude', longtidude)
        console.log(error)
      }
        
     
    })
  }, 2000)
}

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A'
    request({url:url, json:true}, (error, response) =>{
      if(error){
        callback('Unable to connect to the location services!', undefined);
      }else if(response.body.features.length === 0) {
        callback('Unable to find  location. Try another search')
      }else {
        callback(undefined, {
          latitude: response.body.features[0].center[0],
          longitude: response.body.features[1].center[1],
          location: response.body.features[0].place_name
        })
      }
    })
  }
geocode('ashtown kumasi', (error, data)=>{
  console.log('Error', error);
  console.log('Data', data)
})

```
