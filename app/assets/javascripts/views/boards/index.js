TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  tagName: 'div class="index"',

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  events: {
    'click .add-board': 'showNewBoardForm'
  },

  // CompositeView method overwritten to ease sorting (append changed to prepend)
  attachSubview: function (selector, subview) {
    this.$(selector).prepend(subview.$el);
    // Bind events in case `subview` has previously been removed from
    // DOM.
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  render: function() {
    this.subviews('div.boards').forEach(function (listItemView) {
      listItemView.remove();
    }),
    this.$el.html(this.template());

    this.collection.each(function (board) {
      var listItemView = new TrelloClone.Views.BoardIndexItem({ model: board });
      this.addSubview('div.boards', listItemView);
    }.bind(this));

    return this;
  },

  showNewBoardForm: function (event) {
    var $subview = $(event.currentTarget);
    $subview.remove();
    var formView = new TrelloClone.Views.NewBoard({ collection: this.collection });
    $('.boards').append(formView.render().$el);
  }
});
