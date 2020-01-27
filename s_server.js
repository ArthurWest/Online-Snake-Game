const Server = {
  player1: null,
  player2: null,
  canvasWidth:400,
	canvasHeight:400,
	cell:{width:20, height:20},
	grid: null,
  food: null,
	createGrid() {
    //Helper class
    class Cell {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.snake = null;
        this.food = null;
      }
    }
    //The function itself
		const cols = this.canvasWidth/this.cell.width;
		const rows = this.canvasHeight/this.cell.height;
		const grid = make2Darray(cols, rows);
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = new Cell(i, j)
			}
		}
		this.grid = grid;
    //Helper function
    function make2Darray(x, y) {
      let ar = new Array(x);
      for (let i = 0; i < x; i++) {
        ar[i] = new Array(y);
      }
      return ar;
    };
	},
  pickNewLocationForFood() {
		/** This function picks a new location for food where there is no snake
		Returns nothing, just ends if there is no more space to choose from
		*/
		const options = []
		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0; j < this.grid[0].length;j++) {
				if (this.grid[i][j].snake == null) {
					options.push(this.grid[i][j])	
				}
			}
		}
		if (options.length < 1) {
			console.log("There is no more space. Game has ended")
			return;
		}

		const randomIndex = Math.floor(Math.random() * options.length);
		let foodCell = options[randomIndex];

		foodCell.food=true;
		this.food = foodCell;
	}
}
module.exports = Server;