const socket = io();

var gameId = '';

// console.log(socket.id)
socket.on("connect", () => {
    console.log(socket.id + 'connected on lobby'); 
  });