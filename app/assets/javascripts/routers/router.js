TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.boards = new TrelloClone.Collections.Boards();
    this.boards.fetch();
  },

  routes: {
    '': 'boardsIndex',
    'boards/new': 'newBoard',
    'boards/:id': 'showBoard'
  },

  replaceView: function (newView) {
    if(this.view !== undefined) {
      this.view.remove();
    }

    this.$rootEl.html(newView.render().$el);
    this.view = newView;
  },

  boardsIndex: function () {
    var view = new TrelloClone.Views.BoardsIndex({ collection: this.boards });

    this.replaceView(view);
  },

  showBoard: function (id) {
    var board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.ShowBoard({ model: board });
    this.replaceView(view);
  },

  newBoard: function () {
    var view = new TrelloClone.Views.NewBoard({ collection: this.boards });

    this.replaceView(view);
  }
});
