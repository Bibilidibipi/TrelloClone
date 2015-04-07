TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST['boards/new'],
  tagName: 'form',

  events: {
    'submit': 'newBoard'
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  newBoard: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var board = new TrelloClone.Models.Board(params);

    board.save({}, {
      success: function () {
        this.collection.add(board);
        Backbone.history.navigate('boards/' + board.id, { trigger: true });
      }.bind(this)
    });
  }
});
