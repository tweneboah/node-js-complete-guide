
  const socket =  io();

//ELEMEMTS
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = document.querySelector('button');
const $locationButton = document.querySelector('#send-location');

  //CHECKING IF THE USER'S BROWSER SUPPORT LOCATION SHARING
  $locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    //DISABLE BUTTON
    $locationButton.setAttribute('disabled', 'disabled')

    //Fetching location
    navigator.geolocation.getCurrentPosition((position) => {
        

      //This can also emit object as well
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

            //ENABLE LOCATION BUTTON
            $locationButton.removeAttribute('disabled')
    })
})

    //===============
    //SENDING MESSAGE USING FORM

    $messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //DISABLE BUTTON ON FORM
        $messageFormButton.setAttribute('disabled', 'disabled')

    

        const message = e.target.elements.message.value

        socket.emit('sendMessage', message, (messageFromCallback) => {

            console.log('Message ' ,messageFromCallback)
            //ENABLE FORM BUTTON
            $messageFormButton.removeAttribute('disabled')
            
            //CLEAR FORM INPUT
            $messageFormInput.value = ''
        
            //FOCUS
            $messageFormInput.focus();
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

