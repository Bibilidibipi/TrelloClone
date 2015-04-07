TrelloClone.Views.ListIndexItem = Backbone.CompositeView.extend({
  template: JST['lists/indexItem'],
  tagName: 'div class="list-index-item"',

  events: {
    'click .add-card': 'showNewCardForm'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync add', this.render);
    this.listenTo(this.model.cards(), 'add', this.render);
  },

  render: function() {
    this.subviews('ul.cards').forEach(function (indexItemView) {
      indexItemView.remove();
    });
    this.$el.html(this.template({ list: this.model }));

    if(this.model.cards() === undefined) { return this; }

    this.model.cards().each(function (card) {
      var indexItemView = new TrelloClone.Views.CardIndexItem({ model: card });
      this.addSubview('ul.cards', indexItemView);
    }.bind(this));

    return this;
  },

  showNewCardForm: function (event) {
    var $subview = $(event.currentTarget);
    $subview.remove();
    var formView = new TrelloClone.Views.NewCard({ list: this.model });
    this.$el.append(formView.render().$el);
  }
});
