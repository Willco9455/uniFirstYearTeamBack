const socket = io();

var game = undefined
var gameId = '';

// console.log(socket.id)
socket.on("connect", () => {
    console.log(socket.id + 'connected on lobby'); 
});

socket.on("serverSentGame", game => {
  game = game
})


function getGame() {
  socket.emit('clientGetGame', true)

}

getGame()

for (i in )
