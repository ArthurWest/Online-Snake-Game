//Needed for sockets, i dunno why
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//Setting up 
var Server = require('./s_server.js');
Server.createGrid();
let Snake = require('./s_snake.js');

let Snake1 = new Snake(Server.grid, Server)
let Snake2 = new Snake(Server.grid, Server)

const Snakes = [Snake1, Snake2];

// Server.player1 = Snake1;
// Server.player2 = Snake2;
Server.pickNewLocationForFood();
//Just the heading
app.get('/', function(req, res){
  res.send('<h1>Online Snake Game by Arthur West</h1>');
});
//The real deal
io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit("ServerOnline");
  socket.on("connectToServer", function(playerNum) {
    //After pressing the Connect button
    if (playerNum == 1) {
      Server.player1 = true
      let updateTimer = setInterval(sendData, 200);
    } else {
      Server.player2 = true
    }
    socket.join("Server1");
    socket.emit("connectedGood", Server)//Sending the config data to the client
   // console.log(Server)
  //Timer for sending date to the client
  
  function sendData() {
    Snake1.update()
    Snake2.update()
    io.to('Server1').emit("gotDataFromServer", [{tail: Snake1.tail, hasMoved: Snake1.hasMoved, food: Server.food}, {tail: Snake2.tail, hasMoved: Snake2.hasMoved, food: Server.food}])
  }
  });
// 

  socket.on("getDataFromServer", function(playerNum){
    socket.emit("gotDataFromServer", {tail: Snake1.tail, hasMoved: Snake1.hasMoved, food: Snake1.food})
  });

  socket.on("sendDataToServer", function(playerIndex,directionX, directionY) {
    Snakes[playerIndex].setDirection(directionX, directionY);
  });

  socket.on("updateSnake", function() {
    Snake1.update();
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
console.log("Starting... ")//For stopping server loggin itself for some reason