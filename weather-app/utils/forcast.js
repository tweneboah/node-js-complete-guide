const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d12e64382b046e0501b2cb27c73d69fd/' + latitude + ', ' + longitude + '?lang=en'
    request({url:url, json:true}, (error, response) => {
      if(error) {
        callback('Unable to connect to the weather service', undefined)
      }else if(response.body.error){
        callback('The given location is invalid', undefined)
      }else {
          callback(undefined, `It's currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipIntensity} % chance of rain`)
      }
    })
  }
module.exports = forcast;  