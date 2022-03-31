// package imports 
const PORT = (process.env.PORT || 5000);

// sets up http server with socket.io
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});


httpServer.listen(PORT);

// objects Imports
const Game = require('./objects')

// aray that holds the game objects currently bieng played
const games = []

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

  // responds to game start request send from the game hosts browser
  socket.on('cHostStartGame', function (gamePin) {
    // emmits game start event to all clinents with in the game 
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
  socket.on('cCreateGame', function(quizName, callback) {
  
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

    // creates the new quiz and adds it to gamwe array
    var quiz = new Game(pin)
    quiz.loadQuestions(quizName)
    games.push(quiz)
    
    // send the pin back to the hosts browser
    callback(pin)

  })

  // server response when host clicks end game button on leaderboard page
  socket.on('cEndQuiz', function (gamePin, callback) {
    console.log('deleted quiz ' + gamePin)
    io.to(gamePin).emit('sEndQuiz')
    // gets the index of the pin passed into the funciton within the games array 
    var gameInd = games.findIndex(obj => obj.pin == gamePin)
    // removes the quiz from the array 
    games.splice(gameInd, 1);
  })

});

