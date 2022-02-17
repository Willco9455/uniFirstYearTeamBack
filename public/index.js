const socket = io();
var unameElm = document.getElementById('name')

// console.log(socket.id)
socket.on("connect", () => {
  console.log(socket.id); 
});


// function will run when 
socket.on('sJoinSuccess', arg => {
  if (arg != false) {
    window.location.href = '/lobby';
  }else {
    window.alert('Not a valid pin :(')
  }
})


function enterPress() {
  var uname = unameElm.value
  socket.emit("cUsrJoinAttempt", {
    "uname": uname,
  });
}