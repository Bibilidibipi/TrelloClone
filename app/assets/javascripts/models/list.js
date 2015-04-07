TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  initialize: function (options) {
    this.title = options.title;
  },

  parse: function (payload) {
    if(payload.cards) {
      this.cards().set(payload.cards);
      delete payload.cards;
    }

    return payload;
  },

  comparator: function (list) {
    return list.ord;
  },

  cards: function () {
    this._cards = this._cards || new TrelloClone.Collections.Cards([], { list: this });
    return this._cards;
  }
});
