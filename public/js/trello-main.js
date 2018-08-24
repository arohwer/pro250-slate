var boards = new Array();
var dashboard;

// ADD NEW BOARD MODAL
var modal = document.getElementById('myModal');
var editModal = document.getElementById('editBoardModal');
var cancel = document.getElementById('cancel');
var close = document.getElementById('close');
var boardTitleText = document.getElementById('boardTitleText');
var editTitleText = document.getElementById('editTitleText');
var addBoardBtn;
var editBoardBtn;

var deleteBoard = document.getElementById('delete');
var saveBoard = document.getElementById('save');

var selectedBoard;


cancel.onclick = function () {
	modal.style.display = 'none';
}

close.onclick = function () {
	editModal.style.display = 'none';
}

saveBoard.onclick = function () {
	if (editTitleText.value != null && editTitleText.value != "") {
		selectedBoard.title = editTitleText.value;
		selectedBoard.titleNode.innerHTML = selectedBoard.title;
		var colorClass;
		if (selectedBoard.boardBoxNode.classList.contains("c-blue")) {
			colorClass = "c-blue";
		}
		if (selectedBoard.boardBoxNode.classList.contains("c-pink")) {
			colorClass = "c-pink";
		}
		if (selectedBoard.boardBoxNode.classList.contains("c-orange")) {
			colorClass = "c-orange";
		}
		if (selectedBoard.boardBoxNode.classList.contains("c-green")) {
			colorClass = "c-green";
		}
		selectedBoard.boardBoxNode = buildBoardBoxNode(selectedBoard);
		if (colorClass != undefined) {
			selectedBoard.boardBoxNode.classList.add(colorClass);
		}
	}
	editModal.style.display = 'none';
	displayDash(boards);
}

deleteBoard.onclick = function () {
	dashboard.unregisterBoard(selectedBoard);
	editModal.style.display = 'none';
	displayDash(boards);
}

function addNewBoard() {
	if (boardTitleText.value != null && boardTitleText.value != "") {
		var newBoard = new Board(boardTitleText.value, boards);
		newBoard.title = boardTitleText.value;
		boards.push(newBoard);
		displayDash(boards);
	}
	modal.style.display = 'none';
	boardTitleText.value = '';
}

function displayBoard() {
	var id = this.id;
	var boardId = id.toString().split("_");
	for (let i = 0; i < dash.boards.length; i++) {
		//get the board from boards that was clicked given the nodeid
		if (boards[i].id == boardId[1]) {
			boards[i].render(boards[i]);
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
	var deleteCard = document.getElementById("card-edit-delete");
	deleteCard.onclick = function (evt) {

		//remove from list
		currentBoard.unregisterCard(cardEdit.card);

		//remove from dom
		cardEdit.card.list.cardsNode.removeChild(cardEdit.card.node);

		var cardModal = document.getElementById("card-edit");
		cardModal.style.display = "none";
		cardEdit.card = undefined;
	}
	var saveCard = document.getElementById("card-edit-submit");
	saveCard.onclick = function () {
		addCardSubmit();
	}
}

function editBoardMiddleware(i) {
	editModal.style.display = "block";
	editTitleText.value = boards[i].title;
	selectedBoard = boards[i];
}


function displayDash(boards) {
	dashboard = new Dashboard(boards);
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
		modal.style.display = "block";
	}

	editBoardBtn = document.getElementsByClassName('editBoardBtn');
	for (let i = 0; i < editBoardBtn.length; i++) {
		editBoardBtn[i].addEventListener('click', function () {
			editBoardMiddleware(i);
		});
	}

	document.getElementById('c-blue').onclick = function (evt) {
		var id = selectedBoard.id - 1;
		clearColorsList(boards[id].boardBoxNode);
		boards[id].boardBoxNode.classList.add('c-blue');
	}

	document.getElementById('c-pink').onclick = function (evt) {
		var id = selectedBoard.id - 1;
		clearColorsList(boards[id].boardBoxNode);
		boards[id].boardBoxNode.classList.add('c-pink');
	}

	document.getElementById('c-green').onclick = function (evt) {
		var id = selectedBoard.id - 1;
		clearColorsList(boards[id].boardBoxNode);
		boards[id].boardBoxNode.classList.add('c-green');
	}

	document.getElementById('c-orange').onclick = function (evt) {
		var id = selectedBoard.id - 1;
		clearColorsList(boards[id].boardBoxNode);
		boards[id].boardBoxNode.classList.add('c-orange');
	}

	document.getElementById('create').onclick = function (evt) {
		addNewBoard();
	};
	document.getElementById('addBoardLink').onclick = function (evt) {
		modal.style.display = "block";
	};
	document.getElementById("dashboardIcon").style.display = "none";
	document.getElementById("chatLink").style.display = "none";
	document.getElementById("dashboardLink").style.display = "block";
	document.getElementById("addBoardLink").style.display = "block";
	document.getElementById("logo-span").onclick = function (evt) {
		displayDash(boards);
	};
	document.getElementById("dashboardLink").onclick = function (evt) {
		displayDash(boards);
	};

	function clearColorsList(b) {
		var colorList = b.classList;
		if (colorList.length == 2) {
			colorList.remove(colorList[1]);
		}
	}
}


displayDash(boards);