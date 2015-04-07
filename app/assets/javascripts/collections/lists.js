TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  url: 'api/lists',

  initialize: function (options) {
    this.board = options.board;
  },

  comparator: function(list) {
    return -1 * list.get('ord');
  }
});
