const socket = io();

// console.log(socket.id)
const activeUsers = new Set();
socket.on("connect", () => {
  console.log(socket.id); 

});


socket.on('returningGame', arg => {
  if (arg == false) {
    window.alert('Invalid game pin ')
  } else {
    window.alert('Game pin valid')
    console.log(arg)
  }
})

// demonstration of how to emmit event from client in socket io 
function emmitEventTest() {
  console.log('button press')
  socket.emit("hello", "world");
}

function pinEntered() {
  var pin = document.getElementById('pin').value
  socket.emit("pinEntered", pin);
}