TrelloClone.Views.NewCard = Backbone.View.extend({
  template: JST['cards/new'],
  tagName: 'form class="adding-card"',

  events: {
    'submit': 'newCard'
  },

  initialize: function (options) {
    this.list = options.list;
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  newCard: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var card = new TrelloClone.Models.Card(params);
    card.set("list_id", this.list.id);

    card.save({}, {
      success: function () {
        this.list.cards().add(card);
      }.bind(this)
    });
  }
});
