var boards = new Array();

// ADD NEW BOARD MODAL
var modal = document.getElementById('myModal');
var cancel = document.getElementById('cancel');
var boardTitleText = document.getElementById('boardTitleText');
var addBoardBtn;




cancel.onclick = function () {
	modal.style.display = 'none';
}


function addNewBoard() {
	console.log("TITLE: ", boardTitleText.value);
	if (boardTitleText.value != null && boardTitleText.value != "") {
		var newBoard = new Board(boardTitleText.value, boards);
		newBoard.title = boardTitleText.value;
		boards.push(newBoard);
		displayDash(boards);
	}
	modal.style.display = 'none';
	boardTitleText.value = '';
	console.log(addBoardBtn);
}

function displayBoard() {
	var id = this.id;
	var boardId = id.toString().split("_");
	for (let i = 0; i < dash.boards.length; i++) {
		//get the board from boards that was clicked given the nodeid
		//var boardListId = boards[i].id.toString().split("_");
		if (boards[i].id == boardId[1]) {
			console.log("board before render", boards[i]);
			boards[i].render(boards[i]);
			console.log("board after render", boards[i]);
			document.getElementById('container').innerHTML = '';
			document.getElementById('container').appendChild(boards[i].node);
			currentBoard = boards[i];
		}
	}
	document.getElementById("dashboardLink").style.display = "none";
	document.getElementById("dashboardIcon").style.display = "block";
	document.getElementById("chatLink").style.display = "block";
	document.getElementById("addBoardLink").style.display = "none";
	document.getElementById("logo").onclick = function (evt) {
		displayDash(boards)
	};
	document.getElementById("dashboardIcon").onclick = function (evt) {
		displayDash(boards);
	};
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

	addBoardBtn = document.getElementById('addBoardBtn');
	addBoardBtn.onclick = function () {
		console.log("ADD CLICKED");
		modal.style.display = "block";
	}
	document.getElementById('create').onclick = function(evt) {
		addNewBoard();
	};
	document.getElementById('addBoardLink').onclick = function(evt) {
		modal.style.display = "block";
	};
	document.getElementById("dashboardIcon").style.display = "none";
	document.getElementById("chatLink").style.display = "none";
	document.getElementById("dashboardLink").style.display = "block";
	document.getElementById("addBoardLink").style.display = "block";
	document.getElementById("logo").onclick = function (evt) {
		displayDash(boards);
	};
	document.getElementById("dashboardLink").onclick = function (evt) {
		displayDash(boards);
	};
}

displayDash(boards);