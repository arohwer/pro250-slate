function List(board, title, index, dummyList) {
	//console.log("board passed in", board);

	this.board = board
	this.dummyList = dummyList
	this.title = title
	this.index = index
	this.node = document.createElement('div')
	this.titleNode = document.createElement('div')
	this.cardsNode = document.createElement('div')
	this.iconNode = document.createElement('div')
	this.listTop = document.createElement('div')
	this.listTop.classList.add('list-top')
	this.iconNode.classList.add('list-trash-container')
	this.node.classList.add('list')
	this.titleNode.classList.add('list-title')
	this.cardsNode.classList.add('list-cards')
	this.titleNode.id = "trello-list-title-input";
	this.titleNode.setAttribute('list-index', index);
	this.titleNode.setAttribute("contenteditable", true);
	this.titleNode.appendChild(document.createTextNode(this.title))
	var icon = document.createElement('i');
	icon.classList.add("far");
	icon.classList.add("fa-trash-alt");
	this.iconNode.appendChild(icon);
	this.listTop.appendChild(this.titleNode);
	this.listTop.appendChild(this.iconNode);
	this.node.appendChild(this.listTop);

	if (this.dummyList == true) {
		this.iconNode.style.display = "none";
	}
	var nextId;

	if (this.board.lists.length > 0) {
		var nextId = this.index;
		//console.log("last id", nextId);
	} else {
		nextId = 0;
	}

	this.getNextId = function () {
		var id = parseInt(nextId, 10);
		if (dummyList == false) {
			id = id + 1;
		}
		return '_' + (id).toString();
	}

	this.id = this.getNextId().split("_")[1];
	this.node.id = 'list_' + this.id;
	//console.log("LIST NODE ID", this.node.id);
	this.iconNode.id = 'del_' + this.node.id;

	this.iconNode.onclick = function (evt) {
		//console.log("board for list", board);
		//console.log("LIST TO DELETE", this);
		var idToDelete = this.id.split("_")[2];
		idToDelete = parseInt(idToDelete, 10);
		//console.log("list id", idToDelete);

		var listDel = undefined;
		for (let i = 0; i < board.lists.length; i++) {
			var listID = parseInt(board.lists[i].id, 10);
			//console.log("ids", listID);
			if (listID === idToDelete) {
				listDel = board.lists[i];
			}
		}
		//console.log("LIST TO DELETE", listDel);
		board.unregisterList(idToDelete, listDel, board);
	}

	if (!dummyList) {
		var dummyCard = new Card(this, '+ Add card', 0);

		this.titleNode.draggable = true;

		this.cards = [dummyCard];
		board.registerCard(this.cards[0], 0);

		// new card title form
		this.titleFormNode = buildCardTitleForm();

		for (var i = 0; i < this.cards.length; ++i) {
			this.cardsNode.appendChild(this.cards[i].node);
		}
		
		//TODO: fix passing wrong list to add cards
		dummyCard.titleNode.onclick = addCardTrello(this);

		this.node.appendChild(this.cardsNode);
		dummyCard.node.appendChild(this.titleFormNode);
		dummyCard.node.draggable = false;
		dummyCard.node.onclick = undefined;
	}

	// drag-drop handlers
	this.titleNode.ondragstart = function (evt) {
		var index = parseInt(evt.target.getAttribute('list-index'), 10)
		dragTracker.list = currentBoard.lists[index]
		evt.dataTransfer.effectAllowed = 'move'
	}

	this.titleNode.ondragover = function (evt) {
		if (dragTracker.list) {
			evt.preventDefault()
		}
	}

	this.titleNode.ondrop = function (evt) {
		var sourceIndex = dragTracker.list.index,
			targetIndex = parseInt(this.getAttribute('list-index'), 10),
			numLists = board.lists.length,
			i

		if (sourceIndex === targetIndex) {
			return
		}

		board.listsNode.removeChild(dragTracker.list.node)
		board.listsNode.insertBefore(dragTracker.list.node,
			board.lists[targetIndex].node)

		for (i = sourceIndex; i < numLists - 1; ++i) {
			board.lists[i] = board.lists[i + 1]
			board.lists[i].titleNode.setAttribute('list-index', i)
			board.lists[i].index = i
		}
		for (i = numLists - 1; i > targetIndex; --i) {
			board.lists[i] = board.lists[i - 1]
			board.lists[i].titleNode.setAttribute('list-index', i)
			board.lists[i].index = i
		}
		board.lists[targetIndex] = dragTracker.list
		board.lists[targetIndex].titleNode.setAttribute('list-index', targetIndex)
		board.lists[targetIndex].index = targetIndex
		evt.preventDefault()
	}

	this.titleNode.ondragend = function () {
		dragTracker.list = undefined
	}
}