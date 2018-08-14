var boards = new Array();
// var testBoard = new Board("Test");
// testBoard.title = "Test";
// boards[0] = testBoard;


function addNewBoard(){
	var newBoard = new Board("Board");
	newBoard.title = "Title 1";
	boards.push(newBoard);
	console.log("BOARDS: ", boards);
	displayDash(boards);
}


function displayBoard() {
	//use id to find correct board to display
	var id = this.id;
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

	//document.getElementById("addBoardLink").onclick = addBoard;
	//add event listener to dynamically created button too

	//click event for boards
	if (this.boards.length > 0) {
		var boardList = document.getElementsByClassName("boards");
		for (let i = 0; i < boardList.length; i++) {
			boardList[i].addEventListener('click', displayBoard);
			
		}
	}



	document.body.onload = function () {
		//pass in list of boards
		var dashboard = new Dashboard(this.boards);
		dashboard.render();
		document.getElementById('container').appendChild(dashboard.node);
		dash = dashboard;
		console.log("DASH INIT")
		var addBoardBtn = document.getElementById('addBoardBtn');
		addBoardBtn.addEventListener('click', addNewBoard);
	}


}


displayDash(boards);


function initDashboard(){
	
}

function load() {
	displayDash(boards);
}

var logoBtn = document.getElementById("logo");
logoBtn.addEventListener('click', load);