const Snake = {
	originalDirectionX: 0,
	originalDirectionY: 0,
	hasMoved: true,
	directionX: 0,
	directionY: 0,
	tail: [],
	setDirection: function(x, y) {
		if (this.originalDirectionX + x == 0 && this.originalDirectionY + y == 0) {
			//Don't move, pass
		} else {
			this.directionX = x;
			this.directionY = y;
			this.hasMoved = false;
			// console.log('changed direction')
			this.sendData()
		};
	},
	setup: function() {
		//setting up webjhook for getting data from the server
		const snakeInstant = this;
		socket.on("gotDataFromServer", function(properties){
			// console.log('got data')
			snakeInstant.hasMoved = properties.hasMoved
			snakeInstant.tail = properties.tail
			snakeInstant.food = properties.food

			snakeInstant.render();
		})
	},
	sendData: function() {
		socket.emit("sendDataToServer", this.directionX, this.directionY)
		// console.log('sent')
	},
	getData: function() {
		socket.emit("getDataFromServer", 1);
	},
	update: function() {
		socket.emit("updateSnake");
		// console.log('updated')
	},
	render: function() {
		// console.log("render")
		const canvas = document.getElementById('canvasElement');
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "white"
		ctx.fillRect(0,0,canvas.width, canvas.height)
		for (let i = 0; i < this.tail.length; i++) {
					ctx.fillStyle = "black"
					ctx.fillRect(this.tail[i].x*Table.cell.width, this.tail[i].y*Table.cell.height, Table.cell.width, Table.cell.height)
		}
		if (this.food) {
			ctx.fillStyle = "red"
			ctx.fillRect(this.food.x*Table.cell.width, this.food.y*Table.cell.height, Table.cell.width, Table.cell.height)
		}
	},
	// move: function() {
	// 	this.update();
	// }
}
document.addEventListener("keydown", keyHandler);
function keyHandler(event) {
	const key = event.key.toLowerCase()
	if (key == "w") {
		Snake.setDirection(0, -1);
	} else if  (key == "d") {
		Snake.setDirection(1, 0);
	} else if  (key == "s") {
		Snake.setDirection(0, 1);
	} else if  (key == "a") {
		Snake.setDirection(-1, 0);
	} else if (key == "f") {
		draw()
	} else if (key == "g") {
		Snake.getData();
	} else if (key == "h") {
		Snake.sendData();
	} else if (key == "r") {
		Snake.render();
	} else if (key == "u") {
		Snake.update();
	} /*else if (key == "m") {
		Snake.move();
	}*/ else {
		// Do nothing
		console.log(key)
	}

}