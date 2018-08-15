var boards = new Array();
// var testBoard = new Board("Test");
// testBoard.title = "Test";
// boards[0] = testBoard;

// ADD NEW BOARD MODAL
var modal = document.getElementById('myModal');
var cancel = document.getElementById('cancel');
var boardTitleText = document.getElementById('boardTitleText').value;




cancel.onclick = function() {
	modal.style.display='none';
}


function addNewBoard(){
	console.log("TITLE: ", boardTitleText)
	// var newBoard = new Board("SlateBoard");
	// newBoard.title = "Title 1";
	// boards.push(newBoard);
	// console.log("BOARDS: ", boards);
	// displayDash(boards);
	modal.style.display='none';
}

function newBoardModal(){

}


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
		//pass in list of boards
		var dashboard = new Dashboard(boards);
		dashboard.render();
		document.getElementById('container').innerHTML = '';
		document.getElementById('container').appendChild(dashboard.node);
		dash = dashboard;
		//click event for boards
		if (boards.length > 0) {
			var boardList = document.getElementsByClassName("boards");
			for (let i = 0; i < boardList.length; i++) {
				boardList[i].addEventListener('click', displayBoard);
				console.log("adding click events");
			}
		}
		console.log("DASH INIT")
		var addBoardBtn = document.getElementById('addBoardBtn');
		addBoardBtn.addEventListener('click', addNewBoard);
}

displayDash(boards);



//EVENT LISTENERS

var logoBtn = document.getElementById("logo");
logoBtn.addEventListener('click', load);

function load() {
	displayDash(boards);
}

addBoardBtn.onclick = function() {
	modal.style.display = "block";
}

var create = document.getElementById('create');
create.addEventListener('click', addNewBoard)


