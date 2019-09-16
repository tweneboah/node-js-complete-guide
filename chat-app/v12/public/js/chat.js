
  const socket =  io();

//ELEMEMTS
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = document.querySelector('button');
const $locationButton = document.querySelector('#send-location');


  //ELEMENTS FOR DISPLAYING THE MESSAGE
  //To display the message we need two things
  //1. The template with the text
  //2. A div to display template, hence we will select the elemnets ofr the div and the template
  const $messages = document.querySelector('#messages');
  const $myLocation = document.querySelector('#my-location');
  //TEMPLATES
  const messageTemplate = document.querySelector('#message-template').innerHTML;//For this we want the html inside so we will use .innerHTML
  const myLocationTemplate = document.querySelector('#myLocation-template').innerHTML;



//DISPLAYING WELCOME MESSAGE EVENT FROM THE SERVER TO THE SCREEN

socket.on('welcomeMessage', (welcomeMessageFromEvent) => {

  //html Store the html to render to the browser
  const html = Mustache.render(messageTemplate, {
      message: welcomeMessageFromEvent.text
  });
  //Adding the html into the div created
  $messages.insertAdjacentHTML('beforeend', html)//Displaying message at the bottom of the div
   
})




//DISPLAYING MESSAGE WHEN A NEW USER JOIN THE CHAT
socket.on('alertMessageWhenUserJoin', (message) => {
   console.log(message)
})




// WHEN A USER IS DISCONNECTED
socket.on('disconnectedMessage', (message) => {
    //html Store the html to render to the browser
  const html = Mustache.render(messageTemplate, {
    message: message
});
//Adding the html into the div created
$messages.insertAdjacentHTML('beforeend', html)//Displaying message at the bottom of the div
})




//SHARING MY LOCATION

  $locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    //DISABLE BUTTON
    $locationButton.setAttribute('disabled', 'disabled')

    //Fetching location
    navigator.geolocation.getCurrentPosition((position) => {

        //SHARE LOCATION EVENT
      //This can also emit object as well
        socket.emit('shareMyLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
            //ENABLE LOCATION BUTTON
            $locationButton.removeAttribute('disabled')
    })
})


    //DISPLAYING MY LOCATION

    socket.on('myLocation', (message) => {
        //html Store the html to render to the browser
  const html = Mustache.render(myLocationTemplate, {
    myLocation: message
});
//Adding the html into the div created
$messages.insertAdjacentHTML('beforeend', html)//Displaying message at the bottom of the div
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

    });



    //DISPLAYING THE MESSAGE FROM FORM TO USERS
    socket.on('messageFromForm', (message) => {
        //html Store the html to render to the browser
  const html = Mustache.render(messageTemplate, {
    message: message
});
//Adding the html into the div created
$messages.insertAdjacentHTML('beforeend', html)//Displaying message at the bottom of the div
        console.log(message)
    })

