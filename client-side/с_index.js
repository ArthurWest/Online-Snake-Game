const canvas = document.getElementById('canvasElement');
const ctx = canvas.getContext("2d");
Snake.setup();
function mobControlsSetup() {
  let mobControls = document.getElementById("mobControlsInp");
  mobControls.addEventListener("change", function() {display()})

  const buttons = document.getElementsByClassName('mobControlBtn');
  this.up = buttons[0]
  this.left = buttons[1]
  this.down = buttons[2]
  this.right = buttons[3]
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("value", i)
    buttons[i].addEventListener("click", function() {
      key = this.getAttribute("value");
      if (key == "0") {
        Snake.setDirection(0, -1);
      } else if  (key == "1") {
        Snake.setDirection(-1, 0);
      } else if  (key == "2") {
        Snake.setDirection(0, 1);
      } else if  (key == "3") {
        Snake.setDirection(1, 0);
      }
    })
  }
  function display() {
    const state = mobControls.checked;
    if (state) {
      document.getElementById("mobControls").style.display = "block";
    } else {
      document.getElementById("mobControls").style.display = "none";
    }
  }
}
mobControlsSetup();
// function draw() {
// 	ctx.fillStyle = "white"
// 	ctx.fillRect(0,0,canvas.width, canvas.height)
// 	// Snake.update()
// }
// draw()
