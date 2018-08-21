/*
 This function will add the Card in the list
 */

var cardsList;
var isEditing = false;
var cardToEdit;
var cardTitle = document.getElementById("card-edit-title");
var cardDate = document.getElementById("card-edit-date");
var cardDesc = document.getElementById("card-edit-desc");

function addCardTrello(list) {
	cardsList = list;
	console.log("LIST TO ADD TO", cardsList);
	return function () {
		console.log("card clicked", this);
		console.log("card's list", list);

		cardTitle.value = '';
		cardDate.value = '';
		cardDesc.value = '';
		var cardModal = document.getElementById("card-edit");
		cardModal.style.display = "block";
	}
}

function editCard(card) {
	console.log("card's list", card.list);
	console.log("card to edit", card);

	cardsList = card.list;
	cardToEdit = card;

	cardTitle.value = cardToEdit.title;
	cardDate.value = cardToEdit.due;
	cardDesc.value = cardToEdit.description;

	isEditing = true;

	var cardModal = document.getElementById("card-edit");
	cardModal.style.display = "block";
}

function addCardSubmit() {
	var title = cardTitle.value.trim();
	var date = cardDate.value;
	var desc = cardDesc.value.trim();
	var card;

	console.log(title, date, desc);
	if (!title || !date || !desc) {
		return
	}

	if (isEditing) {
		var cardIndex = cardsList.cards.indexOf(cardToEdit);
		var cardInArray = cardsList.cards[cardIndex];
		cardInArray.title = title;
		cardInArray.date = date;
		cardInArray.desc = desc;
		cardToEdit.titleNode.replaceChild(document.createTextNode(title), cardToEdit.titleNode.childNodes[0]);
	} else {
		card = new Card(cardsList, title, desc, date);
		cardsList.board.registerCard(card, cardsList.cards.length);
		cardsList.cardsNode.insertBefore(card.node, cardsList.cards[cardsList.cards.length - 1].node);
		cardsList.cards.push(card);
	}
	console.log(cardsList.cards);
	var cardModal = document.getElementById("card-edit");
	cardModal.style.display = "none";

	cardTitle.value = '';
	cardDate.value = '';
	cardDesc.value = '';
}