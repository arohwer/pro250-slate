	//Board constructor object and assign some properties to its prototype

	function buildBoardBoxNode(this) {
		this.title
	}
	function Board(title, boards) {
		var nextId;

		if (boards.length > 0) {
			var lastBoardIndex = boards.length - 1;
			nextId = boards[lastBoardIndex].id;
		}
		else {
			nextId = 0;
		}

		this.title = title;
		this.lists = [];
		this.cards = {};

		this.node = document.createElement('div');
		this.titleNode = document.createElement('div');
		this.listsNode = document.createElement('div');

		this.boardBoxNode = buildBoardBoxNode(this);

		this.node.className = "boards";
		this.titleNode.id = 'trello-title-board';
		this.listsNode.id = 'trello-canvas-board';

		// new list title form
		this.titleFormNode = buildListTitleForm();
		this.titleNode.appendChild(document.createTextNode(this.title));

		this.getNextId = function () {
			var id = parseInt(nextId, 10);
			return '_' + (id += 1).toString();
		}

		this.id = this.getNextId().split("_")[1];
		this.node.id = 'board_' + this.id;
	}

	Board.prototype.render = function () {
		console.log("LISTS", this.lists);
		if (this.lists.length === 0) {
			this.lists.push(new List(this, '+ Add list', 0, true))
		}
		for (var i = 0; i < this.lists.length; ++i) {
			this.listsNode.appendChild(this.lists[i].node)
		}
		this.lists[this.lists.length - 1].node.appendChild(this.titleFormNode)
		this.lists[this.lists.length - 1].titleNode.onclick = addListTrello(this)
		this.node.appendChild(this.titleNode)
		this.node.appendChild(this.listsNode)
	}

	Board.prototype.registerCard = function (card, index) {
		this.cards[card.id] = {
			card: card,
			list: card.list,
			index: index
		}
	}

	Board.prototype.reregisterSubsequent = function (list, index, shift) {
		for (var i = index; i < list.cards.length; ++i) {
			this.registerCard(list.cards[i], i + shift)
		}
	}

	Board.prototype.unregisterCard = function (card) {
		delete this.cards[card.id]
	}

	Board.prototype.unregisterList = function (index, listToDel, currBoard) {
		//console.log("list to delete", index);
		//console.log("current board", currBoard);
		if (listToDel != undefined) {
			if (listToDel.title != "+ Add list") {
				// var int = parseInt(index, 10)
				//index = index - 1;
				var index = currBoard.lists.indexOf(listToDel);
				//console.log("index to delete", index);
				this.lists.splice(index, 1);
				//console.log("NEW LISTS", this.lists);
			}
		}
		document.getElementById("trello-canvas-board").innerHTML = '';
		currBoard.render();
	}


	document.getElementById('card-edit-close').onclick = cardEdit.close

	document.getElementById('card-edit-submit').onclick = cardEdit.submit

	document.getElementById('card-edit-delete').onclick = cardDeleteTrello.delete

	cardEdit.windowOverlay.onclick = cardEdit.close

	//if you click on escape then also the edit window will get closed
	window.onkeydown = function (evt) {
		if (evt.keyCode === 27) {
			cardEdit.close()
		}
	}