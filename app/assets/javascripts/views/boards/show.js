TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  tagName: 'div class="container-fluid"',

  events: {
    'click .index': 'boardsIndex',
    'click .add-list': 'showNewListForm'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync add', this.render);
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
    this.subviews('div.lists').forEach(function (indexItemView) {
      indexItemView.remove();
    });
    this.$el.html(this.template({ board: this.model}));

    if(this.model.lists() === undefined) { return this; }

    this.model.lists().each(function (list) {
      var indexItemView = new TrelloClone.Views.ListIndexItem({ model: list });
      this.addSubview('div.lists', indexItemView);
    }.bind(this));

    return this;
  },

  boardsIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate('', { trigger: true });
  },

  showNewListForm: function (event) {
    var $subview = $(event.currentTarget);
    $subview.remove();
    var formView = new TrelloClone.Views.NewList({ board: this.model });
    $('.lists').append(formView.render().$el);
  }
});
