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

// response when the home page is loaded
app.get('/', function (req, res) {
  res.render('index', {
    text: 'hello'
  })

})

app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/register', function (req, res) {
  res.render('register')
})



io.on("connection", (socket) => {
  console.log('connection')
  
  // socket.emit("hello", "world");
  socket.on("hello", function (arg) {
    console.log(arg);
  })
  
});
