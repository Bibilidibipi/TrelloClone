TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',

  initialize: function (options) {
    this.title = options.title;
    this.description = options.description;
  },

  comparator: function (list) {
    return list.ord;
  },
});
