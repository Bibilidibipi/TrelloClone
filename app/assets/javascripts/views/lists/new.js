TrelloClone.Views.NewList = Backbone.View.extend({
  template: JST['lists/new'],
  tagName: 'form',

  events: {
    'submit': 'newList'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  newList: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var list = new TrelloClone.Models.List(params);
    list.set("board_id", this.board.id);

    list.save({}, {
      success: function () {
        this.board.lists().add(list);
        this.board.fetch();
      }.bind(this)
    });
  }
});
