TrelloClone.Views.BoardIndexItem = Backbone.CompositeView.extend({
  template: JST['boards/indexItem'],
  tagName: 'button class="board-index-item"',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click': 'showBoard'
  },

  showBoard: function (event) {
    event.preventDefault();
    Backbone.history.navigate('boards/' + this.model.id, { trigger: true });
  },

  render: function() {
    this.$el.html(this.template({ board: this.model }));
    return this;
  }
});
