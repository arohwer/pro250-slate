var dragTracker = {
	id: undefined,
	list: undefined
}

//this function will build the card node
function buildCardNode() {
	var node = document.createElement('div')
	node.draggable = true
	node.innerHTML =
		'<div class="card-title"></div>';
	return node
}

/*
 This function is constructor function for card
 */

function Card(list, title, description, dueDate) {
	var nextId = 0;
	if (list.cards != undefined) {
		var lastIndex = list.cards.length - 1;
		nextId = list.cards[lastIndex].id;
	} else {
		nextId = 0;
	}

	this.list = list;
	this.title = title;
	this.description = description;
	this.due = dueDate;
	this.node = buildCardNode();
	this.titleNode = this.node.getElementsByClassName('card-title')[0];

	this.getNextId = function () {
		var id = parseInt(nextId, 10);
		return '_' + (id += 1).toString();
	}

	this.id = this.getNextId().split("_")[1];
	this.node.id = 'card_' + this.id;
	//console.log("CARD ID", this.id);

	this.node.classList.add('card');
	this.node.setAttribute('card-id', this.id);
	this.node.setAttribute('card-list', this.list.index);
	this.titleNode.appendChild(document.createTextNode(this.title));

	/*
	 These four function will work on drag and drop of the card on another list
	 */
	this.node.ondragstart = (function (id) {
		return function (evt) {
			dragTracker.id = id;
			console.log("drag start", dragTracker.id);
			evt.dataTransfer.effectAllowed = 'move';
		}
	}(this.id))

	this.node.ondragover = function (evt) {
		if (dragTracker.id) {
			console.log(dragTracker.id);
			evt.preventDefault();
		}
	}

	this.node.ondrop = (function (board) {
		console.log("board", board);
		return function (evt) {
			var id = dragTracker.id;
			var targetId = this.getAttribute('card-id'); // 'this' is target of drop
			var targetList = this.getAttribute('card-list');

			//TODO: fix this to use board.lists[correct index].cards[id];
			var list = board.lists[targetList];
			var source = list.cards[id-1];
			console.log(source);
			console.log(source.node);

			var target = list.cards[targetId-1];
			//var target = board.lists[list.index];

			if (id === targetId) {
				return
			}

			source.list.cardsNode.removeChild(source.node)
			target.list.cardsNode.insertBefore(source.node, target.node)

			board.reregisterSubsequent(source.list, source.index + 1, -1)
			source.list.cards.splice(source.index, 1)

			board.reregisterSubsequent(target.list, target.index + 1, 1)
			target.list.cards.splice(target.index + 1, 0, source.node)

			source.list = target.list
			//board.registerCard(source.card, target.index + 1)
			evt.preventDefault()
		}
	}(list.board))

	this.node.ondragend = function () {
		dragTracker.id = undefined
	}


	// this function will be called once you click on the text to edit
	this.node.onclick = (function (card) {
		return function () {
			cardEdit.card = card;
			editCard(card);
		}
	}(this))
}