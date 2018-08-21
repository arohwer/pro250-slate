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

function isEmpty(obj) {
	if (Object.keys(obj).length === 0 && obj.constructor === Object) {
		return false;
	} else {
		return true;
	}
}

function Card(list, title, description, dueDate) {
	var nextId = 0;
	console.log("LENGTH", list.board.lists.length);
	console.log("is empty", isEmpty(list.board.cards));

	if (isEmpty(list.board.cards)) {
		console.log("only one list");
		if (list.cards != undefined) {
			var lastIndex = list.cards.length - 1;
			nextId = list.cards[lastIndex].id;
		}
		else {
			nextId = 0;
		}
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
	console.log("CARD ID", this.id);

	this.node.classList.add('card');
	this.node.setAttribute('card-id', this.id);
	this.titleNode.appendChild(document.createTextNode(this.title));

	/*
	 These four function will work on drag and drop of the card on another list
	 */
	this.node.ondragstart = (function (id) {
		return function (evt) {
			dragTracker.id = id
			evt.dataTransfer.effectAllowed = 'move'
		}
	}(this.id))

	this.node.ondragover = function (evt) {
		if (dragTracker.id) {
			evt.preventDefault()
		}
	}

	this.node.ondrop = (function (board) {
		return function (evt) {
			var id = dragTracker.id,
				targetId = this.getAttribute('card-id') // 'this' is target of drop
				,
				source = board.cards[id],
				target = board.cards[targetId]

			if (id === targetId) {
				return
			}

			source.list.cardsNode.removeChild(source.card.node)
			target.list.cardsNode.insertBefore(source.card.node, target.card.node)

			board.reregisterSubsequent(source.list, source.index + 1, -1)
			source.list.cards.splice(source.index, 1)

			board.reregisterSubsequent(target.list, target.index + 1, 1)
			target.list.cards.splice(target.index + 1, 0, source.card)

			source.card.list = target.list
			board.registerCard(source.card, target.index + 1)
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