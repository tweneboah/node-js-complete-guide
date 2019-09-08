
  const socket =  io();

//================
//SHARE LOCATION
//===============


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

//===============
//SENDING MESSAGE USING FORM

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (messageFromCallback) => {
       
        console.log('Message ' ,messageFromCallback)
    })

})

//Sending messages from the form to all the
socket.on('message', (message) => {
    console.log(message)
})

//receiving the event ftrom server
socket.on('myLocation', (coord) => {
    console.log(coord)
})

