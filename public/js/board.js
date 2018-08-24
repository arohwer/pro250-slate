	//Board constructor object and assign some properties to its prototype
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
		//this.cards = {};

		this.node = document.createElement('div');
		this.titleNode = document.createElement('div');
		this.listsNode = document.createElement('div');
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

		this.boardBoxNode = buildBoardBoxNode(this);

	}

	function buildBoardBoxNode(obj) {
		var node = document.createElement('div')
		node.classList.add('boardBox');
		node.innerHTML =
			`<i class="fas fa-pencil-alt editBoardBtn" id="${obj.id}"></i>` +
			`<h6 id="board_${obj.id}" class="boardName boards">${obj.title}</h6>` 
		return node;
	}

	Board.prototype.render = function () {
		//console.log("LISTS", this.lists);
		if (this.lists.length === 0) {
			this.lists.push(new List(this, '+ Add list', 0, true));
		}
		for (var i = 0; i < this.lists.length; ++i) {
			this.listsNode.appendChild(this.lists[i].node);
		}
		this.lists[this.lists.length - 1].node.appendChild(this.titleFormNode);
		this.lists[this.lists.length - 1].titleNode.onclick = addListTrello(this);
		this.node.appendChild(this.titleNode);
		this.node.appendChild(this.listsNode);
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
		var listToDeleteFrom = card.list.cards;
		var index = listToDeleteFrom.indexOf(card);
		//console.log("card to delete", index);
		listToDeleteFrom.splice(index, 1);
	}

	Board.prototype.unregisterList = function (index, listToDel, currBoard) {
		//console.log("list to delete", index);
		//console.log("current board", currBoard);
		if (listToDel != undefined) {
			if (listToDel.title != "+ Add list") {
				var index = currBoard.lists.indexOf(listToDel);
				this.lists.splice(index, 1);
			}
		}
		document.getElementById("trello-canvas-board").innerHTML = '';
		currBoard.render();
	}


	document.getElementById('card-edit-close').onclick = cardEdit.close;