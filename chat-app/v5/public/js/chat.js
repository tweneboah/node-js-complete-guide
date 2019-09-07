

  const socket =  io();


  //Receiving the event from the server
  socket.on('message', (count) => {
   console.log(`The count has updated to ${count}`)
  });

  document.querySelector('#message-form').addEventListener('click', (e) => {
   e.preventDefault()

   const message = document.querySelector('input').value

    socket.emit('sendMessage', message);
  })