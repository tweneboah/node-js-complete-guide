const request = require('request');

const geocode = require('./utils/geocode.js');
const forcast = require('./utils/forcast')




geocode('Tafo kumasi', (error, data)=>{
  if(error) {
    return console.log(error)
  }

  forcast(data.latitude, data.longitude, (error, forcastData) =>{
   console.log(data.location);
   console.log(forcastData)
  })
});


