class Snake {
	constructor(grid, Table) {
    this.x = 0;
    this.y = 0;
    this.grid = grid;
    this.tail = [];
    this.parts = 1;
    this.originalDirectionX = 0;
    this.originalDirectionY = 0;
    this.hasMoved = true;
    this.directionX = 0;
    this.directionY = 0;
    this.food = null;
    this.Table = Table;
  };
	update() {
		this.move();
		this.hasMoved = true;
		this.originalDirectionX = this.directionX;
		this.originalDirectionY = this.directionY;
		// this.render();
	};
	setDirection(x, y) {
		if (this.originalDirectionX + x == 0 && this.originalDirectionY + y == 0) {
			//Don't move, pass
		} else {
			this.directionX = x;
			this.directionY = y;
			this.hasMoved = false;
		};
	};
	move() {
		const cols = this.grid.length-1;//Index of the last col
		const rows = this.grid[0].length-1;//Index of the last row
		//Checking for boundaries
		if (this.x == 0 && this.directionX == -1) {//Going left
			this.x = cols
		} else if (this.x == cols && this.directionX == 1) {//Going right
			this.x=0
		} else if (this.y == 0 && this.directionY == -1) {//Going top
			this.y = rows
		} else if (this.y == rows && this.directionY == 1) {//Going bottom
			this.y = 0
		} else {//Normal way
			this.x += this.directionX
			this.y += this.directionY
		}
		//Cheking for collision
		if (this.grid[this.x][this.y].snake == true) { //If in the cell we are moving is a part of snake, then length = 1
			this.parts=1
			console.log("collision")
		}
		//Moving, we are all set
		this.grid[this.x][this.y].snake = true //Add snake to the cell
		this.tail.push(this.grid[this.x][this.y])//Add this cell to the body
		this.moved = true; // Has the snake moved since the last change of direction. It's for bug fixing

		if (this.grid[this.x][this.y].food == true) { //If in the cell we are moving is food, then length += 1
			this.parts += 1
			this.grid[this.x][this.y].food = false
			this.Table.pickNewLocationForFood();
		}

		//Deleting snake from past cells
		for (let i = 0; i < this.tail.length-this.parts; i++) {
			this.tail[i].snake = null;
			// this.tail.splice(i, 1)
		}
		//Cutting tail
		this.tail.splice(0, this.tail.length-this.parts)
	}
	render() {
		for (let i = 0; i < this.tail.length; i++) {
			this.tail[i].render();
		}
		this.food.render();
	}
};
module.exports = Snake;