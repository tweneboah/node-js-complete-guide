

  const socket =  io();

  //CHECKING IF THE USER'S BROWSER SUPPORT LOCATION SHARING

  document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    //Fetching location
    navigator.geolocation.getCurrentPosition((position) => {
     // console.log(position)
      //This can also emit object as well
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

     
    })
})

//receiving the event ftrom server
socket.on('myLocation', (coord) => {
    console.log(coord)
})

