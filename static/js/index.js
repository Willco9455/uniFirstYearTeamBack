const socket = io();
var unameElm = document.getElementById('name');
var players = []
getPlayers()

socket.on("connect", () => {
  console.log(socket.id); 
});

// function will run when 
socket.on('sJoinSuccess', arg => {
  if (arg != false) {
    localStorage.setItem('uname', unameElm.value)
    window.location.href = `/lobby/${localStorage.getItem('uname')}`;
  }else {
    window.alert('Not a valid pin :(')
  }
})


function randomButton() {
  console.log(players)
}

function getPlayers() {
  // will get the list of players in the game and save them to the platers variabele 
  socket.emit('cGetPlayers', false, (answer) => {
    players = answer
  })

}

function enterPress() {
  var uname = unameElm.value
  if (players.includes(uname)) {
    alert('username Taken')
    unameElm.value = ''
    return
  }
  socket.emit("cUsrJoinAttempt", {
    "uname": uname,
  });
};



