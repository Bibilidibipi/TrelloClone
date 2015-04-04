TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,
  url: 'api/boards',

  getOrFetch: function(id) {
    var boards = this;
    var board = this.get(id);

    if(board) {
      board.fetch();
    } else {
      var lists = new TrelloClone.Collections.Lists();
      board = new TrelloClone.Models.Board({ id: id, collection: lists });
      board.fetch({
        success: function () {
          boards.add(board);
        }
      });
    }

    return board;
  }
});
