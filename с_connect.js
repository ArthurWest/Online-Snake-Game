const socket = io("https://Online-Snake-Game.arthurwest.repl.co");
let Table;

function start() {
	//Cheking for conntetion
	let serverOnline = true;

	if (serverOnline) {

		const connectBtn = document.getElementById('connectBtn');
		//Styling the button because server is online
		connectBtn.removeAttribute("disabled");
		connectBtn.style.backgroundColor = "lime";
		connectBtn.style.cursor = "pointer";

		connectBtn.addEventListener("click", function() {
			//Connect
			//const serverNumber = document.getElementById("serverNumberInput").value; Uselles since there is only one server
			const playerNumber = document.getElementById("playerNumberInput").value;
			socket.emit("connectToServer", playerNumber);//Trying to connect
			socket.on("connectedGood", function(configObj) {
				//Connection is established
				console.log('connected')
				//Configuring canvas
				Table = configObj;
				const canvas = document.getElementById("canvasElement");
				canvas.width = Table.canvasWidth
				canvas.height = Table.canvasHeight
			});
			
		});
		


	}
}
start();
