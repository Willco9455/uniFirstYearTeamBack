const socket = io();

// console.log(socket.id)
const activeUsers = new Set();
socket.on("connect", () => {
  console.log(socket.id); 

});

socket.on("hello", (arg) => {
  console.log(arg)
  console.log(socket.id)
})

// demonstration of how to emmit event from client in socket io 
function emmitEventTest() {
  console.log('button press')
  socket.emit("hello", "world");
}