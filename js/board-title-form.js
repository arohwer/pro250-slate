/*
This function will build the form for adding a new board
 */

function buildDashboardContainer(boards) {
    var node = document.createElement('div');
    node.setAttribute("class", "boardGrid");
    node.innerHTML +=
        '<div class="boardBox" id="addBoardBtn">' +
        '<h6 class="boardNew">Add Board</h6>' +
        '<i class="fas fa-plus-circle" id="editBoardBtn"></i>' +
        '</div>'
    for (board in boards) {
        node.innerHTML +=
            '<div class="boardBox">' +
            `<i class="fas fa-pencil-alt" id="board_${boards[board].id}"></i>` +
            `<h6 id="board_${boards[board].id}" class="boardName boards">${boards[board].title}</h6>`
        '</div>'
    }
    return node;
}