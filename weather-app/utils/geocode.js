const request = require('request')

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
  
  module.exports = geocode