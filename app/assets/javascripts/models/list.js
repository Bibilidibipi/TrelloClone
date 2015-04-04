TrelloClone.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.title = options.title;
  },

  comparator: function (list) {
    return list.ord;
  },

  urlRoot: 'api/lists'
});
