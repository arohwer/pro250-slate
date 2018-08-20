/*
 This function is called to build the card form
 */
// function buildCardTitleForm() {
// 	var node = document.createElement('div');
// 	node.classList.add("card-cont");
// 	node.innerHTML =
// 	`<div id="card-edit" class="modal">` +
// 	`<h3 class="modal-title-card">Edit Card</h3>` +
// 	`<div onclick="close()" id="card-edit-close">&#10006;</div>` +
// 	`<form class="modal-form">` +
// 	`<div id="card-edit-inputs">` +
// 	`<div>` +
// 	`<label>Title:</label>` +
// 	`<input id="card-edit-title" class="card-textbox">` +
// 	`</div>` +
// 	`<div>` +
// 	`<label>Due Date:</label>` +
// 	`<input type="date" id="card-edit-date" class="card-textbox">` +
// 	`</div>` +
// 	`<div>` +
// 	`<label>Description:</label>` +
// 	`<textarea name="card-edit-desc" class="desc-box" id="card-edit-desc" rows="3" class="card-textbox"></textarea>` +
// 	`</div>` +
// 	`</div>` +
// 	`</form>` +
// 	`<div class="button-box-card">` +
// 	`    <div id="card-edit-delete" class="red-bg no-bg">Delete</div>` +
// 	`    <div id="card-edit-submit" class="green-bg yes-bg">Save</div>` +
// 	`</div>` +
// 	`</div>`;
// 		node.style.display = 'none';
// 	return node;
// }

function buildCardTitleForm() {
	var node = document.createElement('form')
	node.innerHTML =
		'<div class="newitem-title-wrapper">' +
		'<textarea class="trello-new-card-title-input" type="text"></textarea>' +
		'<input class="trello-new-card-title-submit" type="submit" value="Add">' +
		'</div>'
	node.style.display = 'none'
	return node
}