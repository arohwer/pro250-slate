var boards = new Array();

function addNewBoard() {
	var newBoard = new Board("Title 1");
	boards.push(newBoard);
	//console.log("BOARDS: ", boards);
	displayDash(boards);
}

function newBoardModal(){

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
		addBoardBtn.addEventListener('click', addNewBoard);
}

displayDash(boards);



//EVENT LISTENERS

var logoBtn = document.getElementById("logo");
logoBtn.addEventListener('click', load);

function load() {
	displayDash(boards);
}

//ADD NEW BOARD MODAL
var modal = document.getElementById('myModal');

var span = document.getElementsByClassName("close")[0];

// addBoardBtn.onclick = function() {
//     modal.style.display = "block";
// }

// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
