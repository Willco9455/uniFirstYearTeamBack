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
  // asks server for list of player object [{uname, score}] and then filters just usernames
  socket.emit('cGetPlayers', false, (data) => {
    players = data.map(obj => {
      return obj.uname
    })
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



