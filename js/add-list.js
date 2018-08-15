//This function will called on adding the list on the board
function addListTrello(board) {
	return function () {
		var titleInput = document.getElementById('trello-list-title-input');

		//document.getElementById('trello-list-title-submit').onclick = titleButtonClick
		//titleInput.onclick = titleButtonClick

		var listContent;
		var listIndex;
		var currentList;

		var added = false;
		function addList(evt) {
			evt.preventDefault();
			var title = titleInput.innerHTML.trim(),
			index = board.lists.length - 1;
			board.titleFormNode.style.display = 'none';
			titleInput.value = '';
			if (!title) {
				return
			}
			listContent = title;
			listIndex = index;
			added = true;
			console.log(added);
		}

		titleInput.addEventListener("input", addList);

		//board.titleFormNode.style.display = 'block'
		//titleInput.focus();
		
		function focusOut(evt) {
			console.log('FOCUS OUT', added);
			if (added === true) {
				titleInput.textContent = '+ Add list';
				currentList = new List(board, listContent, listIndex);
				board.lists.splice(listIndex, 0, currentList);
				board.listsNode.insertBefore(currentList.node,
					board.lists[listIndex + 1].node)
				board.lists[listIndex + 1].titleNode.setAttribute('list-index', listIndex + 1);
				added = false;
			}
			console.log('FOCUS OUT', added);
		}

		titleInput.addEventListener("focusout", focusOut);

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