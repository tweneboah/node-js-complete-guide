
//CONNECT TO THE SEVER
//This helps to receive and send events from client to sever

//Here we are receiving the events from the sever side

const socket =  io()

socket.on('countUpdated', (count) => {
 console.log(`The count has updated to ${count}`)
})