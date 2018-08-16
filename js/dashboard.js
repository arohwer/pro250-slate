
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
		console.log("IN UNREGISTER")
		var index = this.boards.indexOf(board);
		if (index > -1) {
			this.boards.splice(index, 1);
		}
	}




