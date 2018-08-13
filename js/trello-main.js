var boards = [];

function displayBoard(id) {
	//use id to find correct board to display

	//Onloading the document render the board.The code starts from here
	document.body.onload = function () {
		for (let i = 0; i < boards.length; i++) {
			//get the board from boards that was clicked given the nodeid
			if (boards[i].id == id.split("_")[1]) {
				//re-create that board and load into html
				var title = boards[i].title;
				var board = new Board(title);
				board.render();
				document.getElementById('container').appendChild(board.node);
				currentBoard = board;
			}
		}
	}
}

function displayDash(boards) {
	function Dashboard(boards) {
		this.boards = boards;

		this.node = document.createElement("div");
		this.dashGrid = buildDashboardContainer(boards);
		//add click event to each board to direct to board w/ board id
	}

	Dashboard.prototype.render = function () {
		console.log(this.boards);
		this.node.appendChild(this.dashGrid);
	}

	Dashboard.prototype.registerBoard = function (board, index) {
		this.boards[board.id] = {
			board: board,
			index: index
		}
	}

	Dashboard.prototype.unregisterBoard = function (board) {
		delete this.boards[board.id]
	}

	//document.getElementById("addBoardLink").onclick = addBoard;
	//add event listener to dynamically created button too

	document.body.onload = function () {
		//pass in list of boards
		//var boards = [];
		var dashboard = new Dashboard(boards);
		dashboard.render();
		document.getElementById('container').appendChild(dash.node);
		dash = dashboard;
	}
}

displayDash(boards);