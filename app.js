// package imports 
const e = require("express");
const express = require("express");
const socket = require("socket.io");

// objects Imports
const Game = require('./objects')

// App setup
const PORT = (process.env.PORT || 5000);
const app = express(); 
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// sets up ejs view engine for use
app.set('view engine', 'ejs')
// makes static available to server thorugh / path, / static now acts like the route path 
app.use(express.static("static"));

// Socket setup
const io = socket(server);

const games = [new Game('1234')]

// defines the socket responses within this function when clients are conencted 
io.on("connection", (socket) => {

  // response when a client is attempting to join the game with a username given 
  socket.on('cUsrJoinAttempt', arg => {
    games[0].addPlayer(arg['uname']);

    // send event to all clients saying a new user has joined and passing their username
    io.emit('sUserJoined', arg['uname']);

    // sends message back to the client that just joined telling them they have successfully joined 
    // used late for checking the username does not already exist
    socket.emit('sJoinSuccess');
    console.log(`${arg['uname']} joined`);

  })

  socket.on('cGetPlayers', arg => {
    var game = games[0]
    // this takes the array of uses for the game and creates an array of just the usrenames for the players
    var players = game.players.map(obj => {
      return obj.uname
    })
    socket.emit('sReturnPlayers', players)
  })
  
});


// response when the home page is loaded
app.get('/', function (req, res) {
  res.render('index')
});

app.get('/login', function (req, res) {
  res.render('login')
});

app.get('/register', function (req, res) {
  res.render('register')
});

app.get('/lobby', function (req, res) {
  res.render('lobby')
  
});

app.get('/clearLobby', function(req, res) {
  console.log('lobbyCleared')
  clearLobby()
  res.redirect('/lobby');
})



// functions for testing 

function clearLobby () {
  games[0].clearPlayers()
  io.emit('sLobbyCleared')
  console.log('lobby cleared')
}