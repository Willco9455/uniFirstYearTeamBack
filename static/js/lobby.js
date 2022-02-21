var uname = localStorage.getItem("uname")
if (uname == null) { 
  window.alert("you need to enter a username first!")
  window.location.href = "/";
}

const socket = io();

var players = []

// console.log(socket.id)
socket.on("connect", () => {
    console.log(socket.id + 'connected on lobby'); 
});

// on response to a user joing the game the sever has sent the new users name as the argument
socket.on('sUserJoined', arg => {
  console.log(`new user joined ${arg}`)
  players.push(arg)
  updateLobby()
})

socket.on('sLobbyCleared', arg => {
  console.log('got clearance')
  players.length = 0
  updateLobby()
})

function addUser(uname) {
  var div = document.getElementById('usernames')
  var newPara = document.createElement('div');
  newPara.innerHTML = uname
  div.appendChild(newPara)
}

function updateLobby() {
  document.getElementById('usernames').innerHTML = '';
  for (i of players) {
    addUser(i)
  }
}

function getUsers() {
  socket.emit('cGetPlayers', false, (response) => {
    players = response
    updateLobby()
  })
}

getUsers()
// console.log(`date ${Date.now()}`)