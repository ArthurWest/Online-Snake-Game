//Needed for sockets, i dunno why
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//Setting up 
var Server = require('./server.js');
Server.createGrid();
var Snake1 = require('./snake.js');
Snake1.grid = Server.grid;
Snake1.pickNewLocationForFood();
//Just the heading
app.get('/', function(req, res){
  res.send('<h1>Online Snake Game by Arthur West</h1>');
});
//The real deal
io.on('connection', function(socket){
  console.log('a user connected');
  //After pressing the Connect button
  socket.on("connectToServer", function(playerNum) {
    if (playerNum == 1) {
      Server.player1 = true
    } else {
      Server.player2 = true
    }
    socket.emit("connectedGood", Server)
   // console.log(Server)

   
  });
// 

  socket.on("getDataFromServer", function(playerNum){
    socket.emit("gotDataFromServer", {tail: Snake1.tail, hasMoved: Snake1.hasMoved, food: Snake1.food})
  });

  socket.on("sendDataToServer", function(directionX, directionY) {
    Snake1.setDirection(directionX, directionY);
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
console.log()//For stopping server loggin itself for some reason