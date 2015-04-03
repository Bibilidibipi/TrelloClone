TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  template: JST['boards/index'],

  render: function() {
    this.subviews('ul').forEach(function (listItemView) {
      listItemView.remove();
    }),
    this.$el.html(this.template());

    this.collection.each(function (board) {
      var listItemView = new TrelloClone.Views.BoardIndexItem({ model: board });
      this.addSubview('ul', listItemView);
    }.bind(this));

    return this;
  }
});
