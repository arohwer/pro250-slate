var dragTracker = {
	id: undefined,
	list: undefined,
	card: undefined
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

	this.node.classList.add('card');
	this.node.setAttribute('card-id', this.id);
	this.node.setAttribute('card-list', this.list.index);
	this.titleNode.appendChild(document.createTextNode(this.title));

	/*
	 These four function will work on drag and drop of the card on another list
	 */

	 // this = the card we're dragging
	 // didnt track dragtracker.list
	 //was passing in only this.id, but we added this.list

	 //SOLUTION
	 //passing in this returned the entire card being dragged <- SOURCE
	this.node.ondragstart = (function (card) {
		return function (evt) {
			//console.log('this on drag', this)
			dragTracker.id = card.id;
			dragTracker.list = card.list.index
			dragTracker.card = card;
			//console.log("start: ", dragTracker.id);
			evt.dataTransfer.effectAllowed = 'move';
		}
	}(this))

	this.node.ondragover = function (evt) {
		if (dragTracker.id) {
			evt.preventDefault();
		}
	}

	/**
	 * -this refers to the card you are dropping it on aka TARGET
	 * -to drag cards around, it needs to be dropped on another card
	 * -then this
	 * -source list and target list were === trying to remove itself
	 * - checking if ids were ==, fine for within 1 list, but in other boards cards can have the same id
	 * this == the html element of card and just getting indexes
	 */

	 //SOLUTION: PASS IN THET TARGET CARD AS A WHOLE
	this.node.ondrop = (function (targetCard, board) {
		return function (evt) {
			//console.log('target card', targetCard)
			var target = targetCard;

			var source = dragTracker.card;
			//console.log("SOURCE: ", source);

			//console.log('target', target)

			source.list.cardsNode.removeChild(source.node);
			target.list.cardsNode.insertBefore(source.node, target.node);

			board.reregisterSubsequent(source.list, source.index + 1, -1);
			source.list.cards.splice(source.index, 1);

			board.reregisterSubsequent(target.list, target.index + 1, 1);
			target.list.cards.splice(target.index + 1, 0, source.node);

			source.list = target.list;
			evt.preventDefault();
		}
	}(this, list.board))

	this.node.ondragend = function () {
		dragTracker.id = undefined;
	}


	// this function will be called once you click on the text to edit
	this.node.onclick = (function (card) {
		return function () {
			cardEdit.card = card;
			editCard(card);
		}
	}(this))
}