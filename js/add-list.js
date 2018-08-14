//This function will called on adding the list on the board
function addListTrello(board) {
	return function () {
		var titleInput = document.getElementById('trello-list-title-input');

		//document.getElementById('trello-list-title-submit').onclick = titleButtonClick
		//titleInput.onclick = titleButtonClick

		function addList(evt) {
			evt.preventDefault();
			var title = titleInput.innerHTML.trim(),
				index = board.lists.length - 1,
				list;
			board.titleFormNode.style.display = 'none';
			titleInput.value = '';
			if (!title) {
				return
			}
			if (evt.keyCode === 13) {
				title = titleInput.innerHTML.trim();
				title = title.toString().split("<")[0];
				list = new List(board, title, index);
				board.lists.splice(index, 0, list);
				board.listsNode.insertBefore(list.node,
					board.lists[index + 1].node)
				board.lists[index + 1].titleNode.setAttribute('list-index', index + 1);
			}
		}

		titleInput.addEventListener("keyup", addList);

		board.titleFormNode.style.display = 'block'
		titleInput.focus()

		function titleButtonClick(evt) {
			console.log("in click event");
			evt.preventDefault();
			var title = titleInput.innerHTML.trim(),
				index = board.lists.length - 1,
				list;

			board.titleFormNode.style.display = 'none';
			titleInput.value = '';
			if (!title) {
				return
			}

			list = new List(board, title, index)
			board.lists.splice(index, 0, list)
			board.listsNode.insertBefore(list.node,
				board.lists[index + 1].node)
			board.lists[index + 1].titleNode.setAttribute('list-index', index + 1)
		}
	}
}