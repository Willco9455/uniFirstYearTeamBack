const e = require("express");
const express = require("express");
const socket = require("socket.io");

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

function user(uname) {
  this.uname = uname;
}

// quiz object 
function game(pin) {
  this.title = 'Game Title';
  this.pin = pin;
  this.hostId = '123'
  this.getPin = function () {
    return(this.pin)
  }
  this.players = [new user('test1'),new user('test2')]

}

const games = [new game('123'), new game('456'), new game('789')]

function getGameObj(pin) { 
  var game = games.filter(x => x.pin == pin)
  if (game.length == 0) { 
    return false
  } else{
    return game 
  }
}


io.on("connection", (socket) => {
  console.log('connection')


  socket.on("hello", function (arg) {
    console.log(arg);
  })

  socket.on('pinEntered', pin => {
    var game = getGameObj(pin);
    socket.emit('returningGame', game);
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


// const mainRouter = require('./routes/mainRouter') 
// app.use('', mainRouter)