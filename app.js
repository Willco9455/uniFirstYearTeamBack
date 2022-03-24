// package imports 
const PORT = (process.env.PORT || 5000);

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
  }
});


httpServer.listen(PORT);

// objects Imports
const Game = require('./objects')


// aray that holds the game objects currently bieng played
const games = []

// for testing purposes
// var game = games[0]
// game.addPlayer('jonn')
// game.addPlayerScore('jonn')

console.log(PORT)

// defines the socket responses within this function when clients are conencted 
io.on("connection", (socket) => {

  socket.on('cJoinRoom', gamePin => {
    socket.join(gamePin)
  })

  // response when a client is attempting to join the game with a username given 
  socket.on('cUsrJoinAttempt', function (data, callback) {

    //  gets all pins currently in use
    var pins = games.map( x => x.pin)

    if (!pins.includes(data['pin'])){
      console.log('pin invalid')
      callback(false)
      return
    }

    // gets the game joinings index in the games array and adds the user to that specfifc game 
    var gameInd = games.findIndex(obj => obj.pin == data['pin'])
    game = games[gameInd]

    game.addPlayer(data['uname'])
    console.log(games[gameInd])

    // tells all users in the lobby with the same game pin that a new user has joined 
    io.to(data['pin']).emit('sUserJoined', data['uname']);
    callback(true)
    return

  });


  socket.on('cHostStartGame', function (gamePin) {
    io.to(gamePin).emit('sGameStarted')
    console.log('game start request recived by server')
  })

  // listener for the host clinet moving to next question 
  socket.on('cNextQ', function (gamePin) { 
    // gets the game joinings index in the games array and adds the user to that specfifc game 
    var gameInd = games.findIndex(obj => obj.pin == gamePin)
    game = games[gameInd]

    game.nextQ()
    io.to(gamePin).emit('sNextQ')
    console.log('moved to next question ')
  })

  // socket listener that recives the username of the person incrementing score and adds 1 to score
  socket.on('cAddPlayerScore', function(data) {
    // gets the game joinings index in the games array and adds the user to that specfifc game 
    gameInd = games.findIndex(obj => obj.pin == data['pin'])
    game = games[gameInd]

    game.addPlayerScore(data['uname'])
  })

  // sends whole quiz object down to client upon request
  socket.on('cGetQuiz', function(gamePin, callback) {
    var gameInd = games.findIndex(obj => obj.pin == gamePin)
    callback(games[gameInd])
  })

  // when client hosts a quiz
  socket.on('cCreateGame', function(data, callback) {
  
    //  gets all pins currently in use
    var pins = games.map( x => x.pin)


    valid = false
    while (!valid) {
      // generates random 4 digit number and turns into string
      var pin = Math.floor(1000 + Math.random() * 9000);
      var pin = pin.toString()

      // checks that pin isnt already in use
      if (!pins.includes(pin)) {
        valid = true
      }
    }
    console.log('valid pin ' + pin)

    var quiz = new Game(pin)
    quiz.loadQuestions('avengers')
    console.log(quiz)
    games.push(quiz)
    console.log(games)
    callback(pin)
  })

});



// functions for testing 

function clearLobby () {
  games[0].qnum = 0
  games[0].hostId = undefined
  games[0].clearPlayers()
  io.emit('sLobbyCleared')
  console.log('lobby cleared')
}
