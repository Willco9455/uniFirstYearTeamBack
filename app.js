// package imports 
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
app.use(express.static(__dirname + "/static"));

// Socket setup
const io = socket(server);

// aray that holds the game objects currently bieng played
const games = [new Game('1234')]

// for testing purposes
var game = games[0]
// game.setHost('testHost')
// game.addPlayer('testUser1')
// game.addPlayer('testUser2')
// game.addPlayer('testUser3')
// game.addPlayer('testUser4')
// game.addPlayer('testUser5')
// game.addPlayer('jonn')
// game.addPlayerScore('jonn')
// game.addPlayerScore('jonn')
// game.addPlayerScore('jonn')
// game.addPlayerScore('testUser1')
// game.addPlayerScore('testUser4')
// game.addPlayerScore('testUser4')
// game.addPlayerScore('testUser4')
// game.addPlayerScore('testUser4')
// game.addPlayerScore('testUser1')
// game.addPlayerScore('testUser3')
// game.addPlayerScore('testUser4')
// game.addPlayerScore('testUser2')

// defines the socket responses within this function when clients are conencted 
io.on("connection", (socket) => {

  // response when a client is attempting to join the game with a username given 
  socket.on('cUsrJoinAttempt', arg => {
    if (games[0].hostId == undefined) {
      games[0].setHost(arg['uname'])
      socket.emit('sJoinSuccess');
      return
    }
    
    games[0].addPlayer(arg['uname']);

    // send event to all clients saying a new user has joined and passing their username
    io.emit('sUserJoined', arg['uname']);

    // sends message back to the client that just joined telling them they have successfully joined 
    // used late for checking the username does not already exist
    socket.emit('sJoinSuccess');
    console.log(`${arg['uname']} joined`);

  })

  socket.on('cGetPlayers', function (data, callback) {
    var game = games[0]
    // this takes the array of uses for the game and creates an array of just the usrenames for the players
    var players = game.getPlayers()
    callback(players)
  })

  socket.on('cHostStartGame', function (data) {
    io.emit('sGameStarted')
    console.log('game start request recived by server')
  })

  socket.on('cGetQuestions', function (data, callback) { 
    callback(games[0].getQuestions())
  })

  // returns the current question number to the socket that requested it
  socket.on('cGetQNum', function (data, callback) { 
    callback(games[0].getQNUm())
  })

  // listener for the host clinet moving to next question 
  socket.on('cNextQ', function (data) { 
    games[0].nextQ()
    io.emit('sNextQ')
    console.log('moved to next question ')
  })

  // socket listener that recives the username of the person incrementing score and adds 1 to score
  socket.on('cAddPlayerScore', function(data) {
    games[0].addPlayerScore(data)
  })

  // sends whole quiz object down to client upon request
  socket.on('cGetQuiz', function(data, callback) {
    callback(games[0])
  })

});


// response when the home page is loaded
app.get('/', function (req, res) {
  if (games[0].hostId == undefined) {
    console.log('no host')
    res.render('index', {host: false})
  } else {
    console.log('has host')
    res.render('index', {host: true})
  }
});

app.get('/login', function (req, res) {
  res.render('login')
});

app.get('/register', function (req, res) {
  res.render('register')
});

app.get('/lobby/:uname', function (req, res) {
  console.log(games[0].hostId)
  console.log(req.params.uname)
  res.render('lobby', {
    uname: req.params.uname,
    hostId: games[0].hostId
  })
});

app.get('/game', function (req, res) {
  res.render('gameplay')
});

app.get('/leaderboard', function(req, res) {
  res.render('leaderboard')
})

app.get('/clearLobby', function(req, res) {
  console.log('lobbyCleared')
  clearLobby()
  res.redirect('/');
})


// functions for testing 

function clearLobby () {
  games[0].hostId = undefined
  games[0].clearPlayers()
  io.emit('sLobbyCleared')
  console.log('lobby cleared')
}
