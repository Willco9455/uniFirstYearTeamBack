// external imports 
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

// Socket setup
const io = socket(server);

// sets up ejs view engine for use
app.set('view engine', 'ejs')
// Static files
app.use(express.static("public"));


const games = [new Game('1234'), new Game('1233')]


io.on("connection", (socket) => {
  console.log('connection')


  socket.on("hello", function (arg) {
    console.log(arg);
  })

  socket.on('pinEntered', arg => {
    console.log(arg)
    console.log(arg['name'])
    var pin = arg['pin']
    var gameIndex =  games.findIndex(x => x.pin == pin)
    if (gameIndex == -1) {
      send = false
    } else {
      var send = games[gameIndex]
      send.addPlayer(arg['name'])
    }
    
    // console.log(games)
    socket.emit('returningGame', send);
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
