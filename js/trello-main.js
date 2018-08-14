

function displayBoard() {
	//use id to find correct board to display
	var id = this.id;
	console.log("BOARD CLICKED", id);
	var boardId = id.toString().split("_");
	console.log("split", boardId[2]);
	console.log("BOARDS", dash.boards);
	//Onloading the document render the board.The code starts from here

		for (let i = 0; i < dash.boards.length; i++) {
			//get the board from boards that was clicked given the nodeid
			var boardListId = boards[i].id.toString().split("_");
			console.log("BOARD ID", boardListId);
			if (boardListId[1] == boardId[2]) {
				console.log("board match");
				//re-create that board and load into html
				var title = boards[i].title;
				var board = new Board(title);
				board.render();
				document.getElementById('container').innerHTML = '';
				document.getElementById('container').appendChild(board.node);
				currentBoard = board;
			}
		}
	
}

function displayDash(boards) {

	function Dashboard(boards) {
		this.boards = boards;
		console.log(this.boards);
		this.node = document.createElement("div");
		this.dashGrid = buildDashboardContainer(this.boards);
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

	document.body.onload = function () {
		//pass in list of boards
		var dashboard = new Dashboard(this.boards);
		dashboard.render();
		document.getElementById('container').appendChild(dashboard.node);
		dash = dashboard;
		//click event for boards
		if (this.boards.length > 0) {
			var boardList = document.getElementsByClassName("boards");
			for (let i = 0; i < boardList.length; i++) {
				boardList[i].addEventListener('click', displayBoard);
				console.log("adding click events");
			}
		}
	}
}

var boards = new Array();
var testBoard = new Board("Test");
testBoard.title = "Test";
boards.push(testBoard);
displayDash(boards);

function load() {
	displayDash(boards);
}

var logoBtn = document.getElementById("logo");
logoBtn.addEventListener('click', load);