var uname = localStorage.getItem("uname")

if (uname != null) { 
  if (confirm("You are already in the game would you like to leave the game?")) {
    localStorage.removeItem('uname');
    window.location.href = '/';
  } else {
    window.location.href = '/lobby';
  }
};


const socket = io();
var unameElm = document.getElementById('name');

// console.log(socket.id)
socket.on("connect", () => {
  console.log(socket.id); 
});


// function will run when 
socket.on('sJoinSuccess', arg => {
  if (arg != false) {
    localStorage.setItem('uname', unameElm.value)
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