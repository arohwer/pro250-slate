/*
This function will build the form for adding a new board
 */

function buildDashboardContainer() {
    var node = document.createElement('div');
    node.setAttribute("class", "boardGrid");
    node.innerHTML +=
        '<div class="boardBox">' +
        '<h6 class="boardNew">Add Board</h6>' +
        '<i class="fas fa-plus-circle"></i>' +
        '</div>'
    for (board in boards){
        node.innerHTML +=
		'<div class="boardBox">' +
        '<i class="fas fa-pencil-alt"></i>'+
        `<h6 class="boardName">${board.title}</h6>`
		'</div>'
    }
	// node.style.display = 'none'
	return node
}