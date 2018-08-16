//This function will called on adding the list on the board
function addListTrello(board) {
	return function () {
		var titleInput = document.getElementById('trello-list-title-input');

		var listContent;
		var listIndex;
		var currentList;
		var added = false;

		function addList(evt) {
			evt.preventDefault();
			added = true;
			console.log(added);
		}

		titleInput.addEventListener("input", addList);
		titleInput.onclick = function (evt) {
			titleInput.innerHTML = '';
		}

		titleInput.addEventListener("keypress", function (evt) {
			if (evt.which === 13) {
				evt.preventDefault();
			}
		});

		function focusOut(evt) {
			console.log('FOCUS OUT', added);
			if (added === true) {
				var title = titleInput.innerHTML.trim(),
					index = board.lists.length - 1;
				board.titleFormNode.style.display = 'none';
				titleInput.value = '';
				if (!title) {
					return
				}
				listContent = title;
				listIndex = index;
				titleInput.textContent = '+ Add list';
				currentList = new List(board, listContent, listIndex);
				currentList.id = this.id + 1;
				board.lists.splice(listIndex, 0, currentList);
				board.listsNode.insertBefore(currentList.node,
					board.lists[listIndex + 1].node)
				board.lists[listIndex + 1].titleNode.setAttribute('list-index', listIndex + 1);
				added = false;
			}
			if (added === false) {
				index = board.lists.length - 1;
				titleInput.innerHTML = board.lists[index].title;
			}
			console.log('FOCUS OUT', added);
		}

		titleInput.addEventListener("focusout", focusOut);
	}
}