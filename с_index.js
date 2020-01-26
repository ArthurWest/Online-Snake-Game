const canvas = document.getElementById('canvasElement');
const ctx = canvas.getContext("2d");
function draw() {
	ctx.fillStyle = "white"
	ctx.fillRect(0,0,canvas.width, canvas.height)
	// Snake.update()
}
draw()
