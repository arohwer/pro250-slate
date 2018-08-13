/*
 This function deletes the board
 */

 // TODO: add functionality for deleting a board

var boardDeleteTrello = {};
var dash;

boardDeleteTrello.delete = function () {
	var index = dash.boards[boardEdit.board.id].index;

  dash.unregisterBoard(boardEdit.board);
  
  //then remove from html

}

