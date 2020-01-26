const Server = {
  player1: null,
  player2: null,
  canvasWidth:400,
	canvasHeight:400,
	cell:{width:20, height:20},
	grid: null,
	createGrid: function() {
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
	}
}
module.exports = Server;