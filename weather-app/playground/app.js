const request = require('request');


// const url = 'https://api.darksky.net/forecast/d12e64382b046e0501b2cb27c73d69fd/37.8267,-122.4233?lang=en';

// request({url:url, json: true}, (error, response) => {
//   //console.log(response.body.currently.time)
//   if(error){
//     console.log('Unable to connect to the service')
//   }else if(response.body.code){
//     console.log('The given location is invalid.')
//   }else{
//         console.log(`It's currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipIntensi2ty} % chance of rain`)

//   console.log(response.body.daily.data[0].summary)
//   }
// });

// console.log('......................MIDDLE...................')

// const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A';

// request({url:geocode, json:true}, (error, response)=>{

//   if(error){
//     console.log('Unable to connect to the service');
//   }else if(response.body.features.lenght === 0){
//     console.log('Unable to find location. Try another search')
//   }else {
//     const latitude = response.body.features[3].center[0];
//     const longtidude = response.body.features[3].center[1]
//     console.log('Latidude', latitude)
//     console.log('Longtidude', longtidude)
//     console.log(error)
//   }

 
// })


// const geocode = (address, callback) => {
// const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A';
// request({url:geocode, json:true}, (error, response) => {
//   if(error) {
//     callback('Unable to connect to location services!', undefined);
//   }else if(response.body.features.length === 0) {
//     callback('Unable to find location. Try another search', undefined)
//   }else {
//     callback({
//       latitude: response.body.features[0].center[0],
//       longitude: response.body.features[0].center[0],
//       location: response.body.features[0].place_name
//     })
//   }
// })

// }

// geocode('kumasi ghana', (error, data) => {
    
//      console.log('Problem', error);
//      console.log('Data', data);
// })


const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/d12e64382b046e0501b2cb27c73d69fd/'+lat+','+long+'?lang=en';
  request({url:url, json:true}, (error, response) => {
     if(error) {
    callback('Unable to connect to location services!', undefined); 
  }else if(response.body.features.length === 0) {
    callback('Unable to find location. Try another search', undefined)
  }else {
    callback({
      latitude: response.body.features[0].center[0],
      longitude: response.body.features[0].center[0],
      location: response.body.features[0].place_name
    })
  }
  })
}

forecast(1.733, 2.8633, (error, data) => {
  console.log('Data', data)
})