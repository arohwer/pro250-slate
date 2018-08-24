/*
 This function will add the Card in the list
 */

var cardsList;
var isEditing = false;
var cardToEdit;
var cardTitle = document.getElementById("card-edit-title");
var cardDate = document.getElementById("card-edit-date");
var cardDesc = document.getElementById("card-edit-desc");
var modalTitle = document.getElementById("card-modal-title");

function addCardTrello(obj) {
	isEditing = false;
	modalTitle.innerHTML = "Add Card";
	var p1 = obj.parentNode;
	var p2 = p1.parentNode;
	var p3 = p2.parentNode;
	for (let i = 0; i < currentBoard.lists.length; i++) {
		if (p3.id == currentBoard.lists[i].node.id) {
			cardsList = currentBoard.lists[i];
		}
	}
		cardTitle.value = '';
		cardDate.value = '';
		cardDesc.value = '';
		var cardModal = document.getElementById("card-edit");
		cardModal.style.display = "block";
}

function editCard(card) {
	modalTitle.innerHTML = "Edit Card";
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
		isEditing = false;
	} else {
		card = new Card(cardsList, title, desc, date);
		cardsList.cardsNode.insertBefore(card.node, cardsList.cards[cardsList.cards.length - 1].node);
		cardsList.cards.push(card);
	}
	var cardModal = document.getElementById("card-edit");
	cardModal.style.display = "none";

	cardTitle.value = '';
	cardDate.value = '';
	cardDesc.value = '';
}