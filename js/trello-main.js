var boards = new Array();

// ADD NEW BOARD MODAL
var modal = document.getElementById('myModal');
var cancel = document.getElementById('cancel');
var boardTitleText = document.getElementById('boardTitleText');




cancel.onclick = function() {
	modal.style.display='none';
}


function addNewBoard(){
	console.log("TITLE: ", boardTitleText.value);
	if(boardTitleText.value != null && boardTitleText.value != ""){
		var newBoard = new Board(boardTitleText.value);
		newBoard.title = boardTitleText.value;
		boards.push(newBoard);
		displayDash(boards);
	}
	modal.style.display='none';
	console.log(addBoardBtn);
}

function displayBoard() {
	var id = this.id;
	var boardId = id.toString().split("_");
		for (let i = 0; i < dash.boards.length; i++) {
			//get the board from boards that was clicked given the nodeid
			var boardListId = boards[i].id.toString().split("_");
			if (boardListId[1] == boardId[2]) {
				console.log("board before render", boards[i]);
				boards[i].render(boards[i]);
				console.log("board after render", boards[i]);
				document.getElementById('container').innerHTML = '';
				document.getElementById('container').appendChild(boards[i].node);
				currentBoard = boards[i];
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
			}
		}
		var addBoardBtn = document.getElementById('addBoardBtn');
}

displayDash(boards);



//EVENT LISTENERS

var logoBtn = document.getElementById("logo");
logoBtn.addEventListener('click', load);

function load() {
	displayDash(boards);
}

addBoardBtn.onclick = function() {
	console.log("ADD CLICKED")
	modal.style.display = "block";
}

var create = document.getElementById('create');
create.addEventListener('click', addNewBoard)


