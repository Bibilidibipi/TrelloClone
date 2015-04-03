TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .index': 'boardsIndex'
  },

  render: function() {
    this.subviews('ul').forEach(function (indexItemView) {
      indexItemView.remove();
    }),
    this.$el.html(this.template({ board: this.model}));

    if(this.model.lists() === undefined) { return this; }

    this.model.lists().each(function (list) {
      var indexItemView = new TrelloClone.Views.ListIndexItem({ model: list });
      this.addSubview('ul', indexItemView);
    }.bind(this));

    return this;
  },

  boardsIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate('', { trigger: true });
  }
});
