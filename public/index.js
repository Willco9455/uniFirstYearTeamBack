const socket = io();

// console.log(socket.id)
socket.on("connect", () => {
  console.log(socket.id); 

});


socket.on('returningGame', arg => {
  console.log(arg)
})

function enterPress() {
  var uname = document.getElementById('name').value
  var pin = document.getElementById('pin').value
  socket.emit("pinEntered", {
    "name": uname,
    "pin": pin
  });
}