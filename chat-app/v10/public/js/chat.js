
  const socket =  io();

//ELEMEMTS
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = document.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $message = document.querySelector('#message')




const messageTemplate = document.querySelector('#message-template').innerHTML




//DISPLAYING WELCOME MESSAGE EVENT FROM THE SERVER TO THE SCREEN

socket.on('welcomeMessage', (welcomeMessageFromEvent) => {

   const html = Mustache.render(messageTemplate, {
       message: welcomeMessageFromEvent
   })
  $message.insertAdjacentHTML('beforeend', html)
   
})




//DISPLAYING MESSAGE WHEN A NEW USER JOIN THE CHAT
socket.on('alertMessageWhenUserJoin', (message) => {
   console.log(message)
})




// WHEN A USER IS DISCONNECTED
socket.on('disconnectedMessage', (message) => {
    console.log(message)
})




//Sharing Location

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

    //DISPLAYING THE MESSAGE FROM FORM TO USERS
    socket.on('messageFromForm', (message) => {
        console.log(message)
    })

