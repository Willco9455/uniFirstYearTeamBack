const socket = io();

// console.log(socket.id)
socket.on("connect", () => {
  console.log(socket.id); 

});


// function will run when 
socket.on('returningGame', arg => {
  console.log(arg)
  if (arg != false) {
    socket.emit('userJoined', document.getElementById('name').value);
    window.location.href = '/lobby';
  }else {
    window.alert('Not a valid pin :(')
  }
})

function enterPress() {
  var uname = document.getElementById('name').value
  var pin = document.getElementById('pin').value
  socket.emit("pinEntered", {
    "name": uname,
    "pin": pin
  });
}